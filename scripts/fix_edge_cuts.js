#!/usr/bin/env node
/**
 * Remove tiny Edge.Cuts segments from KiCad PCB files.
 *
 * Ergogen sometimes generates very small segments on Edge.Cuts layer (usually at curves)
 * that are essentially zero-length and cause DRC "malformed outline" errors.
 * This script removes segments shorter than a specified threshold.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Minimum segment length in mm - segments shorter than this will be removed
const MIN_SEGMENT_LENGTH = 0.01; // 10 microns

/**
 * Calculate Euclidean distance between two points.
 */
function calculateLineLength(startX, startY, endX, endY) {
  return Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
}

/**
 * Calculate approximate arc length using chord length as lower bound.
 * For our purposes (detecting degenerate arcs), this is sufficient.
 */
function calculateArcLength(startX, startY, midX, midY, endX, endY) {
  // Use chord length as approximation (actual arc is slightly longer)
  return calculateLineLength(startX, startY, endX, endY);
}

/**
 * Process a KiCad PCB file and remove tiny Edge.Cuts segments.
 */
function processPcbFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Regular expressions for Edge.Cuts gr_line and gr_arc
  const linePattern = /\(gr_line\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\).*?\)\s*\n/gs;
  const arcPattern = /\(gr_arc\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(mid\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\).*?\)\s*\n/gs;

  let removedLines = 0;
  let removedArcs = 0;

  // Find and remove tiny gr_line segments
  const lineMatches = [...content.matchAll(linePattern)];
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

  // Find and remove tiny gr_arc segments
  const arcMatches = [...content.matchAll(arcPattern)];
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

  // Write back
  if (removedLines > 0 || removedArcs > 0) {
    fs.writeFileSync(filepath, content, 'utf-8');
  }

  return removedLines + removedArcs;
}

/**
 * Main entry point.
 */
async function main() {
  const outputDir = 'ergogen/output/pcbs';

  if (!fs.existsSync(outputDir)) {
    console.error(`Error: ${outputDir} does not exist`);
    console.error("Run 'npm run gen' first to generate PCB files");
    process.exit(1);
  }

  const pcbFiles = await glob(`${outputDir}/*.kicad_pcb`);

  if (pcbFiles.length === 0) {
    console.error(`No .kicad_pcb files found in ${outputDir}`);
    process.exit(1);
  }

  let totalRemoved = 0;
  for (const pcbFile of pcbFiles) {
    const removed = processPcbFile(pcbFile);
    totalRemoved += removed;
  }

  if (totalRemoved > 0) {
    console.log(`✓ Removed ${totalRemoved} tiny edge cut segments from ${pcbFiles.length} PCB files`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
