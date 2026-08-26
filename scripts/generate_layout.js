#!/usr/bin/env node
/**
 * Generate temporal.json for ZMK Studio from ergogen points
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');
const os = require('os');
const { unit } = require('./ergogen_config');

const ERGOGEN_DIR = path.join(__dirname, '..', 'ergogen');
const ZMK_OUTPUT_FILE = path.join(__dirname, '..', 'temporal.json');

// mm per key unit. One scale for both axes keeps the layout physically
// proportional; ZMK renders key units as squares.
const KX = unit('$default_width');

const ENCODER_KEY = 'thumb_enc';

function generateLayout() {
  // Ergogen writes points.yaml only under --debug, so build into a throwaway
  // directory rather than disturbing ergogen/output.
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ergogen-'));
  let points;

  try {
    execSync(`npx ergogen ${ERGOGEN_DIR} -o ${tmpDir} --debug`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });

    const pointsFile = path.join(tmpDir, 'points', 'points.yaml');
    if (!fs.existsSync(pointsFile)) {
      throw new Error('points.yaml not generated');
    }

    const pointsYaml = fs.readFileSync(pointsFile, 'utf8');
    points = yaml.load(pointsYaml);
  } catch (error) {
    console.error('Error running ergogen:', error.message);
    process.exit(1);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  const keys = [];
  for (const [name, data] of Object.entries(points)) {
    const key = {
      name,
      x: Math.round(data.x * 1000) / 1000,
      y: Math.round(data.y * 1000) / 1000,
      r: Math.round(data.r * 1000) / 1000,
      columnNet: data.meta?.col?.key?.column_net || null,
      row: data.meta?.row || null,
    };

    if (name === ENCODER_KEY) {
      key.type = 'encoder';
    }

    keys.push(key);
  }

  generateZmkLayout(keys);
}

/**
 * Fail loudly when a column net or row name in ergogen/config.yaml has no entry
 * in the matrix maps below. Without this the key is simply absent from
 * temporal.json and nothing in the build reports it.
 */
function assertNamesResolve(keys, rowMap, colMapLeft) {
  const unmapped = [];

  for (const key of keys) {
    if (rowMap[key.row] === undefined) {
      unmapped.push(`row "${key.row}" (key ${key.name})`);
    }
    if (colMapLeft[key.columnNet] === undefined) {
      unmapped.push(`column_net "${key.columnNet}" (key ${key.name})`);
    }
  }

  if (unmapped.length > 0) {
    console.error('Error: ergogen/config.yaml names that scripts/generate_layout.js does not map:');
    [...new Set(unmapped)].forEach(name => console.error(`  ${name}`));
    process.exit(1);
  }
}

/**
 * Write temporal.json, deriving the right half by mirroring the left.
 */
function generateZmkLayout(keys) {
  const rowMap = { top: 0, home: 1, bottom: 2, thumb: 3 };

  // Matrix column follows the column net a key is wired to, which is what the
  // firmware scans. Thumb keys share their nets with finger columns, so reading
  // the net rather than the column name keeps the two in step by construction.
  // Left side: cols 0-5, right side mirrors to 6-11.
  const colMapLeft = {
    col_extra: 0,
    col_pinky: 1,
    col_ring: 2,
    col_middle: 3,
    col_index: 4,
    col_inner: 5
  };
  const mirrorCol = col => Object.keys(colMapLeft).length * 2 - 1 - col;

  assertNamesResolve(keys, rowMap, colMapLeft);

  let minX = Infinity, maxY = -Infinity;
  for (const key of keys) {
    minX = Math.min(minX, key.x);
    maxY = Math.max(maxY, key.y); // Ergogen Y grows upward; the topmost key has the largest Y
  }

  const layoutKeys = [];

  for (const key of keys) {
    const row = rowMap[key.row];
    const col = colMapLeft[key.columnNet];

    const x = (key.x - minX) / KX;
    const y = (maxY - key.y) / KX; // Flip Y so positive is down, normalize to 0
    const r = -key.r; // Ergogen uses opposite rotation direction

    const entry = {
      row,
      col,
      x: Math.round(x * 1000) / 1000,
      y: Math.round(y * 1000) / 1000,
    };

    if (r !== 0) {
      entry.r = r;
      entry.rx = Math.round((x + 0.5) * 1000) / 1000;
      entry.ry = Math.round((y + 0.5) * 1000) / 1000;
    }

    layoutKeys.push(entry);
  }

  const maxX = Math.max(...layoutKeys.map(k => k.x));
  const mirrorX = maxX + 2.02; // Left edge of the right half, one key unit past the gap

  const rightKeys = layoutKeys.map(key => {
    const mirrored = {
      row: key.row,
      col: mirrorCol(key.col),
      x: Math.round((mirrorX + (maxX - key.x)) * 1000) / 1000,
      y: key.y,
    };

    if (key.r !== undefined) {
      mirrored.r = -key.r;
      mirrored.rx = Math.round((mirrorX + (maxX - (key.rx - 0.5)) + 0.5) * 1000) / 1000;
      mirrored.ry = key.ry;
    }

    return mirrored;
  });

  const allKeys = [...layoutKeys, ...rightKeys];
  allKeys.sort((a, b) => {
    if (a.row !== b.row) return a.row - b.row;
    return a.col - b.col;
  });

  const encoder = keys.find(key => key.name === ENCODER_KEY);
  const encoderRow = rowMap[encoder.row];
  const encoderCol = colMapLeft[encoder.columnNet];

  const zmkLayout = {
    id: 'temporal',
    name: 'Temporal',
    layouts: {
      LAYOUT: {
        layout: allKeys
      }
    },
    sensors: [
      { row: encoderRow, col: encoderCol, name: 'encoder_left' },
      { row: encoderRow, col: mirrorCol(encoderCol), name: 'encoder_right' }
    ]
  };

  fs.writeFileSync(ZMK_OUTPUT_FILE, JSON.stringify(zmkLayout, null, 2) + '\n');
  console.log(`✓ Generated temporal.json with ${allKeys.length} keys (${layoutKeys.length} per side)`);
}

generateLayout();
