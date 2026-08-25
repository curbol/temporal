#!/usr/bin/env node
/**
 * Raise thin silkscreen strokes to the fab's minimum line width.
 *
 * The vendored footprints draw their outlines and polarity marks at 0.1mm to
 * 0.15mm, below JLCPCB's 0.153mm minimum, which prints faint and is flagged at
 * upload. Widening them here rather than in each footprint keeps the value in one
 * place and covers any footprint added later.
 *
 * Only silkscreen is touched: copper, courtyard, fabrication and edge layers keep
 * the widths their footprints chose.
 */

const fs = require('fs');
const { ergogenOutputPcbs, unit } = require('./ergogen_config');

const SILKSCREEN_LAYERS = ['F.SilkS', 'B.SilkS'];

/**
 * Widen every silkscreen stroke below the minimum. Returns the number widened.
 */
function widenStrokes(content, minWidth) {
  let widened = 0;

  const updated = content.replace(
    /\((?:fp|gr)_(?:line|arc|circle|rect|poly)\b[^\n]*/g,
    element => {
      if (!SILKSCREEN_LAYERS.some(layer => element.includes(`"${layer}"`))) {
        return element;
      }

      return element.replace(/\(width ([\d.]+)\)/g, (stroke, width) => {
        if (parseFloat(width) >= minWidth) {
          return stroke;
        }
        widened++;
        return `(width ${minWidth})`;
      });
    }
  );

  return { content: updated, widened };
}

function main() {
  const minWidth = unit('silk_line_width');
  const pcbFiles = ergogenOutputPcbs();

  let total = 0;
  for (const pcbFile of pcbFiles) {
    const original = fs.readFileSync(pcbFile, 'utf-8');
    const { content, widened } = widenStrokes(original, minWidth);

    if (widened > 0) {
      fs.writeFileSync(pcbFile, content, 'utf-8');
      total += widened;
    }
  }

  if (total > 0) {
    console.log(`✓ Widened ${total} silkscreen strokes to ${minWidth}mm in ${pcbFiles.length} PCB files`);
  }
}

main();
