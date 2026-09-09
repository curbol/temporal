#!/usr/bin/env node
/**
 * Report whether each board's ground pours still carry the zones: settings from
 * scripts/kicad_config.yaml.
 *
 * add_ground_planes.js writes those values into the (zone ...) block itself, so
 * check_zone_fills.js cannot see them drift: it refills each board using the
 * board's own settings, and the filled area comes out unchanged by construction.
 * A pour in pcbs/ is written once, when the board is first copied out of
 * ergogen/output, so an edit to zones: reaches every board the next run
 * regenerates and leaves pcbs/temporal on the old values.
 */

const fs = require('fs');
const path = require('path');
const { loadKicadConfig } = require('./kicad_config');

const PCBS_DIR = path.join(__dirname, '..', 'pcbs');

// Config key to the token that carries it in a (zone ...) block. connect_pads
// nests its clearance, and the editor-only hatch pitch sits on the zone itself.
const ZONE_TOKENS = {
  clearance: 'clearance',
  min_thickness: 'min_thickness',
  thermal_gap: 'thermal_gap',
  thermal_bridge_width: 'thermal_bridge_width',
  smoothing_radius: 'radius',
  hatch_thickness: 'hatch_thickness',
  hatch_gap: 'hatch_gap',
  hatch_orientation: 'hatch_orientation',
  hatch_smoothing_level: 'hatch_smoothing_level',
  hatch_smoothing_value: 'hatch_smoothing_value',
  hatch_min_hole_area: 'hatch_min_hole_area',
  display_hatch_pitch: 'hatch edge'
};

/**
 * The GND pours, as text. Splitting on the opening token keeps this independent of
 * the balanced-block parsers the silkscreen passes use.
 */
function groundZones(content) {
  return content
    .split(/\n\t\(zone\b/)
    .slice(1)
    .filter(block => /^\s*\(net\s+(?:\d+\s+)?"GND"\)/m.test(block));
}

function checkBoard(pcbPath, zoneConfig) {
  const content = fs.readFileSync(pcbPath, 'utf-8');
  const zones = groundZones(content);
  const drifted = [];

  if (zones.length === 0) {
    return { zones: 0, drifted };
  }

  for (const [key, token] of Object.entries(ZONE_TOKENS)) {
    const expected = zoneConfig[key];

    if (expected === undefined) {
      console.error(`Error: zones.${key} is missing from scripts/kicad_config.yaml`);
      process.exit(1);
    }

    for (const zone of zones) {
      const match = zone.match(new RegExp(`\\(${token}\\s+([-\\d.]+)\\)`));

      if (match === null) {
        drifted.push(`${key}: no (${token} ...) in the pour`);
        break;
      }

      if (parseFloat(match[1]) !== expected) {
        drifted.push(`${key}: board has ${match[1]}, config says ${expected}`);
        break;
      }
    }
  }

  return { zones: zones.length, drifted };
}

function main() {
  const zoneConfig = loadKicadConfig().zones ?? {};
  const stale = [];
  let checked = 0;
  let poured = 0;

  for (const board of fs.readdirSync(PCBS_DIR, { withFileTypes: true })) {
    if (!board.isDirectory()) {
      continue;
    }

    const pcbPath = path.join(PCBS_DIR, board.name, `${board.name}.kicad_pcb`);

    if (!fs.existsSync(pcbPath)) {
      continue;
    }

    checked++;
    const { zones, drifted } = checkBoard(pcbPath, zoneConfig);

    if (zones > 0) {
      poured++;
    }

    drifted.forEach(entry => stale.push(`${pcbPath}: ${entry}`));
  }

  // Every declared board carries a pour, so finding none means the pattern stopped
  // matching rather than that there was nothing to check.
  if (poured === 0) {
    console.error(`Error: no GND pour found across ${checked} boards in ${PCBS_DIR}`);
    console.error('add_ground_planes.js no longer writes what this check reads.');
    process.exit(1);
  }

  if (stale.length > 0) {
    console.error('Error: ground pours no longer match zones: in scripts/kicad_config.yaml:');
    stale.forEach(entry => console.error(`  ${entry}`));
    console.error("Delete the affected pcbs/<board>/ directories and run 'make gen'.");
    process.exit(1);
  }

  console.log(`✓ Zone settings current on ${poured} boards`);
}

main();
