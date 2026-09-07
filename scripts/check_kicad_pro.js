#!/usr/bin/env node
/**
 * Compare the parts of each .kicad_pro that scripts/kicad_config.yaml owns against
 * a snapshot taken before setup_kicad_project.js was re-run.
 *
 * A byte diff would be wrong here: KiCad rewrites the whole file whenever someone
 * opens the board, adding and reordering fields the build does not manage. Only the
 * subtrees the config drives are compared.
 */

const fs = require('fs');
const path = require('path');

const OWNED_PATHS = [
  ['net_settings', 'classes'],
  ['net_settings', 'netclass_patterns'],
  ['board', 'design_settings', 'rules'],
  ['board', 'design_settings', 'defaults']
];

function at(object, keys) {
  return keys.reduce((value, key) => (value === undefined ? undefined : value[key]), object);
}

function main() {
  const snapshotDir = process.argv[2];

  if (!snapshotDir) {
    console.error('Usage: check_kicad_pro.js <snapshot-dir>');
    process.exit(1);
  }

  const drifted = [];

  // The union of both sides, so a board whose .kicad_pro was never written and one
  // added since the snapshot are reported rather than skipped
  const boards = new Set([
    ...fs.readdirSync(snapshotDir),
    ...fs.readdirSync('pcbs', { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
  ]);

  for (const board of [...boards].sort()) {
    const name = `${board}.kicad_pro`;
    const snapshotPath = path.join(snapshotDir, board, name);
    const currentPath = path.join('pcbs', board, name);
    const hasSnapshot = fs.existsSync(snapshotPath);
    const hasCurrent = fs.existsSync(currentPath);

    if (!hasSnapshot || !hasCurrent) {
      drifted.push(`${currentPath}: ${hasCurrent ? 'not in the snapshot' : 'missing'}`);
      continue;
    }

    const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf-8'));
    const current = JSON.parse(fs.readFileSync(currentPath, 'utf-8'));

    for (const keys of OWNED_PATHS) {
      if (JSON.stringify(at(snapshot, keys)) !== JSON.stringify(at(current, keys))) {
        drifted.push(`${currentPath}: ${keys.join('.')}`);
      }
    }
  }

  if (drifted.length > 0) {
    console.error('Error: .kicad_pro files no longer match scripts/kicad_config.yaml:');
    drifted.forEach(entry => console.error(`  ${entry}`));
    process.exit(1);
  }
}

main();
