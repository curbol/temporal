#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Generate JLCPCB BOM and CPL files for PCB assembly
 *
 * Generates:
 * - BOM (Bill of Materials) with JLCPCB part numbers
 * - CPL files (Component Placement List) for top and bottom assembly
 *   with automatic rotation correction for bottom side
 */

/**
 * Load JLCPCB configuration from kicad_config.yaml
 */
function loadJlcpcbConfig() {
  const configPath = path.join(__dirname, 'kicad_config.yaml');

  if (!fs.existsSync(configPath)) {
    console.error(`Error: Config file not found at ${configPath}`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    const config = yaml.load(content);
    return config.jlcpcb;
  } catch (err) {
    console.error(`Error: Failed to load config: ${err.message}`);
    process.exit(1);
  }
}

/**
 * Parse KiCad PCB file to extract component information
 */
function parseKiCadPCB(pcbPath, assemblyParts) {
  const content = fs.readFileSync(pcbPath, 'utf8');
  const components = [];

  // Create footprint to LCSC part mapping
  const footprintMap = {};
  assemblyParts.forEach(part => {
    footprintMap[part.footprint] = {
      lcsc: part.lcsc_part,
      description: part.description
    };
  });

  // Regular expression to match footprint sections
  const footprintRegex = /\(footprint\s+"([^"]+)"[\s\S]*?\n\t\)/g;

  let match;
  while ((match = footprintRegex.exec(content)) !== null) {
    const footprintBlock = match[0];
    const footprintName = match[1];

    // Only process footprints that are in our assembly parts list
    if (!footprintMap[footprintName]) {
      continue;
    }

    // Extract reference designator
    const refMatch = footprintBlock.match(/\(property\s+"Reference"\s+"([^"]+)"/);
    const reference = refMatch ? refMatch[1] : null;

    // Extract position (at line format: (at x y rotation))
    const posMatch = footprintBlock.match(/\n\t\t\(at\s+([-\d.]+)\s+([-\d.]+)(?:\s+([-\d.]+))?\)/);
    if (!posMatch) continue;

    const x = parseFloat(posMatch[1]);
    const y = parseFloat(posMatch[2]);
    const rotation = posMatch[3] ? parseFloat(posMatch[3]) : 0;

    // Extract layer to determine component side
    const layerMatch = footprintBlock.match(/\(layer\s+"([^"]+)"/);
    const layer = layerMatch ? layerMatch[1] : 'F.Cu';
    const side = layer.startsWith('B.') ? 'Bottom' : 'Top';

    const partInfo = footprintMap[footprintName];

    components.push({
      designator: reference,
      footprint: footprintName,
      lcsc: partInfo.lcsc,
      description: partInfo.description,
      x: x,
      y: y,
      rotation: rotation,
      side: side
    });
  }

  return components;
}

/**
 * Find parent footprints in PCB file for embedded resistor calculation
 */
function findParentFootprints(pcbPath, parentFootprintName) {
  const content = fs.readFileSync(pcbPath, 'utf8');
  const footprints = [];

  const footprintRegex = /\(footprint\s+"([^"]+)"[\s\S]*?\n\t\)/g;

  let match;
  while ((match = footprintRegex.exec(content)) !== null) {
    const footprintBlock = match[0];
    const footprintName = match[1];

    if (footprintName !== parentFootprintName) {
      continue;
    }

    // Extract reference designator
    const refMatch = footprintBlock.match(/\(property\s+"Reference"\s+"([^"]+)"/);
    const reference = refMatch ? refMatch[1] : null;

    // Extract position
    const posMatch = footprintBlock.match(/\n\t\t\(at\s+([-\d.]+)\s+([-\d.]+)(?:\s+([-\d.]+))?\)/);
    if (!posMatch) continue;

    const x = parseFloat(posMatch[1]);
    const y = parseFloat(posMatch[2]);
    const rotation = posMatch[3] ? parseFloat(posMatch[3]) : 0;

    // Extract layer
    const layerMatch = footprintBlock.match(/\(layer\s+"([^"]+)"/);
    const layer = layerMatch ? layerMatch[1] : 'F.Cu';
    const side = layer.startsWith('B.') ? 'Bottom' : 'Top';

    footprints.push({ reference, x, y, rotation, side });
  }

  return footprints;
}

/**
 * Transform local coordinates to global based on footprint position and rotation
 * KiCad uses clockwise rotation (positive angles go clockwise), so we negate the angle
 */
function transformCoordinates(localX, localY, footprintX, footprintY, footprintRotation) {
  const rad = (-footprintRotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // Rotate local coordinates
  const rotatedX = localX * cos - localY * sin;
  const rotatedY = localX * sin + localY * cos;

  // Translate to global
  return {
    x: footprintX + rotatedX,
    y: footprintY + rotatedY
  };
}

/**
 * Generate embedded resistor components from parent footprints
 * For reversible PCBs, the same resistor positions serve both sides.
 * When assemblySide is 'Bottom', we use Top-layer footprints since
 * flipping the board makes F.Cu accessible from the bottom.
 */
function generateEmbeddedResistors(pcbPath, embeddedConfig, assemblySide) {
  const components = [];
  const lcsc = embeddedConfig.lcsc_part;
  const description = embeddedConfig.description;
  let resistorIndex = 1;

  // For reversible PCBs: Top-layer footprints serve both assembly sides
  // When the board is flipped for right-hand use, F.Cu becomes the bottom
  const footprintSide = 'Top';

  // Process MCU resistors
  if (embeddedConfig.mcu_nice_nano) {
    const mcuConfig = embeddedConfig.mcu_nice_nano;
    const mcuFootprints = findParentFootprints(pcbPath, mcuConfig.parent_footprint);

    mcuFootprints.forEach(fp => {
      // For reversible PCBs, use Top-layer footprints for both assembly sides
      if (fp.side !== footprintSide) return;

      mcuConfig.resistor_x_offsets.forEach(xOffset => {
        mcuConfig.resistor_y_offsets.forEach(yOffset => {
          const global = transformCoordinates(xOffset, yOffset, fp.x, fp.y, fp.rotation);
          const rotation = (fp.rotation + mcuConfig.rotation_offset) % 360;

          components.push({
            designator: `R${resistorIndex++}`,
            footprint: '0402',
            lcsc: lcsc,
            description: description,
            x: global.x,
            y: global.y,
            rotation: rotation,
            side: assemblySide
          });
        });
      });
    });
  }

  // Process Display resistors
  if (embeddedConfig.display_nice_view) {
    const displayConfig = embeddedConfig.display_nice_view;
    const displayFootprints = findParentFootprints(pcbPath, displayConfig.parent_footprint);

    displayFootprints.forEach(fp => {
      if (fp.side !== footprintSide) return;

      displayConfig.positions.forEach(pos => {
        const global = transformCoordinates(pos[0], pos[1], fp.x, fp.y, fp.rotation);
        const rotation = (fp.rotation + displayConfig.rotation_offset) % 360;

        components.push({
          designator: `R${resistorIndex++}`,
          footprint: '0402',
          lcsc: lcsc,
          description: description,
          x: global.x,
          y: global.y,
          rotation: rotation,
          side: assemblySide
        });
      });
    });
  }

  // Process Battery resistors
  if (embeddedConfig.battery_connector) {
    const batteryConfig = embeddedConfig.battery_connector;
    const batteryFootprints = findParentFootprints(pcbPath, batteryConfig.parent_footprint);

    batteryFootprints.forEach(fp => {
      if (fp.side !== footprintSide) return;

      batteryConfig.positions.forEach(pos => {
        const global = transformCoordinates(pos[0], pos[1], fp.x, fp.y, fp.rotation);
        const rotation = (fp.rotation + batteryConfig.rotation_offset) % 360;

        components.push({
          designator: `R${resistorIndex++}`,
          footprint: '0402',
          lcsc: lcsc,
          description: description,
          x: global.x,
          y: global.y,
          rotation: rotation,
          side: assemblySide
        });
      });
    });
  }

  return components;
}

/**
 * Generate JLCPCB BOM file (CSV format)
 */
function generateBOM(components, outputPath) {
  // Group components by LCSC part number
  const bomMap = new Map();

  components.forEach(comp => {
    const key = comp.lcsc;
    if (!bomMap.has(key)) {
      bomMap.set(key, {
        comment: comp.description,
        designator: [],
        footprint: comp.footprint,
        lcsc: comp.lcsc
      });
    }
    bomMap.get(key).designator.push(comp.designator);
  });

  // Generate CSV content (sorted by LCSC part number for deterministic output)
  let csv = 'Comment,Designator,Footprint,LCSC Part #\n';

  const sortedEntries = [...bomMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [lcsc, item] of sortedEntries) {
    const designators = item.designator.sort().join(',');
    csv += `"${item.comment}","${designators}","${item.footprint}","${item.lcsc}"\n`;
  }

  fs.writeFileSync(outputPath, csv);
}

/**
 * Generate JLCPCB CPL file (CSV format for pick-and-place)
 * @param {boolean} isBottomSide - If true, apply rotation transformation for bottom assembly
 */
function generateCPL(components, outputPath, isBottomSide = false) {
  // JLCPCB CPL format
  let csv = 'Designator,Mid X,Mid Y,Layer,Rotation\n';

  // For JLCPCB assembly, the Layer column indicates which side to assemble
  // NOT which layer the component is on in KiCad
  const assemblyLayer = isBottomSide ? 'Bottom' : 'Top';

  // Sort by designator for deterministic output
  const sortedComponents = [...components].sort((a, b) => a.designator.localeCompare(b.designator));

  sortedComponents.forEach(comp => {
    // For bottom side assembly, apply rotation transformation
    // Formula: rotation_bottom = 180 - rotation_top
    const rotation = isBottomSide ? (180 - comp.rotation) : comp.rotation;

    // JLCPCB uses Cartesian coordinates (Y increases upward)
    // KiCad uses Y increasing downward, so we need to negate Y
    const y_jlcpcb = -comp.y;

    csv += `"${comp.designator}",${comp.x.toFixed(4)}mm,${y_jlcpcb.toFixed(4)}mm,${assemblyLayer},${rotation}\n`;
  });

  fs.writeFileSync(outputPath, csv);
}

/**
 * Main function
 */
function main() {
  const pcbFile = path.join(__dirname, '..', 'pcbs', 'temporal', 'temporal.kicad_pcb');
  const jlcpcbDir = path.join(__dirname, '..', 'jlcpcb');

  // Check if PCB file exists
  if (!fs.existsSync(pcbFile)) {
    console.error(`Error: PCB file not found at ${pcbFile}`);
    process.exit(1);
  }

  // Load config
  const config = loadJlcpcbConfig();

  // Parse PCB file for standard assembly parts
  const components = parseKiCadPCB(pcbFile, config.assembly_parts);

  // Generate embedded resistors if configured (only once, for Top layer footprints)
  let embeddedResistors = [];
  if (config.embedded_resistors) {
    embeddedResistors = generateEmbeddedResistors(pcbFile, config.embedded_resistors, 'Top');
  }

  // For a reversible PCB, all F.Cu components are used for both top and bottom assembly.
  // The same physical components serve both the left hand (top assembly) and
  // right hand (bottom assembly when the board is flipped).
  const topLayerComponents = components.filter(c => c.side === 'Top');
  const bottomLayerComponents = components.filter(c => c.side === 'Bottom');

  // Combine standard components with embedded resistors
  // For BOM: all unique components (F.Cu components + embedded resistors)
  const allComponents = [...topLayerComponents, ...bottomLayerComponents, ...embeddedResistors];

  // For reversible PCB: both CPL files use F.Cu components
  // CPL_top = F.Cu components for left-hand assembly
  // CPL_bottom = same F.Cu components for right-hand assembly (board is flipped)
  const allTopComponents = [...topLayerComponents, ...embeddedResistors];
  const allBottomComponents = [...topLayerComponents, ...embeddedResistors];

  if (allComponents.length === 0) {
    console.log('⚠ No assembly components found');
    return;
  }

  // Generate output files
  const bomPath = path.join(jlcpcbDir, 'temporal_BOM.csv');
  const cplTopPath = path.join(jlcpcbDir, 'temporal_CPL_top.csv');
  const cplBottomPath = path.join(jlcpcbDir, 'temporal_CPL_bottom.csv');

  generateBOM(allComponents, bomPath);
  generateCPL(allTopComponents, cplTopPath, false);
  generateCPL(allBottomComponents, cplBottomPath, true);

  // Count components by description
  const counts = {};
  allComponents.forEach(comp => {
    const desc = comp.description.toLowerCase();
    counts[desc] = (counts[desc] || 0) + 1;
  });

  // Format counts as "N description" pairs
  const countStr = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .map(([desc, count]) => `${count} ${desc}${count > 1 ? 's' : ''}`)
    .join(', ');

  console.log(`✓ Generated JLCPCB assembly files (${countStr})`);
}

main();
