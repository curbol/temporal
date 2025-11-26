#!/usr/bin/env node
/**
 * Fill zones in KiCad PCB files using KiCad's Python API.
 *
 * Uses the pcbnew Python module to fill all zones in each PCB file.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { glob } = require('glob');
const { getKiCadPythonOrThrow } = require('./kicad_python');

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
async function main() {
  const outputDir = 'ergogen/output/pcbs';

  if (!fs.existsSync(outputDir)) {
    console.error(`Error: ${outputDir} does not exist`);
    console.error("Run 'npm run gen' first to generate PCB files");
    process.exit(1);
  }

  // Find KiCad's Python interpreter
  let pythonPath;
  try {
    pythonPath = getKiCadPythonOrThrow();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const pcbFiles = await glob(`${outputDir}/*.kicad_pcb`);

  if (pcbFiles.length === 0) {
    console.error(`No .kicad_pcb files found in ${outputDir}`);
    process.exit(1);
  }

  let processed = 0;
  for (const pcbFile of pcbFiles) {
    if (fillZonesInPcb(pcbFile, pythonPath)) {
      processed++;
    }
  }

  if (processed > 0) {
    console.log(`✓ Filled zones in ${processed} PCB files`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
