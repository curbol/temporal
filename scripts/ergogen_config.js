/**
 * Read ergogen/config.yaml, the source of truth for geometry and for the set of
 * boards the build produces. Scripts derive their board lists and shared
 * dimensions from here rather than repeating them.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIG_PATH = path.join(__dirname, '..', 'ergogen', 'config.yaml');
const OUTPUT_PCBS_DIR = path.join(__dirname, '..', 'ergogen', 'output', 'pcbs');

let cached = null;

function loadErgogenConfig() {
  if (cached) {
    return cached;
  }

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Error: Config file not found at ${CONFIG_PATH}`);
    process.exit(1);
  }

  try {
    cached = yaml.load(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  } catch (err) {
    console.error(`Error: Failed to load config: ${err.message}`);
    process.exit(1);
  }

  return cached;
}

/**
 * Every board name under `pcbs:`, in config order.
 */
function pcbNames() {
  return Object.keys(loadErgogenConfig().pcbs ?? {});
}

/**
 * A named value from `units:`. Only plain numbers resolve here; anything
 * defined as an expression must be read from Ergogen's own output instead.
 */
function unit(name) {
  const value = loadErgogenConfig().units?.[name];

  if (typeof value !== 'number') {
    console.error(`Error: units.${name} is not a plain number in ${CONFIG_PATH}`);
    process.exit(1);
  }

  return value;
}

/**
 * Every board Ergogen just wrote, as absolute paths in a stable order. Exits with
 * instructions when the build has not been run, so each post-processing step does
 * not repeat that preamble.
 */
function ergogenOutputPcbs() {
  if (!fs.existsSync(OUTPUT_PCBS_DIR)) {
    console.error(`Error: ${OUTPUT_PCBS_DIR} does not exist`);
    console.error("Run 'npm run gen' first to generate PCB files");
    process.exit(1);
  }

  const pcbFiles = fs.readdirSync(OUTPUT_PCBS_DIR)
    .filter(name => name.endsWith('.kicad_pcb'))
    .sort()
    .map(name => path.join(OUTPUT_PCBS_DIR, name));

  if (pcbFiles.length === 0) {
    console.error(`Error: no .kicad_pcb files found in ${OUTPUT_PCBS_DIR}`);
    console.error("Run 'npm run gen' first to generate PCB files");
    process.exit(1);
  }

  return pcbFiles;
}

module.exports = { loadErgogenConfig, pcbNames, unit, ergogenOutputPcbs, CONFIG_PATH, OUTPUT_PCBS_DIR };
