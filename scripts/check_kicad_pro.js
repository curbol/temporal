#!/usr/bin/env node
/**
 * Compare the parts of each .kicad_pro that scripts/kicad_config.yaml owns against
 * a snapshot taken before setup_kicad_project.js was re-run.
 *
 * A byte diff would be wrong here: KiCad rewrites the whole file whenever someone
 * opens the board, adding and reordering fields the build does not manage. Only the
 * three subtrees the config drives are compared.
 */

const fs = require('fs');
const path = require('path');

const OWNED_PATHS = [
  ['net_settings', 'classes'],
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

  for (const board of fs.readdirSync(snapshotDir)) {
    const name = `${board}.kicad_pro`;
    const snapshotPath = path.join(snapshotDir, board, name);
    const currentPath = path.join('pcbs', board, name);

    if (!fs.existsSync(snapshotPath) || !fs.existsSync(currentPath)) {
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
    console.error('Error: .kicad_pro settings no longer match scripts/kicad_config.yaml:');
    drifted.forEach(entry => console.error(`  ${entry}`));
    process.exit(1);
  }
}

main();
