/**
 * The silkscreen layer names and the single test for whether a block sits on them.
 *
 * Three spellings reach these passes: pcbnew writes `(layer "F.SilkS")`, Ergogen
 * writes `(layer "F.SilkS" )`, and ceoloide/utility_text writes
 * `(layer "F.SilkS" knockout)` when knockout is set. A reader that accepts only
 * one of them silently skips the others, so the test lives here rather than in
 * each pass.
 */

const SILKSCREEN_LAYERS = ['F.SilkS', 'B.SilkS'];

const LAYER_ALTERNATION = SILKSCREEN_LAYERS.map(layer => layer.replace('.', '\\.')).join('|');
const SILKSCREEN_LAYER_SOURCE = `\\(layer\\s+"?(?:${LAYER_ALTERNATION})"?[^)]*\\)`;

function hasSilkscreenLayer(block) {
  return new RegExp(SILKSCREEN_LAYER_SOURCE).test(block);
}

module.exports = { SILKSCREEN_LAYERS, SILKSCREEN_LAYER_SOURCE, hasSilkscreenLayer };
