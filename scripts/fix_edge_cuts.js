#!/usr/bin/env node
/**
 * Remove tiny Edge.Cuts segments from the generated boards.
 *
 * Ergogen emits near-zero-length segments on Edge.Cuts, usually at curves, and
 * KiCad reports them as a malformed outline. Anything shorter than
 * MIN_SEGMENT_LENGTH is dropped.
 */

const fs = require('fs');
const { ergogenOutputPcbs } = require('./ergogen_config');

const MIN_SEGMENT_LENGTH = 0.01; // mm

function calculateLineLength(startX, startY, endX, endY) {
  return Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
}

/**
 * The chord between the endpoints, not the true arc length. An arc that sweeps
 * most of a circle therefore measures near zero and would be dropped.
 */
function calculateArcLength(startX, startY, midX, midY, endX, endY) {
  return calculateLineLength(startX, startY, endX, endY);
}

function processPcbFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');

  const linePattern = /\(gr_line\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\).*?\)\s*\n/gs;
  const arcPattern = /\(gr_arc\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(mid\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\).*?\)\s*\n/gs;

  let removedLines = 0;
  let removedArcs = 0;
  let seen = 0;

  const lineMatches = [...content.matchAll(linePattern)];
  seen += lineMatches.length;
  for (const match of lineMatches) {
    const startX = parseFloat(match[1]);
    const startY = parseFloat(match[2]);
    const endX = parseFloat(match[3]);
    const endY = parseFloat(match[4]);

    const length = calculateLineLength(startX, startY, endX, endY);

    if (length < MIN_SEGMENT_LENGTH) {
      content = content.replace(match[0], '');
      removedLines++;
    }
  }

  const arcMatches = [...content.matchAll(arcPattern)];
  seen += arcMatches.length;

  for (const match of arcMatches) {
    const startX = parseFloat(match[1]);
    const startY = parseFloat(match[2]);
    const midX = parseFloat(match[3]);
    const midY = parseFloat(match[4]);
    const endX = parseFloat(match[5]);
    const endY = parseFloat(match[6]);

    const length = calculateArcLength(startX, startY, midX, midY, endX, endY);

    if (length < MIN_SEGMENT_LENGTH) {
      content = content.replace(match[0], '');
      removedArcs++;
    }
  }

  if (removedLines > 0 || removedArcs > 0) {
    fs.writeFileSync(filepath, content, 'utf-8');
  }

  return { removed: removedLines + removedArcs, seen };
}

function main() {
  const pcbFiles = ergogenOutputPcbs();

  let totalRemoved = 0;
  let totalSeen = 0;
  for (const pcbFile of pcbFiles) {
    const { removed, seen } = processPcbFile(pcbFile);
    totalRemoved += removed;
    totalSeen += seen;
  }

  // Every board carries an Edge.Cuts outline, and KiCad has no DRC rule that would
  // name this pass as the cause of a malformed one. Counting what the patterns
  // matched rather than what they removed keeps a re-run on already-cleaned boards
  // quiet while still catching patterns that no longer fit what Ergogen writes.
  if (totalSeen === 0) {
    console.error(`Error: no Edge.Cuts graphic matched across ${pcbFiles.length} PCB files`);
    console.error('The KiCad s-expression layout no longer matches this pass.');
    process.exit(1);
  }

  console.log(`✓ Removed ${totalRemoved} of ${totalSeen} edge cut segments in ${pcbFiles.length} PCB files`);
}

main();
