/**
 * Load scripts/kicad_config.yaml, the single owner of net classes, design rules,
 * custom DRC rules, zone and via-stitching parameters, keepout text patterns, and
 * the JLCPCB part numbers.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { unit } = require('./ergogen_config');

const CONFIG_PATH = path.join(__dirname, 'kicad_config.yaml');

let cached = null;

/**
 * Fill in the net class track and via geometry from ergogen/config.yaml's units.
 * Those same units size the copper the footprints emit, so a net class that
 * repeated the numbers here could disagree with the traces already on the board.
 */
function applyCopperGeometry(config) {
  const trackWidth = unit('copper_trace_width');
  const viaDiameter = unit('copper_via_diameter');
  const viaDrill = unit('copper_via_drill');

  config.net_class_default = {
    ...(config.net_class_default ?? {}),
    track_width: trackWidth,
    via_diameter: viaDiameter,
    via_drill: viaDrill
  };

  config.net_classes = (config.net_classes ?? []).map(netClass => ({
    ...netClass,
    via_diameter: viaDiameter,
    via_drill: viaDrill
  }));

  return config;
}

function loadKicadConfig() {
  if (cached) {
    return cached;
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Error: Config file not found at ${CONFIG_PATH}`);
    process.exit(1);
  }

  try {
    cached = applyCopperGeometry(yaml.load(fs.readFileSync(CONFIG_PATH, 'utf-8')));
  } catch (err) {
    console.error(`Error: Failed to load config: ${err.message}`);
    process.exit(1);
  }

  return cached;
}

module.exports = { loadKicadConfig, CONFIG_PATH };
