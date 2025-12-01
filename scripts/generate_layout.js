#!/usr/bin/env node
/**
 * Generate layout.json from ergogen points.yaml
 * This creates a clean layout file for keymap editors and documentation
 * Also generates temporal.json for ZMK Studio
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ERGOGEN_OUTPUT = path.join(__dirname, '..', 'ergogen', 'output');
const POINTS_FILE = path.join(ERGOGEN_OUTPUT, 'points', 'points.yaml');
const OUTPUT_FILE = path.join(__dirname, '..', 'ergogen', 'output', 'layout.json');
const ZMK_OUTPUT_FILE = path.join(__dirname, '..', 'ergogen', 'output', 'temporal.json');

// Units from ergogen config (choc spacing)
const KX = 18; // mm per key unit in x
const KY = 17; // mm per key unit in y

// Keys to exclude (encoder is a special case)
const ENCODER_KEY = 'thumb_enc';

function generateLayout() {
    if (!fs.existsSync(POINTS_FILE)) {
        console.error('Error: points.yaml not found. Run ergogen with --debug flag first.');
        process.exit(1);
    }

    const pointsYaml = fs.readFileSync(POINTS_FILE, 'utf8');
    const points = yaml.load(pointsYaml);

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
    const colOrder = { extra: 0, pinky: 1, ring: 2, middle: 3, index: 4, inner: 5, encoder: 0, near: 1, mid: 2, far: 3 };

    keys.sort((a, b) => {
        // Fingers before thumbs
        if (a.zone !== b.zone) {
            return a.zone === 'finger' ? -1 : 1;
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

    // Generate matrix positions (for keymap purposes)
    const matrix = [];
    const colNames = ['col_extra', 'col_pinky', 'col_ring', 'col_middle', 'col_index', 'col_inner'];
    const rowNames = ['row_top', 'row_home', 'row_bottom', 'row_thumb'];

    for (const key of keys) {
        const col = colNames.indexOf(key.column_net);
        const row = rowNames.indexOf(key.row_net);
        if (col >= 0 && row >= 0) {
            key.matrix = { row, col };
        }
    }

    // Create layout variants
    const layout44 = keys.map(k => k.name);
    const layout42 = keys.filter(k => k.name !== 'thumb_extra').map(k => k.name);
    const layout40 = keys.filter(k => !k.name.startsWith('finger_extra')).map(k => k.name);
    const layout38 = keys.filter(k => k.name !== 'thumb_extra' && !k.name.startsWith('finger_extra')).map(k => k.name);

    const layout = {
        name: 'Temporal',
        author: 'Curtis Bollinger',
        url: 'https://github.com/curbol/temporal',
        variants: {
            44: { keys: layout44.length, description: 'Full layout with extra pinky and thumb keys' },
            42: { keys: layout42.length, description: 'Without extra thumb key' },
            40: { keys: layout40.length, description: 'Without extra pinky keys' },
            38: { keys: layout38.length, description: 'Minimal layout' },
        },
        // Physical layout info
        physical: {
            unit: 'mm',
            key_width: 18,
            key_height: 17,
        },
        // Matrix info for firmware
        matrix: {
            rows: rowNames.length,
            cols: colNames.length,
            row_nets: rowNames,
            col_nets: colNames,
        },
        // All keys with positions
        keys,
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(layout, null, 2));
    console.log(`✓ Generated layout.json with ${keys.length} keys`);

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
    const thumbColMapLeft = { encoder: 1, near: 2, mid: 3, far: 4, extra: 5 };

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
            { row: 3, col: 1, name: 'encoder_left' },
            { row: 3, col: 10, name: 'encoder_right' }
        ]
    };

    fs.writeFileSync(ZMK_OUTPUT_FILE, JSON.stringify(zmkLayout, null, 2) + '\n');
    console.log(`✓ Generated temporal.json with ${allKeys.length} keys (${layoutKeys.length} per side)`);
}

generateLayout();
