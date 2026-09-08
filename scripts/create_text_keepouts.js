#!/usr/bin/env node

/**
 * Create rule areas around silkscreen text so the copper pour stops at the
 * glyph outlines and the lettering stays legible.
 */

const path = require('path');
const { execSync } = require('child_process');
const { ergogenOutputPcbs } = require('./ergogen_config');
const { getKiCadPythonOrThrow } = require('./kicad_python');
const { loadKicadConfig } = require('./kicad_config');

const keepoutConfig = loadKicadConfig().text_keepouts;
const GAP_MM = keepoutConfig.gap_mm;
const LAYERS_TO_PROCESS = ['F.SilkS', 'B.SilkS'];
const TEXT_PATTERNS = keepoutConfig.patterns;

function main() {
  const pcbFiles = ergogenOutputPcbs();

  const pythonPath = getKiCadPythonOrThrow();
  const scriptPath = path.join(__dirname, 'create_text_keepouts.py');

  let output;
  try {
    // Process all PCBs in a single Python invocation to avoid wx.App issues
    const args = [
      `"${pythonPath}"`,
      `"${scriptPath}"`,
      GAP_MM,
      `"${LAYERS_TO_PROCESS.join(',')}"`,
      `"${TEXT_PATTERNS.join('|')}"`,
      ...pcbFiles.map(f => `"${f}"`)
    ].join(' ');

    output = execSync(args, { encoding: 'utf8', stdio: 'pipe' });
  } catch (err) {
    console.error('Error: text keepout pass failed:', err.message);
    if (err.stderr) {
      console.error(err.stderr);
    }
    process.exit(1);
  }

  const results = JSON.parse(output);

  let totalKeepouts = 0;
  let failed = 0;
  const keepoutCounts = [];

  for (const [pcbPath, result] of Object.entries(results)) {
    const board = path.basename(pcbPath, '.kicad_pcb');

    if (result.matched < 0 || result.groups < 0) {
      console.error(`Error: could not process ${board}`);
      failed++;
      continue;
    }

    // A board with no matching text legitimately gets no keepouts, but a text the
    // config named and did not get one would be buried by the pour with nothing
    // downstream to notice.
    if (result.groups < result.matched) {
      console.error(`Error: ${board} matched ${result.matched} text(s) but created ${result.groups} keepout(s)`);
      failed++;
      continue;
    }

    if (result.groups > 0) {
      totalKeepouts += result.groups;
      keepoutCounts.push(`${board}: ${result.groups}`);
    }
  }

  // The text lives in ergogen/config.yaml and the pattern in kicad_config.yaml, with
  // nothing tying the two together. A pattern that stopped matching takes its
  // board's `matched` count down with it, so the per-board check above stays quiet
  // while the pour fills over the lettering it was meant to protect.
  const patternHits = Object.fromEntries(TEXT_PATTERNS.map(pattern => [pattern, 0]));

  for (const result of Object.values(results)) {
    for (const [pattern, count] of Object.entries(result.patterns ?? {})) {
      patternHits[pattern] = (patternHits[pattern] ?? 0) + count;
    }
  }

  const unmatched = TEXT_PATTERNS.filter(pattern => patternHits[pattern] === 0);

  if (totalKeepouts > 0) {
    console.log(`✓ Created ${totalKeepouts} text keepout(s) [${keepoutCounts.join(', ')}]`);
  }

  if (failed > 0) {
    console.error(`Error: ${failed} PCB file(s) failed text keepout processing`);
    process.exit(1);
  }

  if (unmatched.length > 0) {
    console.error(`Error: text_keepouts patterns matched no text on any board: ${unmatched.join(', ')}`);
    console.error('Check text_keepouts.patterns in scripts/kicad_config.yaml against the text in ergogen/config.yaml.');
    process.exit(1);
  }
}

main();
