#!/usr/bin/env node
/**
 * Convert JSCAD files to STL with higher arc resolution
 *
 * The default JSCAD arc resolution can produce visible facets on large arcs.
 * This script adds segment counts to arc commands before conversion.
 *
 * Files ending in _mirrored are converted to a temp STL, then mirrored
 * using OpenSCAD to produce the final mirrored STL.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const { glob } = require('glob');

const execAsync = promisify(exec);

// Arc resolution scaling: 10 segments per mm of radius
function getArcSegments(radius) {
  return Math.ceil(radius * 10);
}

const MIRROR_SCAD = path.join(__dirname, '..', 'ergogen', 'mirror_case.scad');

async function main() {
  const casesDir = path.join(__dirname, '..', 'cases');
  const jscadDir = path.join(__dirname, '..', 'ergogen', 'output', 'cases');

  // Ensure output directory exists
  if (!fs.existsSync(casesDir)) {
    fs.mkdirSync(casesDir, { recursive: true });
  }

  // Find all JSCAD files
  const jscadFiles = await glob('*.jscad', { cwd: jscadDir });

  // Build set of base names that have mirrored versions
  const hasMirroredVersion = new Set();
  for (const file of jscadFiles) {
    const baseName = file.replace('.jscad', '');
    if (baseName.endsWith('_mirrored')) {
      hasMirroredVersion.add(baseName.replace(/_mirrored$/, ''));
    }
  }

  if (jscadFiles.length === 0) {
    console.log('No JSCAD files found in', jscadDir);
    return;
  }

  // Convert files in parallel
  const conversions = jscadFiles.map(async (file) => {
    const inputPath = path.join(jscadDir, file);
    const baseName = file.replace('.jscad', '');
    const isMirrored = baseName.endsWith('_mirrored');
    const baseWithoutMirrored = baseName.replace(/_mirrored$/, '');
    const isPairedPart = hasMirroredVersion.has(baseWithoutMirrored);

    // Naming rules:
    // - foo_mirrored → foo_right (mirrored half of a pair)
    // - foo (with _mirrored pair) → foo_left (non-mirrored half of a pair)
    // - foo (no _mirrored pair) → foo (universal part, no suffix)
    const outputBaseName = isMirrored
      ? baseWithoutMirrored + '_right'
      : isPairedPart
        ? baseName + '_left'
        : baseName;
    const outputName = outputBaseName + '.stl';
    const outputPath = path.join(casesDir, outputName);

    // Read original JSCAD content
    let content = fs.readFileSync(inputPath, 'utf8');

    content = content.replace(
      /\.appendArc\(\[([^\]]+)\],\{"radius":([^,]+),"clockwise":(true|false),"large":(true|false)\}\)/g,
      (match, endpoint, radius, clockwise, large) => {
        const segments = getArcSegments(parseFloat(radius));
        return `.appendArc([${endpoint}],{"radius":${radius},"clockwise":${clockwise},"large":${large},"resolution":${segments}})`;
      }
    );

    // Create patched file
    const patchedPath = inputPath.replace('.jscad', '_hires.jscad');
    fs.writeFileSync(patchedPath, content);

    try {
      if (isMirrored) {
        // Convert to temp STL, then mirror
        const tempPath = path.join(casesDir, baseName + '_temp.stl');
        await execAsync(`npx @jscad/cli "${patchedPath}" -of stla -o "${tempPath}"`);
        await execAsync(`openscad -o "${outputPath}" -D "input=\\"${tempPath}\\"" "${MIRROR_SCAD}"`);
        fs.unlinkSync(tempPath);
        console.log(`✓ Converted and mirrored ${file} -> ${outputName}`);
      } else {
        // Convert directly to STL
        await execAsync(`npx @jscad/cli "${patchedPath}" -of stla -o "${outputPath}"`);
        console.log(`✓ Converted ${file} -> ${outputName}`);
      }
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    } finally {
      // Clean up patched file
      fs.unlinkSync(patchedPath);
    }
  });

  await Promise.all(conversions);
}

main().catch(console.error);
