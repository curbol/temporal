#!/usr/bin/env node
/**
 * Convert JSCAD files to STL with higher arc resolution
 *
 * The default JSCAD arc resolution can produce visible facets on large arcs.
 * This script adds segment counts to arc commands before conversion.
 *
 * Files ending in _m_right are mirrored using OpenSCAD to produce the final
 * _right STL.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const { glob } = require('glob');

const execAsync = promisify(exec);

const arcResolution = 10;

function getArcSegments(radius) {
  return Math.ceil(radius * arcResolution);
}

/**
 * Mirror STL using OpenSCAD
 */
async function mirrorSTL(inputPath, outputPath) {
  // Create a temporary OpenSCAD script that imports and mirrors the STL
  const scadContent = `mirror([1, 0, 0]) import("${inputPath}");`;
  const scadPath = inputPath.replace('.stl', '_mirror.scad');

  fs.writeFileSync(scadPath, scadContent);

  try {
    await execAsync(`openscad -o "${outputPath}" "${scadPath}"`);
  } finally {
    fs.unlinkSync(scadPath);
  }
}

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
    const needsMirroring = baseName.endsWith('_m_right');

    // Naming rules:
    // - foo_m_right → foo_right (needs mirroring after conversion)
    // - foo_left → foo_left (left-hand side, no change needed)
    // - foo → foo (universal part, no change needed)
    const outputBaseName = needsMirroring
      ? baseName.replace(/_m_right$/, '_right')
      : baseName;
    const outputName = outputBaseName + '.stl';
    const outputPath = path.join(casesDir, outputName);

    // Read original JSCAD content
    let content = fs.readFileSync(inputPath, 'utf8');

    // Add resolution to .appendArc() calls
    content = content.replace(
      /\.appendArc\(\[([^\]]+)\],\{"radius":([^,]+),"clockwise":(true|false),"large":(true|false)\}\)/g,
      (match, endpoint, radius, clockwise, large) => {
        const segments = getArcSegments(parseFloat(radius));
        return `.appendArc([${endpoint}],{"radius":${radius},"clockwise":${clockwise},"large":${large},"resolution":${segments}})`;
      }
    );

    // Add resolution to CSG.Path2D.arc() calls (initial arcs that start paths)
    content = content.replace(
      /CSG\.Path2D\.arc\(\{"center":\[([^\]]+)\],"radius":([^,]+),"startangle":([^,]+),"endangle":([^}]+)\}\)/g,
      (match, center, radius, startangle, endangle) => {
        const segments = getArcSegments(parseFloat(radius));
        return `CSG.Path2D.arc({"center":[${center}],"radius":${radius},"startangle":${startangle},"endangle":${endangle},"resolution":${segments}})`;
      }
    );

    // Add resolution to CAG.circle() calls
    content = content.replace(
      /CAG\.circle\(\{"center":\[([^\]]+)\],"radius":([^}]+)\}\)/g,
      (match, center, radius) => {
        const segments = getArcSegments(parseFloat(radius)) * 4; // Full circle needs 4x arc segments
        return `CAG.circle({"center":[${center}],"radius":${radius},"resolution":${segments}})`;
      }
    );

    // Create patched file
    const patchedPath = inputPath.replace('.jscad', '_hires.jscad');
    fs.writeFileSync(patchedPath, content);

    try {
      if (needsMirroring) {
        // Convert to temp STL, then mirror with OpenSCAD
        const tempPath = path.join(casesDir, baseName + '_temp.stl');
        await execAsync(`npx @jscad/cli "${patchedPath}" -of stla -o "${tempPath}"`);
        await mirrorSTL(tempPath, outputPath);
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
