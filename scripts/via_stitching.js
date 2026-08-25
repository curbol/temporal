#!/usr/bin/env node
/**
 * Add via stitching to KiCad PCB files using the ViaStitching plugin.
 *
 * Uses KiCad's pcbnew Python API and the ViaStitching plugin to automatically
 * add stitching vias on a grid pattern to improve EMI performance and ground
 * plane connectivity.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { OUTPUT_PCBS_DIR } = require('./ergogen_config');
const { getKiCadPythonOrThrow } = require('./kicad_python');
const { loadKicadConfig } = require('./kicad_config');

/**
 * Add via stitching to a KiCad PCB file using the Python API.
 * Returns the number of vias placed, or -1 on error.
 */
function addViaStitching(filepath, pythonPath, config) {
  try {
    const scriptPath = path.join(__dirname, 'via_stitching.py');
    const args = [
      `"${pythonPath}"`,
      `"${scriptPath}"`,
      `"${filepath}"`,
      `"${config.net_name}"`,
      config.step_mm,
      config.size_mm,
      config.drill_mm,
      config.clearance_mm
    ].join(' ');

    const output = execSync(args, {
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    // Parse the number of vias from the plugin output
    // Format: "Done. 31 vias placed. You have to refill all your pcb's areas/zones !!!"
    const match = output.match(/(\d+) vias placed/);
    return match ? parseInt(match[1], 10) : 0;
  } catch (err) {
    console.error(`Error: Failed to add via stitching: ${err.message}`);
    return -1;
  }
}

/**
 * Main entry point.
 */
function main() {
  // Find KiCad's Python interpreter
  let pythonPath;
  try {
    pythonPath = getKiCadPythonOrThrow();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  // Load via stitching configuration
  const config = loadKicadConfig().via_stitching;

  // Allow CLI override for step_mm (first argument)
  const stepArg = process.argv[2];
  if (stepArg) {
    const stepValue = parseFloat(stepArg);
    if (isNaN(stepValue) || stepValue <= 0) {
      console.error(`Error: Invalid step value '${stepArg}'. Must be a positive number.`);
      process.exit(1);
    }
    config.step_mm = stepValue;
  }

  // Only process temporal.kicad_pcb
  const temporalPcb = path.join(OUTPUT_PCBS_DIR, 'temporal.kicad_pcb');

  if (!fs.existsSync(temporalPcb)) {
    console.error(`Error: temporal.kicad_pcb not found in ${OUTPUT_PCBS_DIR}`);
    process.exit(1);
  }

  const viasAdded = addViaStitching(temporalPcb, pythonPath, config);
  if (viasAdded < 0) {
    process.exit(1);
  }

  console.log(`✓ Added ${viasAdded} stitching vias to temporal.kicad_pcb (${config.step_mm}mm grid)`);
}

main();
