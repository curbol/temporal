#!/usr/bin/env node
/**
 * Add GND copper pour zones to KiCad PCB files.
 *
 * Creates filled copper zones on F.Cu and B.Cu layers connected to the GND net,
 * following the board outline from Edge.Cuts layer.
 */

const fs = require('fs');
const path = require('path');
const { ergogenOutputPcbs } = require('./ergogen_config');
const { randomUUID } = require('crypto');
const { loadKicadConfig } = require('./kicad_config');

/**
 * Generate a KiCad-compatible UUID.
 */
function generateUUID() {
  return randomUUID();
}

/**
 * Extreme points of the arc through three points. Beyond the three points
 * themselves, an arc only reaches further where it crosses a cardinal direction
 * of its circle, so those crossings are the remaining candidates.
 */
function arcExtremes(start, mid, end) {
  const [x1, y1] = start, [x2, y2] = mid, [x3, y3] = end;
  const d = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

  if (Math.abs(d) < 1e-12) {
    return [start, mid, end];
  }

  const s1 = x1 * x1 + y1 * y1, s2 = x2 * x2 + y2 * y2, s3 = x3 * x3 + y3 * y3;
  const cx = (s1 * (y2 - y3) + s2 * (y3 - y1) + s3 * (y1 - y2)) / d;
  const cy = (s1 * (x3 - x2) + s2 * (x1 - x3) + s3 * (x2 - x1)) / d;
  const radius = Math.hypot(x1 - cx, y1 - cy);

  const TAU = 2 * Math.PI;
  const norm = a => ((a % TAU) + TAU) % TAU;
  const angle = (x, y) => norm(Math.atan2(y - cy, x - cx));

  const a1 = angle(x1, y1);
  const ccwSpan = norm(angle(x3, y3) - a1);
  const counterClockwise = norm(angle(x2, y2) - a1) <= ccwSpan;
  const span = counterClockwise ? ccwSpan : norm(a1 - angle(x3, y3));

  const points = [start, mid, end];
  for (let quarter = 0; quarter < 4; quarter++) {
    const a = quarter * Math.PI / 2;
    const swept = counterClockwise ? norm(a - a1) : norm(a1 - a);
    if (swept <= span) {
      points.push([cx + radius * Math.cos(a), cy + radius * Math.sin(a)]);
    }
  }

  return points;
}

/**
 * Calculate a rectangular bounding box that covers the entire board.
 * Returns an array of 4 [x, y] coordinate pairs forming a rectangle.
 */
function calculateBoundingBox(content, margin = 2.0) {
  const linePattern = /\(gr_line\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\)/gs;
  const arcPattern = /\(gr_arc\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(mid\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\)/gs;
  const circlePattern = /\(gr_circle\s+\(center\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\)/gs;

  const xCoords = [];
  const yCoords = [];
  const addPoint = ([x, y]) => { xCoords.push(x); yCoords.push(y); };

  for (const match of content.matchAll(linePattern)) {
    addPoint([parseFloat(match[1]), parseFloat(match[2])]);
    addPoint([parseFloat(match[3]), parseFloat(match[4])]);
  }

  for (const match of content.matchAll(arcPattern)) {
    const coords = match.slice(1, 7).map(parseFloat);
    arcExtremes(coords.slice(0, 2), coords.slice(2, 4), coords.slice(4, 6)).forEach(addPoint);
  }

  for (const match of content.matchAll(circlePattern)) {
    const cx = parseFloat(match[1]), cy = parseFloat(match[2]);
    const radius = Math.hypot(parseFloat(match[3]) - cx, parseFloat(match[4]) - cy);
    addPoint([cx - radius, cy - radius]);
    addPoint([cx + radius, cy + radius]);
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
function createZoneDefinition(netNumber, netName, layer, points, tstamp, zoneConfig) {
  // Extract values from config
  const clearance = zoneConfig.clearance;
  const minThickness = zoneConfig.min_thickness;
  const thermalGap = zoneConfig.thermal_gap;
  const thermalBridgeWidth = zoneConfig.thermal_bridge_width;
  const radius = zoneConfig.smoothing_radius;
  const hatchThickness = zoneConfig.hatch_thickness;
  const hatchGap = zoneConfig.hatch_gap;
  const hatchOrientation = zoneConfig.hatch_orientation;
  const hatchSmoothingLevel = zoneConfig.hatch_smoothing_level;
  const hatchSmoothingValue = zoneConfig.hatch_smoothing_value;
  const hatchMinHoleArea = zoneConfig.hatch_min_hole_area;
  const displayHatchPitch = zoneConfig.display_hatch_pitch;

  // Format polygon points
  const ptsStr = points.map(([x, y]) => `        (xy ${x} ${y})`).join('\n');

  return `  (zone
    (net ${netNumber})
    (net_name "${netName}")
    (layer "${layer}")
    (uuid "${tstamp}")
    (hatch edge ${displayHatchPitch})
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
      (hatch_smoothing_value ${hatchSmoothingValue})
      (hatch_border_algorithm hatch_thickness)
      (hatch_min_hole_area ${hatchMinHoleArea})
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

  // Search only the net table. The same shape appears inside footprint pads, and
  // inserting there would splice the net definition into a pad instead.
  const netTableEnd = content.indexOf('(footprint');
  const netTable = netTableEnd === -1 ? content : content.slice(0, netTableEnd);

  const netsPattern = /(\(net\s+\d+\s+"[^"]*"\)\s*\n)/gm;
  const matches = [...netTable.matchAll(netsPattern)];

  if (matches.length === 0) {
    console.error('Error: Could not find nets section in PCB file');
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
function processPcbFile(filepath, zoneConfig) {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Check if zones already exist (skip silently)
  if (zonesAlreadyExist(content)) {
    return false;
  }

  // Find or create GND net
  let gndNet = findGndNet(content);
  let netNumber, netName;

  if (!gndNet) {
    [content, netNumber] = createGndNet(content);
    if (netNumber === null) {
      console.error(`Error: Could not create GND net in ${path.basename(filepath)}`);
      return false;
    }
    netName = 'GND';
  } else {
    [netNumber, netName] = gndNet;
  }

  // Calculate bounding box around board
  const points = calculateBoundingBox(content, 2.0);
  if (points.length === 0) {
    console.error(`Error: Could not find Edge.Cuts outline in ${path.basename(filepath)}`);
    return false;
  }

  // Generate zones for F.Cu and B.Cu
  const frontZone = createZoneDefinition(netNumber, netName, 'F.Cu', points, generateUUID(), zoneConfig);
  const backZone = createZoneDefinition(netNumber, netName, 'B.Cu', points, generateUUID(), zoneConfig);

  // Find the insertion point (before the closing parenthesis)
  const lastParen = content.lastIndexOf(')');
  if (lastParen === -1) {
    console.error(`Error: Malformed PCB file ${path.basename(filepath)}`);
    return false;
  }

  // Insert zones
  const modifiedContent = content.slice(0, lastParen) + `\n${frontZone}\n${backZone}\n` + content.slice(lastParen);

  // Write back
  fs.writeFileSync(filepath, modifiedContent, 'utf-8');

  return true;
}

/**
 * Main entry point.
 */
function main() {
  // Load zone configuration from YAML
  const config = loadKicadConfig();
  const zoneConfig = config.zones;

  const pcbFiles = ergogenOutputPcbs();

  let processed = 0;
  let failed = 0;
  for (const pcbFile of pcbFiles) {
    if (processPcbFile(pcbFile, zoneConfig)) {
      processed++;
    } else {
      failed++;
    }
  }

  if (processed > 0) {
    console.log(`✓ Added GND zones to ${processed} PCB files`);
  }

  if (failed > 0) {
    console.error(`Error: ${failed} of ${pcbFiles.length} PCB files did not get GND zones`);
    process.exit(1);
  }
}

main();
