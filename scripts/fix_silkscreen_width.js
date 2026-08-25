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
 *
 * Graphics are matched as balanced s-expressions rather than per line, because
 * scripts/convert_svg_to_footprint.js emits fp_poly blocks whose layer and width
 * sit on later lines than the opening token. KiCad has no minimum-stroke DRC rule,
 * so a pass that quietly matched nothing would ship sub-minimum silkscreen; the
 * counts below are asserted for that reason.
 */

const fs = require('fs');
const { ergogenOutputPcbs, unit } = require('./ergogen_config');

const SILKSCREEN_LAYERS = ['F.SilkS', 'B.SilkS'];
const GRAPHIC_START = /\((?:fp|gr)_(?:line|arc|circle|rect|poly)\s/g;

/**
 * The balanced s-expression beginning at startIndex, or null if it never closes.
 */
function extractBlock(content, startIndex) {
  let depth = 0;

  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '(') {
      depth++;
    } else if (content[i] === ')') {
      depth--;

      if (depth === 0) {
        return content.slice(startIndex, i + 1);
      }
    }
  }

  return null;
}

function isSilkscreen(block) {
  return SILKSCREEN_LAYERS.some(layer => block.includes(`(layer "${layer}")`));
}

/**
 * A stroke of 0 marks a filled polygon with no outline, so it is left alone.
 */
function widenBlock(block, minWidth, onWiden) {
  return block.replace(/\(width ([\d.]+)\)/g, (stroke, width) => {
    const value = parseFloat(width);

    if (value === 0 || value >= minWidth) {
      return stroke;
    }

    onWiden();

    return `(width ${minWidth})`;
  });
}

/**
 * Widen every silkscreen stroke below the minimum. Returns the rewritten content,
 * how many strokes were widened, and how many silkscreen graphics were seen.
 */
function widenStrokes(content, minWidth) {
  let widened = 0;
  let graphics = 0;
  let result = '';
  let cursor = 0;

  GRAPHIC_START.lastIndex = 0;

  let match;
  while ((match = GRAPHIC_START.exec(content)) !== null) {
    if (match.index < cursor) {
      continue;
    }

    const block = extractBlock(content, match.index);

    if (block === null || !isSilkscreen(block)) {
      continue;
    }

    graphics++;
    result += content.slice(cursor, match.index);
    result += widenBlock(block, minWidth, () => widened++);
    cursor = match.index + block.length;
    GRAPHIC_START.lastIndex = cursor;
  }

  result += content.slice(cursor);

  return { content: result, widened, graphics };
}

/**
 * Any silkscreen stroke still below the minimum, found without reusing the block
 * parser above. If that parser stops matching, checking its own output would
 * report success, so this backstop reads the single-line form directly. Ergogen
 * writes almost every graphic that way, so it sees nearly all of the volume.
 */
function residualStrokes(content, minWidth) {
  const residual = [];

  for (const line of content.split('\n')) {
    if (!SILKSCREEN_LAYERS.some(layer => line.includes(`(layer "${layer}")`))) {
      continue;
    }

    for (const [, width] of line.matchAll(/\(width ([\d.]+)\)/g)) {
      const value = parseFloat(width);

      if (value !== 0 && value < minWidth) {
        residual.push(width);
      }
    }
  }

  return residual;
}

function main() {
  const minWidth = unit('silk_line_width');
  const pcbFiles = ergogenOutputPcbs();

  let total = 0;
  let totalGraphics = 0;

  for (const pcbFile of pcbFiles) {
    const original = fs.readFileSync(pcbFile, 'utf-8');
    const { content, widened, graphics } = widenStrokes(original, minWidth);

    totalGraphics += graphics;

    if (widened > 0) {
      fs.writeFileSync(pcbFile, content, 'utf-8');
      total += widened;
    }

    const residual = residualStrokes(content, minWidth);

    if (residual.length > 0) {
      console.error(`Error: ${pcbFile} still has ${residual.length} silkscreen stroke(s) below ${minWidth}mm: ${[...new Set(residual)].join(', ')}`);
      process.exit(1);
    }
  }

  if (totalGraphics === 0) {
    console.error(`Error: no silkscreen graphic matched across ${pcbFiles.length} PCB files`);
    console.error('The KiCad s-expression layout no longer matches this pass.');
    process.exit(1);
  }

  console.log(`✓ Widened ${total} of ${totalGraphics} silkscreen graphics to ${minWidth}mm in ${pcbFiles.length} PCB files`);
}

main();
