#!/usr/bin/env node
/**
 * Fill zones in KiCad PCB files using KiCad's Python API.
 *
 * Uses the pcbnew Python module to fill all zones in each PCB file.
 */

const path = require('path');
const { execSync } = require('child_process');
const { ergogenOutputPcbs } = require('./ergogen_config');
const { getKiCadPythonOrThrow } = require('./kicad_python');
const { loadCustomRules, writeDrcRules } = require('./drc_rules');

/**
 * Fill zones in a KiCad PCB file using the Python API.
 */
function fillZonesInPcb(filepath, pythonPath) {
  try {
    const scriptPath = path.join(__dirname, 'fill_zones.py');
    execSync(`"${pythonPath}" "${scriptPath}" "${filepath}"`, {
      stdio: 'pipe'
    });
    return true;
  } catch (err) {
    console.error(`Error: Failed to fill zones in ${path.basename(filepath)}: ${err.message}`);
    return false;
  }
}

/**
 * Main entry point.
 */
function main() {
  const pcbFiles = ergogenOutputPcbs();

  // Find KiCad's Python interpreter
  let pythonPath;
  try {
    pythonPath = getKiCadPythonOrThrow();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const customRules = loadCustomRules();

  let processed = 0;
  let failed = 0;
  for (const pcbFile of pcbFiles) {
    writeDrcRules(pcbFile, customRules);

    if (fillZonesInPcb(pcbFile, pythonPath)) {
      processed++;
    } else {
      failed++;
    }
  }

  if (processed > 0) {
    console.log(`✓ Filled zones in ${processed} PCB files`);
  }

  if (failed > 0) {
    console.error(`Error: ${failed} of ${pcbFiles.length} PCB files failed zone filling`);
    process.exit(1);
  }
}

main();
