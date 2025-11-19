#!/usr/bin/env node
/**
 * Add GND copper pour zones to KiCad PCB files.
 *
 * Creates filled copper zones on F.Cu and B.Cu layers connected to the GND net,
 * following the board outline from Edge.Cuts layer.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const yaml = require('js-yaml');
const { randomUUID } = require('crypto');

/**
 * Load defaults from YAML config file.
 */
function loadDefaultsConfig() {
  const configPath = path.join(__dirname, '..', 'config', 'kicad_defaults.yaml');

  if (!fs.existsSync(configPath)) {
    console.warn(`Warning: Config file not found at ${configPath}`);
    console.warn('Using fallback hardcoded defaults');
    return null;
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return yaml.load(content);
  } catch (err) {
    console.warn(`Warning: Failed to load config: ${err.message}`);
    console.warn('Using fallback hardcoded defaults');
    return null;
  }
}

/**
 * Generate a KiCad-compatible UUID.
 */
function generateUUID() {
  return randomUUID();
}

/**
 * Calculate a rectangular bounding box that covers the entire board.
 * Returns an array of 4 [x, y] coordinate pairs forming a rectangle.
 */
function calculateBoundingBox(content, margin = 2.0) {
  // Find all Edge.Cuts gr_line segments
  const linePattern = /\(gr_line\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\)/gs;

  const xCoords = [];
  const yCoords = [];

  for (const match of content.matchAll(linePattern)) {
    const startX = parseFloat(match[1]);
    const startY = parseFloat(match[2]);
    const endX = parseFloat(match[3]);
    const endY = parseFloat(match[4]);

    xCoords.push(startX, endX);
    yCoords.push(startY, endY);
  }

  if (xCoords.length === 0 || yCoords.length === 0) {
    return [];
  }

  // Calculate bounding box with margin
  const minX = Math.min(...xCoords) - margin;
  const minY = Math.min(...yCoords) - margin;
  const maxX = Math.max(...xCoords) + margin;
  const maxY = Math.max(...yCoords) + margin;

  // Return rectangle as 4 points: bottom-left, bottom-right, top-right, top-left
  return [
    [minX, minY],  // bottom-left
    [maxX, minY],  // bottom-right
    [maxX, maxY],  // top-right
    [minX, maxY]   // top-left
  ];
}

/**
 * Create a KiCad zone definition with hatch fill pattern.
 */
function createZoneDefinition(netNumber, netName, layer, points, tstamp, zoneConfig = null) {
  // Default values (fallback if config not provided)
  const defaults = {
    clearance: 0.2,
    min_thickness: 0.2,
    thermal_gap: 0.254,
    thermal_bridge_width: 0.4,
    smoothing_radius: 0.5,
    hatch_thickness: 0.5,
    hatch_gap: 0.5,
    hatch_orientation: 45,
    hatch_smoothing_level: 0
  };

  // Use config values if provided, otherwise use defaults
  const clearance = zoneConfig?.clearance ?? defaults.clearance;
  const minThickness = zoneConfig?.min_thickness ?? defaults.min_thickness;
  const thermalGap = zoneConfig?.thermal_gap ?? defaults.thermal_gap;
  const thermalBridgeWidth = zoneConfig?.thermal_bridge_width ?? defaults.thermal_bridge_width;
  const radius = zoneConfig?.smoothing_radius ?? defaults.smoothing_radius;
  const hatchThickness = zoneConfig?.hatch_thickness ?? defaults.hatch_thickness;
  const hatchGap = zoneConfig?.hatch_gap ?? defaults.hatch_gap;
  const hatchOrientation = zoneConfig?.hatch_orientation ?? defaults.hatch_orientation;
  const hatchSmoothingLevel = zoneConfig?.hatch_smoothing_level ?? defaults.hatch_smoothing_level;

  // Format polygon points
  const ptsStr = points.map(([x, y]) => `        (xy ${x} ${y})`).join('\n');

  return `  (zone
    (net ${netNumber})
    (net_name "${netName}")
    (layer "${layer}")
    (uuid "${tstamp}")
    (hatch edge 0.5)
    (priority 0)
    (connect_pads
      (clearance ${clearance})
    )
    (min_thickness ${minThickness})
    (filled_areas_thickness no)
    (fill yes
      (mode hatch)
      (thermal_gap ${thermalGap})
      (thermal_bridge_width ${thermalBridgeWidth})
      (smoothing fillet)
      (radius ${radius})
      (hatch_thickness ${hatchThickness})
      (hatch_gap ${hatchGap})
      (hatch_orientation ${hatchOrientation})
      (hatch_smoothing_level ${hatchSmoothingLevel})
      (hatch_smoothing_value 0.1)
      (hatch_border_algorithm hatch_thickness)
      (hatch_min_hole_area 0.3)
    )
    (polygon
      (pts
${ptsStr}
      )
    )
  )
`;
}

/**
 * Find the highest net number in the PCB file.
 */
function findHighestNetNumber(content) {
  const netPattern = /\(net\s+(\d+)\s+"[^"]*"\)/g;
  const netNumbers = [];

  for (const match of content.matchAll(netPattern)) {
    netNumbers.push(parseInt(match[1], 10));
  }

  return netNumbers.length > 0 ? Math.max(...netNumbers) : 0;
}

/**
 * Find the GND net number from the PCB file.
 * Returns [netNumber, netName] or null if not found.
 */
function findGndNet(content) {
  const netPattern = /\(net\s+(\d+)\s+"GND"\)/i;
  const match = content.match(netPattern);

  if (match) {
    return [parseInt(match[1], 10), 'GND'];
  }

  return null;
}

/**
 * Create a GND net in the PCB file if it doesn't exist.
 * Returns [modifiedContent, netNumber].
 */
function createGndNet(content) {
  // Find the highest existing net number
  const nextNetNumber = findHighestNetNumber(content) + 1;

  // Find the nets section and add GND net after the last net definition
  const netsPattern = /(\(net\s+\d+\s+"[^"]*"\)\s*\n)/gm;
  const matches = [...content.matchAll(netsPattern)];

  if (matches.length === 0) {
    console.warn('  ⚠ Could not find nets section in PCB file');
    return [content, null];
  }

  // Insert after the last net definition
  const lastMatch = matches[matches.length - 1];
  const insertPos = lastMatch.index + lastMatch[0].length;

  const gndNetDefinition = `  (net ${nextNetNumber} "GND")\n`;

  const modifiedContent = content.slice(0, insertPos) + gndNetDefinition + content.slice(insertPos);

  return [modifiedContent, nextNetNumber];
}

/**
 * Check if GND zones already exist in the file.
 */
function zonesAlreadyExist(content) {
  const zonePattern = /\(zone.*?\(net_name\s+"GND"\)/s;
  return zonePattern.test(content);
}

/**
 * Add GND zones to a KiCad PCB file.
 */
function processPcbFile(filepath, zoneConfig = null) {
  console.log(`Processing ${filepath}...`);

  let content = fs.readFileSync(filepath, 'utf-8');

  // Check if zones already exist
  if (zonesAlreadyExist(content)) {
    console.log('  ⚠ GND zones already exist, skipping');
    return false;
  }

  // Find or create GND net
  let gndNet = findGndNet(content);
  let netNumber, netName;

  if (!gndNet) {
    console.log('  GND net not found, creating one...');
    [content, netNumber] = createGndNet(content);
    if (netNumber === null) {
      return false;
    }
    netName = 'GND';
    console.log(`  Created GND net: net ${netNumber}`);
  } else {
    [netNumber, netName] = gndNet;
    console.log(`  Found GND net: net ${netNumber}`);
  }

  // Calculate bounding box around board
  const points = calculateBoundingBox(content, 2.0);
  if (points.length === 0) {
    console.log('  ⚠ No Edge.Cuts found, skipping');
    return false;
  }

  console.log(`  Calculated bounding box: ${points.length} corners`);

  // Generate zones for F.Cu and B.Cu
  const frontZone = createZoneDefinition(netNumber, netName, 'F.Cu', points, generateUUID(), zoneConfig);
  const backZone = createZoneDefinition(netNumber, netName, 'B.Cu', points, generateUUID(), zoneConfig);

  // Find the insertion point (before the closing parenthesis)
  const lastParen = content.lastIndexOf(')');
  if (lastParen === -1) {
    console.log('  ⚠ Malformed PCB file, skipping');
    return false;
  }

  // Insert zones
  const modifiedContent = content.slice(0, lastParen) + `\n${frontZone}\n${backZone}\n` + content.slice(lastParen);

  // Write back
  fs.writeFileSync(filepath, modifiedContent, 'utf-8');

  // Display zone settings
  const clearance = zoneConfig?.clearance ?? 0.2;
  const thermalGap = zoneConfig?.thermal_gap ?? 0.254;
  const thermalBridge = zoneConfig?.thermal_bridge_width ?? 0.4;

  console.log('  ✓ Added GND zones to F.Cu and B.Cu');
  console.log(`     Clearance: ${clearance}mm, Thermal gap: ${thermalGap}mm, Bridge: ${thermalBridge}mm`);
  return true;
}

/**
 * Main entry point.
 */
async function main() {
  // Load zone configuration from YAML
  const config = loadDefaultsConfig();
  const zoneConfig = config?.zones ?? null;

  if (zoneConfig) {
    console.log('Loaded zone settings from config/kicad_defaults.yaml');
    console.log(`  Clearance: ${zoneConfig.clearance ?? 0.2}mm`);
    console.log(`  Thermal gap: ${zoneConfig.thermal_gap ?? 0.254}mm`);
    console.log(`  Thermal bridge: ${zoneConfig.thermal_bridge_width ?? 0.4}mm`);
    console.log();
  }

  const outputDir = 'ergogen/output/pcbs';

  if (!fs.existsSync(outputDir)) {
    console.error(`Error: ${outputDir} does not exist`);
    console.error("Run 'npm run gen' first to generate PCB files");
    process.exit(1);
  }

  const pcbFiles = await glob(`${outputDir}/*.kicad_pcb`);

  if (pcbFiles.length === 0) {
    console.error(`No .kicad_pcb files found in ${outputDir}`);
    process.exit(1);
  }

  let processed = 0;
  for (const pcbFile of pcbFiles) {
    if (processPcbFile(pcbFile, zoneConfig)) {
      processed++;
    }
  }

  console.log(`\n✓ Added GND zones to ${processed}/${pcbFiles.length} PCB files`);
  console.log('Note: Zones will be filled when you first open the PCB in KiCad');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
