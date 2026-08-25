#!/usr/bin/env python3
"""
Create rule areas (keepouts) around silkscreen text so zone fills do not
overlap it.

Usage:
    python3 create_text_keepouts.py <gap_mm> <layers> <patterns> <board> [board ...]

<layers> is comma-separated, <patterns> is pipe-separated. Prints a JSON map of
board path to the number of keepout groups created, or -1 for a board that
failed.
"""
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
except Exception:
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
        matched_texts = 0

        # Get layer IDs for the layers we want to process
        layer_ids = []
        for layer_name in layers:
            layer_id = board.GetLayerID(layer_name)
            if layer_id != pcbnew.UNDEFINED_LAYER:
                layer_ids.append((layer_name, layer_id))

        # Collect all text objects (from board drawings and footprints)
        text_objects = []

        # Get text from board drawings
        for drawing in board.GetDrawings():
            if drawing.GetClass() == 'PCB_TEXT':
                text_objects.append(drawing)

        # Get text from footprints
        for footprint in board.GetFootprints():
            for item in footprint.GraphicalItems():
                if item.GetClass() == 'PCB_TEXT':
                    text_objects.append(item)

        # Process all text objects
        for drawing in text_objects:
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

            matched_texts += 1

            # Use GetEffectiveShape instead which is more stable
            # This gets the actual rendered shape including line width
            max_error = 5000  # 0.005mm in internal units

            poly_set = pcbnew.SHAPE_POLY_SET()

            # GetEffectiveShape gives us the stroked outline
            try:
                shape = drawing.GetEffectiveShape()
                shape.TransformToPolygon(poly_set, max_error, pcbnew.ERROR_INSIDE)
            except Exception:
                # Fallback to transform method if GetEffectiveShape fails
                try:
                    drawing.TransformShapeToPolygon(poly_set, text_layer, 0, max_error, pcbnew.ERROR_INSIDE, False)
                except Exception as shape_err:
                    print(f"Error: could not outline {text_content!r} in {board_path}: {shape_err}",
                          file=sys.stderr)
                    continue

            if poly_set.OutlineCount() == 0:
                print(f"Error: {text_content!r} in {board_path} produced no outline", file=sys.stderr)
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
                # KiCad 10 renamed this setter
                if hasattr(zone, 'SetDoNotAllowZoneFills'):
                    zone.SetDoNotAllowZoneFills(True)
                else:
                    zone.SetDoNotAllowCopperPour(True)
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

        return {"matched": matched_texts, "groups": created_groups}

    except Exception as err:
        import traceback
        print(f"Error: {err}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return {"matched": -1, "groups": -1}

def process_all_boards(board_paths, gap_mm, layers, patterns):
    """Process all boards in a single Python session to avoid wx.App issues."""
    results = {}
    for board_path in board_paths:
        results[board_path] = create_text_keepouts(board_path, gap_mm, layers, patterns)

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
