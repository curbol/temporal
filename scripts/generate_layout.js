#!/usr/bin/env node
/**
 * Generate temporal.json for ZMK Studio from ergogen points
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');
const os = require('os');

const ERGOGEN_DIR = path.join(__dirname, '..', 'ergogen');
const ZMK_OUTPUT_FILE = path.join(__dirname, '..', 'temporal.json');

// Units from ergogen config (choc spacing)
const KX = 18; // mm per key unit in x
const KY = 17; // mm per key unit in y

// Keys to exclude (encoder is a special case)
const ENCODER_KEY = 'thumb_enc';

function generateLayout() {
  // Run ergogen with --debug in a temp directory to get points data
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ergogen-'));
  let points;

  try {
    // Run ergogen with debug in temp dir
    execSync(`npx ergogen ${ERGOGEN_DIR} -o ${tmpDir} --debug`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe' // Suppress output
    });

    // Read points.yaml from temp output
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
    // Clean up temp directory
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  // Extract key info
  const keys = [];
  for (const [name, data] of Object.entries(points)) {
    const key = {
      name,
      x: Math.round(data.x * 1000) / 1000,
      y: Math.round(data.y * 1000) / 1000,
      r: Math.round(data.r * 1000) / 1000,
      w: data.meta?.width || 18,
      h: data.meta?.height || 17,
      column: data.meta?.col?.name || null,
      row: data.meta?.row || null,
      zone: data.meta?.zone?.name || null,
      column_net: data.meta?.column_net || null,
      row_net: data.meta?.row_net || null,
    };

    // Mark encoder specially
    if (name === ENCODER_KEY) {
      key.type = 'encoder';
    }

    keys.push(key);
  }

  // Sort keys by zone, then column, then row for consistent ordering
  const rowOrder = { top: 0, home: 1, bottom: 2, thumb: 3 };
  const zoneOrder = { finger: 0, thumb: 1, encoder: 2 };
  const colOrder = { extra: 0, pinky: 1, ring: 2, middle: 3, index: 4, inner: 5, encoder: 0, near: 1, mid: 2, far: 3 };

  keys.sort((a, b) => {
    // Fingers before thumbs before encoders
    if (a.zone !== b.zone) {
      return (zoneOrder[a.zone] ?? 99) - (zoneOrder[b.zone] ?? 99);
    }
    // Then by column
    const colA = colOrder[a.column] ?? 99;
    const colB = colOrder[b.column] ?? 99;
    if (colA !== colB) return colA - colB;
    // Then by row
    const rowA = rowOrder[a.row] ?? 99;
    const rowB = rowOrder[b.row] ?? 99;
    return rowA - rowB;
  });

  // Generate ZMK temporal.json
  generateZmkLayout(keys);
}

/**
 * Generate ZMK Studio compatible temporal.json
 * This includes both halves of the split keyboard
 */
function generateZmkLayout(keys) {
  // Matrix mapping for ZMK (both halves)
  // Left: cols 0-5, Right: cols 6-11 (mirrored)
  // Rows: 0=top, 1=home, 2=bottom, 3=thumb

  const rowMap = { top: 0, home: 1, bottom: 2, thumb: 3 };

  // Column mapping: finger columns to matrix columns
  // Left side: extra=0, pinky=1, ring=2, middle=3, index=4, inner=5
  // Right side: inner=6, index=7, middle=8, ring=9, pinky=10, extra=11
  const colMapLeft = { extra: 0, pinky: 1, ring: 2, middle: 3, index: 4, inner: 5 };
  // Thumb columns use same mapping but on row 3
  // Thumb keys share column nets with finger columns
  // enc=col_ring(2), near=col_middle(3), mid=col_index(4), far=col_inner(5)
  const thumbColMapLeft = { enc: 2, near: 3, mid: 4, far: 5 };
  // Encoder zone has its own column
  const encoderColMapLeft = { encoder: 1 };

  // Find bounds to normalize positions
  let minX = Infinity, maxY = -Infinity;
  for (const key of keys) {
    minX = Math.min(minX, key.x);
    maxY = Math.max(maxY, key.y); // Use max Y since ergogen Y is negative (up is more negative)
  }

  // Convert to key units and normalize
  const layoutKeys = [];

  for (const key of keys) {
    const row = rowMap[key.row];
    let col;

    if (key.zone === 'thumb') {
      col = thumbColMapLeft[key.column];
    } else if (key.zone === 'encoder') {
      col = encoderColMapLeft[key.column];
    } else {
      col = colMapLeft[key.column];
    }

    if (row === undefined || col === undefined) continue;

    // Convert mm to key units (using KX as base unit for both axes)
    // Ergogen: Y is negative going up, we want Y positive going down
    const x = (key.x - minX) / KX;
    const y = (maxY - key.y) / KX; // Flip Y so positive is down, normalize to 0
    const r = -key.r; // Ergogen uses opposite rotation direction

    const entry = {
      row,
      col,
      x: Math.round(x * 1000) / 1000,
      y: Math.round(y * 1000) / 1000,
    };

    // Add rotation if non-zero
    if (r !== 0) {
      entry.r = r;
      entry.rx = Math.round((x + 0.5) * 1000) / 1000;
      entry.ry = Math.round((y + 0.5) * 1000) / 1000;
    }

    layoutKeys.push(entry);
  }

  // Find the width of the left half for mirroring
  const maxX = Math.max(...layoutKeys.map(k => k.x));
  const mirrorX = maxX + 2.02; // Gap between halves (~2 key units)

  // Create right half (mirrored)
  const rightKeys = layoutKeys.map(key => {
    const mirrored = {
      row: key.row,
      col: 11 - key.col, // Mirror column: 0->11, 1->10, etc.
      x: Math.round((mirrorX + (maxX - key.x)) * 1000) / 1000,
      y: key.y,
    };

    if (key.r !== undefined) {
      mirrored.r = -key.r; // Flip rotation
      mirrored.rx = Math.round((mirrorX + (maxX - (key.rx - 0.5)) + 0.5) * 1000) / 1000;
      mirrored.ry = key.ry;
    }

    return mirrored;
  });

  // Combine and sort by row, then col
  const allKeys = [...layoutKeys, ...rightKeys];
  allKeys.sort((a, b) => {
    if (a.row !== b.row) return a.row - b.row;
    return a.col - b.col;
  });

  // Find encoder positions for sensors array
  const encoderLeft = layoutKeys.find(k =>
    keys.find(key => key.name === ENCODER_KEY &&
      k.row === rowMap[key.row] &&
      k.col === (key.zone === 'thumb' ? thumbColMapLeft[key.column] : colMapLeft[key.column])
    )
  );
  const encoderRight = rightKeys.find(k => k.row === 3 && k.col === 10);

  const zmkLayout = {
    id: 'temporal',
    name: 'Temporal',
    layouts: {
      LAYOUT: {
        layout: allKeys
      }
    },
    sensors: [
      { row: 3, col: 2, name: 'encoder_left' },
      { row: 3, col: 9, name: 'encoder_right' }
    ]
  };

  fs.writeFileSync(ZMK_OUTPUT_FILE, JSON.stringify(zmkLayout, null, 2) + '\n');
  console.log(`✓ Generated temporal.json with ${allKeys.length} keys (${layoutKeys.length} per side)`);
}

generateLayout();
