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

// Higher resolution for smoother arcs
// Segments per full circle - higher = smoother but larger files
const ARC_SEGMENTS = 128;

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

  if (jscadFiles.length === 0) {
    console.log('No JSCAD files found in', jscadDir);
    return;
  }

  // Convert files in parallel
  const conversions = jscadFiles.map(async (file) => {
    const inputPath = path.join(jscadDir, file);
    const baseName = file.replace('.jscad', '');
    const isMirrored = baseName.endsWith('_mirrored');
    const outputName = baseName + '.stl';
    const outputPath = path.join(casesDir, outputName);

    // Read original JSCAD content
    let content = fs.readFileSync(inputPath, 'utf8');

    content = content.replace(
      /\.appendArc\(\[([^\]]+)\],\{"radius":([^,]+),"clockwise":(true|false),"large":(true|false)\}\)/g,
      `.appendArc([$1],{"radius":$2,"clockwise":$3,"large":$4,"resolution":${ARC_SEGMENTS}})`
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
