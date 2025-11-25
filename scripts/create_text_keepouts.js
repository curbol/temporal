#!/usr/bin/env node

/**
 * Create rule areas (keepouts) around text objects to prevent zone fills from overlapping.
 * This is useful for silkscreen text that should remain visible.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');
const { getKiCadPythonOrThrow } = require('./kicad_python');

// Load configuration
const configPath = path.join(__dirname, 'kicad_config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
const GAP_MM = 0; // Always use 0 gap to follow text exactly
const LAYERS_TO_PROCESS = ['F.SilkS', 'B.SilkS']; // Always process both front and back silkscreen
const TEXT_PATTERNS = config.text_keepouts.patterns;

const pythonScript = `
import sys
import os

# Suppress wxWidgets assertions
os.environ['WXSUPPRESS_SIZER_FLAGS_CHECK'] = '1'

import pcbnew

# Initialize wxPython if needed
try:
    import wx
    if not wx.App.Get():
        _ = wx.App()
except:
    pass

def mm_to_iu(mm):
    """Convert millimeters to internal units."""
    return int(mm * 1000000)

def create_text_keepouts(board_path, gap_mm, layers, text_patterns):
    """Create rule areas from text outline geometry."""
    try:
        board = pcbnew.LoadBoard(board_path)

        gap_iu = mm_to_iu(gap_mm)
        created_count = 0
        created_groups = 0

        # Get layer IDs for the layers we want to process
        layer_ids = []
        for layer_name in layers:
            layer_id = board.GetLayerID(layer_name)
            if layer_id != pcbnew.UNDEFINED_LAYER:
                layer_ids.append((layer_name, layer_id))

        # Find all text objects on the specified layers
        for drawing in board.GetDrawings():
            if drawing.GetClass() == 'PCB_TEXT':
                text_layer = drawing.GetLayer()

                # Check if this text is on one of our target layers
                matching_layer = None
                for layer_name, layer_id in layer_ids:
                    if text_layer == layer_id:
                        matching_layer = (layer_name, layer_id)
                        break

                if not matching_layer:
                    continue

                text_content = drawing.GetText()

                # If we have specific patterns, check if this text matches
                if text_patterns and not any(pattern in text_content for pattern in text_patterns):
                    continue

                # Use GetEffectiveShape instead which is more stable
                # This gets the actual rendered shape including line width
                max_error = 5000  # 0.005mm in internal units

                poly_set = pcbnew.SHAPE_POLY_SET()

                # GetEffectiveShape gives us the stroked outline
                try:
                    shape = drawing.GetEffectiveShape()
                    shape.TransformToPolygon(poly_set, max_error, pcbnew.ERROR_INSIDE)
                except Exception as e:
                    # Fallback to transform method if GetEffectiveShape fails
                    try:
                        drawing.TransformShapeToPolygon(poly_set, text_layer, 0, max_error, pcbnew.ERROR_INSIDE, False)
                    except:
                        continue

                # Check if we got any polygons
                if poly_set.OutlineCount() == 0:
                    continue

                # Inflate by gap amount if needed
                if gap_iu != 0:
                    poly_set.Inflate(gap_iu, 32, 5000)

                # Fracture the polygon set to remove self-intersections
                poly_set.Fracture()

                # Create a group for all zones of this text
                safe_text = ''.join(c if c.isalnum() or c in ' -_' else '_' for c in text_content)
                group = pcbnew.PCB_GROUP(board)
                group.SetName(f"TEXT_{safe_text[:20]}")
                board.Add(group)
                created_groups += 1

                # Create a separate keepout zone for each outline segment (per character part)
                for outline_idx in range(poly_set.OutlineCount()):
                    outline = poly_set.Outline(outline_idx)

                    # Skip if too few points
                    if outline.PointCount() < 3:
                        continue

                    # Create a rule area
                    zone = pcbnew.ZONE(board)

                    # Set as rule area
                    zone.SetIsRuleArea(True)
                    zone.SetDoNotAllowCopperPour(True)  # Keep out zone fills
                    zone.SetDoNotAllowTracks(False)
                    zone.SetDoNotAllowVias(False)
                    zone.SetDoNotAllowPads(False)
                    zone.SetDoNotAllowFootprints(False)

                    # Set layer - use copper layer corresponding to silkscreen
                    if 'F.' in matching_layer[0]:
                        zone.SetLayer(board.GetLayerID('F.Cu'))
                    else:
                        zone.SetLayer(board.GetLayerID('B.Cu'))

                    # Set name
                    zone.SetZoneName(f"TEXT_{safe_text[:20]}_{outline_idx}")

                    # Add points to zone outline
                    for pt_idx in range(outline.PointCount()):
                        pt = outline.CPoint(pt_idx)
                        zone.AppendCorner(pt, -1)

                    # Add to board and to group
                    board.Add(zone)
                    group.AddItem(zone)
                    created_count += 1

        # Save the board
        pcbnew.SaveBoard(board_path, board)

        return created_groups

    except Exception as e:
        import traceback
        print(f"Error: {str(e)}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return -1

def process_all_boards(board_paths, gap_mm, layers, patterns):
    """Process all boards in a single Python session to avoid wx.App issues."""
    results = {}
    for board_path in board_paths:
        count = create_text_keepouts(board_path, gap_mm, layers, patterns)
        if count >= 0:
            results[board_path] = count
        else:
            results[board_path] = -1

    # Output results as JSON
    import json
    print(json.dumps(results))

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python script.py <gap_mm> <layers> <patterns> <board1> [board2 ...]")
        sys.exit(1)

    gap_mm = float(sys.argv[1])
    layers = sys.argv[2].split(',') if sys.argv[2] else []
    patterns = sys.argv[3].split('|') if sys.argv[3] else []
    board_paths = sys.argv[4:]

    process_all_boards(board_paths, gap_mm, layers, patterns)
`;

function main() {
  // Find PCB files
  const pcbsDir = path.join(__dirname, '..', 'ergogen', 'output', 'pcbs');

  if (!fs.existsSync(pcbsDir)) {
    console.error('PCBs directory not found:', pcbsDir);
    process.exit(1);
  }

  const pcbFiles = fs.readdirSync(pcbsDir)
    .filter(f => f.endsWith('.kicad_pcb'))
    .map(f => path.join(pcbsDir, f));

  if (pcbFiles.length === 0) {
    console.error('No PCB files found in:', pcbsDir);
    process.exit(1);
  }

  // Get KiCad Python
  const pythonPath = getKiCadPythonOrThrow();

  // Create temporary Python script
  const tmpScript = path.join(__dirname, 'tmp_create_text_keepouts.py');
  fs.writeFileSync(tmpScript, pythonScript);

  try {
    const layers = LAYERS_TO_PROCESS.join(',');
    const patterns = TEXT_PATTERNS.join('|');

    // Process all PCBs in a single Python invocation to avoid wx.App issues
    const args = [
      `"${pythonPath}"`,
      `"${tmpScript}"`,
      GAP_MM,
      `"${layers}"`,
      `"${patterns}"`,
      ...pcbFiles.map(f => `"${f}"`)
    ].join(' ');

    const output = execSync(args, {
      encoding: 'utf8',
      stdio: 'pipe'
    });

    const results = JSON.parse(output);

    let totalKeepouts = 0;
    const keepoutCounts = [];

    for (const [pcbPath, count] of Object.entries(results)) {
      if (count > 0) {
        totalKeepouts += count;
        keepoutCounts.push(`${path.basename(pcbPath, '.kicad_pcb')}: ${count}`);
      } else if (count < 0) {
        console.error(`Error processing ${path.basename(pcbPath)}`);
      }
    }

    if (totalKeepouts > 0) {
      console.log(`✓ Created ${totalKeepouts} text keepout(s) [${keepoutCounts.join(', ')}]`);
    }
  } catch (err) {
    console.error('Error running text keepouts script:', err.message);
    if (err.stderr) {
      console.error('STDERR:', err.stderr);
    }
    if (err.stdout) {
      console.error('STDOUT:', err.stdout);
    }
  } finally {
    // Clean up temporary script
    if (fs.existsSync(tmpScript)) {
      fs.unlinkSync(tmpScript);
    }
  }
}

main();
