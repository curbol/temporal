#!/usr/bin/env node
/**
 * Check that the boards in pcbs/ still carry the pour their custom DRC rules produce.
 *
 * The post-processing steps run on ergogen/output/pcbs, and copy_pcb_if_missing.sh
 * refuses to overwrite an existing board, so pcbs/temporal keeps whatever pour it was
 * given when it was first copied. This is the signal that a later edit to the zone or
 * custom-rule settings never reached it.
 */

const path = require('path');
const { execSync } = require('child_process');
const { glob } = require('glob');
const { getKiCadPythonOrThrow } = require('./kicad_python');

async function main() {
  const pcbFiles = (await glob('pcbs/*/*.kicad_pcb', { ignore: '**/_autosave-*' })).sort();

  if (pcbFiles.length === 0) {
    console.error('Error: no .kicad_pcb files found in pcbs/');
    process.exit(1);
  }

  let pythonPath;
  try {
    pythonPath = getKiCadPythonOrThrow();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const scriptPath = path.join(__dirname, 'check_zone_fills.py');
  const args = [pythonPath, scriptPath, ...pcbFiles].map(arg => `"${arg}"`).join(' ');

  let output;
  try {
    output = execSync(args, { encoding: 'utf8', stdio: 'pipe' });
  } catch (err) {
    console.error(`Error: zone fill check failed: ${err.message}`);
    if (err.stderr) {
      console.error(err.stderr);
    }
    process.exit(1);
  }

  const stale = [];
  for (const [pcbPath, count] of Object.entries(JSON.parse(output))) {
    if (count !== 0) {
      stale.push(`${pcbPath}: ${count < 0 ? 'unreadable' : `${count} zone(s)`}`);
    }
  }

  if (stale.length > 0) {
    console.error('Error: zone fills do not match the current DRC rules:');
    stale.forEach(entry => console.error(`  ${entry}`));
    console.error('Open the board in KiCad and refill its zones (Edit > Fill All Zones),');
    console.error('or delete the directory and re-run make gen to regenerate it.');
    process.exit(1);
  }

  console.log(`✓ Zone fills current on ${pcbFiles.length} boards`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
