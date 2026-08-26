#!/usr/bin/env node
/**
 * Write the JLCPCB assembly files for pcbs/temporal: a BOM carrying LCSC part
 * numbers, and a placement list per assembly side. The board is reversible, so
 * the two placement files hold the same parts and differ only by rotation.
 */

const fs = require('fs');
const path = require('path');
const { loadKicadConfig } = require('./kicad_config');

/**
 * Every footprint block in a KiCad PCB, as
 * { name, reference, x, y, rotation, onFront, onBack }.
 *
 * The block and position patterns depend on the exact indentation pcbnew writes,
 * so the parsed count is checked against the declared count: a silently dropped
 * footprint would vanish from both the BOM and the CPL with nothing to notice.
 */
function parseFootprints(pcbPath) {
  const content = fs.readFileSync(pcbPath, 'utf8');
  const footprintRegex = /\(footprint\s+"([^"]+)"[\s\S]*?\n\t\)/g;
  const footprints = [];

  let match;
  while ((match = footprintRegex.exec(content)) !== null) {
    const block = match[0];
    const name = match[1];

    const posMatch = block.match(/\n\t\t\(at\s+([-\d.]+)\s+([-\d.]+)(?:\s+([-\d.]+))?\)/);
    if (!posMatch) {
      console.error(`Error: no position found for footprint "${name}" in ${pcbPath}`);
      process.exit(1);
    }

    const refMatch = block.match(/\(property\s+"Reference"\s+"([^"]+)"/);
    const padLayers = block.match(/\(layers\s+[^)]*\)/g) ?? [];

    footprints.push({
      name,
      reference: refMatch ? refMatch[1] : null,
      x: parseFloat(posMatch[1]),
      y: parseFloat(posMatch[2]),
      rotation: posMatch[3] ? parseFloat(posMatch[3]) : 0,
      onFront: padLayers.some(layers => /"(?:F|\*)\.Cu"/.test(layers)),
      onBack: padLayers.some(layers => /"(?:B|\*)\.Cu"/.test(layers))
    });
  }

  const declared = (content.match(/\(footprint\s+"/g) ?? []).length;
  if (footprints.length !== declared) {
    console.error(`Error: parsed ${footprints.length} of ${declared} footprints in ${pcbPath}`);
    console.error('The KiCad s-expression layout no longer matches the parser.');
    process.exit(1);
  }

  return footprints;
}

function parseKiCadPCB(pcbPath, assemblyParts) {
  const footprintMap = {};
  assemblyParts.forEach(part => {
    footprintMap[part.footprint] = {
      lcsc: part.lcsc_part,
      description: part.description
    };
  });

  return parseFootprints(pcbPath)
    .filter(fp => footprintMap[fp.name])
    .map(fp => ({
      designator: fp.reference,
      footprint: fp.name,
      lcsc: footprintMap[fp.name].lcsc,
      description: footprintMap[fp.name].description,
      x: fp.x,
      y: fp.y,
      rotation: fp.rotation,
      onFront: fp.onFront,
      onBack: fp.onBack
    }));
}

/**
 * Find parent footprints in PCB file for embedded resistor calculation. Only
 * double-sided parents qualify: the resistors bridge jumper pads that have to
 * exist on whichever face the board is assembled from.
 */
function findParentFootprints(pcbPath, parentFootprintName) {
  const parents = parseFootprints(pcbPath).filter(fp => fp.name === parentFootprintName);
  const singleSided = parents.filter(fp => !(fp.onFront && fp.onBack));

  if (singleSided.length > 0) {
    console.error(`Error: ${parentFootprintName} has pads on only one copper layer in ${pcbPath}`);
    console.error('Its jumper resistors cannot serve both assembly sides.');
    process.exit(1);
  }

  return parents;
}

/**
 * KiCad angles run clockwise, so the rotation is negated before it is applied.
 */
function transformCoordinates(localX, localY, footprintX, footprintY, footprintRotation) {
  const rad = (-footprintRotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rotatedX = localX * cos - localY * sin;
  const rotatedY = localX * sin + localY * cos;

  return {
    x: footprintX + rotatedX,
    y: footprintY + rotatedY
  };
}

/**
 * Generate embedded resistor components from parent footprints. The board is
 * reversible, so one set of positions serves both assembly sides.
 */
function generateEmbeddedResistors(pcbPath, embeddedConfig) {
  const components = [];
  const lcsc = embeddedConfig.lcsc_part;
  const description = embeddedConfig.description;
  let resistorIndex = 1;

  if (embeddedConfig.mcu_nice_nano) {
    const mcuConfig = embeddedConfig.mcu_nice_nano;
    const mcuFootprints = findParentFootprints(pcbPath, mcuConfig.parent_footprint);

    mcuFootprints.forEach(fp => {
      mcuConfig.resistor_x_offsets.forEach(xOffset => {
        mcuConfig.resistor_y_offsets.forEach(yOffset => {
          const global = transformCoordinates(xOffset, yOffset, fp.x, fp.y, fp.rotation);
          const rotation = (fp.rotation + mcuConfig.rotation_offset) % 360;

          components.push({
            designator: `JR${resistorIndex++}`,
            footprint: '0402',
            lcsc: lcsc,
            description: description,
            x: global.x,
            y: global.y,
            rotation: rotation
          });
        });
      });
    });
  }

  if (embeddedConfig.display_nice_view) {
    const displayConfig = embeddedConfig.display_nice_view;
    const displayFootprints = findParentFootprints(pcbPath, displayConfig.parent_footprint);

    displayFootprints.forEach(fp => {
      displayConfig.positions.forEach(pos => {
        const global = transformCoordinates(pos[0], pos[1], fp.x, fp.y, fp.rotation);
        const rotation = (fp.rotation + displayConfig.rotation_offset) % 360;

        components.push({
          designator: `JR${resistorIndex++}`,
          footprint: '0402',
          lcsc: lcsc,
          description: description,
          x: global.x,
          y: global.y,
          rotation: rotation,
        });
      });
    });
  }

  if (embeddedConfig.battery_connector) {
    const batteryConfig = embeddedConfig.battery_connector;
    const batteryFootprints = findParentFootprints(pcbPath, batteryConfig.parent_footprint);

    batteryFootprints.forEach(fp => {
      batteryConfig.positions.forEach(pos => {
        const global = transformCoordinates(pos[0], pos[1], fp.x, fp.y, fp.rotation);
        const rotation = (fp.rotation + batteryConfig.rotation_offset) % 360;

        components.push({
          designator: `JR${resistorIndex++}`,
          footprint: '0402',
          lcsc: lcsc,
          description: description,
          x: global.x,
          y: global.y,
          rotation: rotation,
        });
      });
    });
  }

  return components;
}

function generateBOM(components, outputPath) {
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

  // Sorted by LCSC part number so the file is byte-stable between runs.
  let csv = 'Comment,Designator,Footprint,LCSC Part #\n';

  const sortedEntries = [...bomMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [, item] of sortedEntries) {
    const designators = item.designator.sort().join(',');
    csv += `"${item.comment}","${designators}","${item.footprint}","${item.lcsc}"\n`;
  }

  fs.writeFileSync(outputPath, csv);
}

/**
 * Wrap an angle into the 0-360 range JLCPCB's CPL format expects.
 */
function normalizeRotation(degrees) {
  return Math.round((((degrees % 360) + 360) % 360) * 1000) / 1000;
}

function generateCPL(components, outputPath, isBottomSide = false) {
  let csv = 'Designator,Mid X,Mid Y,Layer,Rotation\n';

  // For JLCPCB assembly, the Layer column indicates which side to assemble
  // NOT which layer the component is on in KiCad
  const assemblyLayer = isBottomSide ? 'Bottom' : 'Top';

  // Sort by designator for deterministic output
  const sortedComponents = [...components].sort((a, b) => a.designator.localeCompare(b.designator));

  sortedComponents.forEach(comp => {
    // JLCPCB expects 0-360, and the board carries negative angles on splayed columns
    const rotation = normalizeRotation(isBottomSide ? (180 - comp.rotation) : comp.rotation);

    // JLCPCB uses Cartesian coordinates (Y increases upward)
    // KiCad uses Y increasing downward, so we need to negate Y
    const y_jlcpcb = -comp.y;

    csv += `"${comp.designator}",${comp.x.toFixed(4)}mm,${y_jlcpcb.toFixed(4)}mm,${assemblyLayer},${rotation}\n`;
  });

  fs.writeFileSync(outputPath, csv);
}

function main() {
  const pcbFile = path.join(__dirname, '..', 'pcbs', 'temporal', 'temporal.kicad_pcb');
  const jlcpcbDir = path.join(__dirname, '..', 'jlcpcb');

  if (!fs.existsSync(pcbFile)) {
    console.error(`Error: PCB file not found at ${pcbFile}`);
    process.exit(1);
  }

  const config = loadKicadConfig().jlcpcb;

  const components = parseKiCadPCB(pcbFile, config.assembly_parts);

  let embeddedResistors = [];
  if (config.embedded_resistors) {
    embeddedResistors = generateEmbeddedResistors(pcbFile, config.embedded_resistors);
  }

  // The board is reversible, so one set of parts serves both assemblies: the
  // right hand is built on the top side and the left hand on the bottom side of
  // the same board, at the same coordinates. That only holds for footprints with
  // pads on both copper layers, which is why the two CPL files differ by rotation
  // alone. A genuinely single-sided part would need its own transform, so reject
  // one rather than place it from a face that has no pads.
  const singleSided = components.filter(comp => !(comp.onFront && comp.onBack));
  if (singleSided.length > 0) {
    const names = [...new Set(singleSided.map(comp => comp.footprint))].join(', ');
    console.error(`Error: assembly parts have pads on only one copper layer: ${names}`);
    console.error('The reversible-board CPL transform assumes pads on both layers,');
    console.error('so a single-sided part would be placed from the wrong face.');
    process.exit(1);
  }

  const allComponents = [...components, ...embeddedResistors];

  if (allComponents.length === 0) {
    console.error(`Error: no assembly components found in ${pcbFile}`);
    console.error('Writing nothing would leave the committed BOM and CPL in place and stale.');
    process.exit(1);
  }

  const bomPath = path.join(jlcpcbDir, 'temporal_BOM.csv');
  const cplTopPath = path.join(jlcpcbDir, 'temporal_CPL_top.csv');
  const cplBottomPath = path.join(jlcpcbDir, 'temporal_CPL_bottom.csv');

  generateBOM(allComponents, bomPath);
  generateCPL(allComponents, cplTopPath, false);
  generateCPL(allComponents, cplBottomPath, true);

  const counts = {};
  allComponents.forEach(comp => {
    const desc = comp.description.toLowerCase();
    counts[desc] = (counts[desc] || 0) + 1;
  });

  const countStr = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([desc, count]) => `${count} ${desc}${count > 1 ? 's' : ''}`)
    .join(', ');

  console.log(`✓ Generated JLCPCB assembly files (${countStr})`);
}

main();
