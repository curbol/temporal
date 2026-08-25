#!/usr/bin/env node
/**
 * Embed the silkscreen fonts into each generated board.
 *
 * Without this, what gets fabricated depends on which fonts the exporting machine
 * happens to have installed, and KiCad substitutes silently when one is missing.
 * Embedding makes the board carry its own font, so the silkscreen is a function of
 * the repository rather than the host.
 */

const path = require('path');
const { execSync } = require('child_process');
const { ergogenOutputPcbs } = require('./ergogen_config');
const { getKiCadPythonOrThrow } = require('./kicad_python');

function main() {
  const pcbFiles = process.argv.length > 2 ? process.argv.slice(2) : ergogenOutputPcbs();

  let pythonPath;
  try {
    pythonPath = getKiCadPythonOrThrow();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const scriptPath = path.join(__dirname, 'embed_fonts.py');
  const args = [pythonPath, scriptPath, ...pcbFiles].map(arg => `"${arg}"`).join(' ');

  let output;
  try {
    output = execSync(args, { encoding: 'utf8', stdio: 'pipe' });
  } catch (err) {
    console.error(`Error: font embedding failed: ${err.message}`);
    if (err.stderr) {
      console.error(err.stderr);
    }
    process.exit(1);
  }

  const results = Object.entries(JSON.parse(output));
  const failed = results.filter(([, count]) => count < 0);
  const embedded = results.reduce((total, [, count]) => total + Math.max(count, 0), 0);

  if (embedded > 0) {
    console.log(`✓ Embedded ${embedded} font file(s) across ${results.length} PCB files`);
  }

  if (failed.length > 0) {
    console.error(`Error: font embedding failed for ${failed.length} PCB file(s):`);
    failed.forEach(([pcbPath]) => console.error(`  ${path.basename(pcbPath)}`));
    process.exit(1);
  }
}

main();
