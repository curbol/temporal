/**
 * Load scripts/kicad_config.yaml, the single owner of net classes, design rules,
 * custom DRC rules, zone and via-stitching parameters, keepout text patterns, and
 * the JLCPCB part numbers. Dimensions ergogen/config.yaml's units already own are
 * filled in here rather than repeated in the YAML.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { unit } = require('./ergogen_config');

const CONFIG_PATH = path.join(__dirname, 'kicad_config.yaml');

let cached = null;

const NET_CLASS_TRACK_UNITS = {
  Power: 'copper_power_trace_width',
  Battery: 'copper_battery_trace_width'
};

/**
 * Fill in every dimension ergogen/config.yaml's units already own: net class track
 * and via geometry, the stitching via geometry, and the silkscreen pen. Those same
 * units size the copper and silkscreen the footprints emit, so a value repeated
 * here could disagree with what is already on the board.
 */
function applyErgogenUnits(config) {
  const trackWidth = unit('copper_trace_width');
  const viaDiameter = unit('copper_via_diameter');
  const viaDrill = unit('copper_via_drill');
  const silkLineWidth = unit('silk_line_width');

  config.net_class_default = {
    ...(config.net_class_default ?? {}),
    track_width: trackWidth,
    via_diameter: viaDiameter,
    via_drill: viaDrill
  };

  config.net_classes = (config.net_classes ?? []).map(netClass => {
    const trackUnit = NET_CLASS_TRACK_UNITS[netClass.name];

    if (!trackUnit) {
      console.error(`Error: net class "${netClass.name}" has no track width unit in ${CONFIG_PATH}`);
      process.exit(1);
    }

    return {
      ...netClass,
      track_width: unit(trackUnit),
      via_diameter: viaDiameter,
      via_drill: viaDrill
    };
  });

  config.via_stitching = {
    ...(config.via_stitching ?? {}),
    size_mm: viaDiameter,
    drill_mm: viaDrill
  };

  config.board_defaults = {
    ...(config.board_defaults ?? {}),
    silk_line_width: silkLineWidth,
    silk_text_thickness: silkLineWidth
  };

  return config;
}

function loadKicadConfig() {
  if (cached) {
    return cached;
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Error: config file not found at ${CONFIG_PATH}`);
    process.exit(1);
  }

  try {
    cached = applyErgogenUnits(yaml.load(fs.readFileSync(CONFIG_PATH, 'utf-8')));
  } catch (err) {
    console.error(`Error: could not load config: ${err.message}`);
    process.exit(1);
  }

  return cached;
}

module.exports = { loadKicadConfig, CONFIG_PATH };
