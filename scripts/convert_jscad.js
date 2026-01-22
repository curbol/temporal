#!/usr/bin/env node
/**
 * Convert JSCAD files to STL with higher arc resolution
 *
 * The default JSCAD arc resolution can produce visible facets on large arcs.
 * This script adds segment counts to arc commands before conversion.
 *
 * All STLs are processed with pymeshfix. Files ending in _m_right are also mirrored to produce _right STL.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const { glob } = require('glob');

const execAsync = promisify(exec);

function getArcSegments(radius) {
  const arcSegmentsBase = 10; // Base segments for small arcs
  const arcSegmentsMult = 10; // Multiplier for larger arcs

  return arcSegmentsBase + Math.ceil(radius * arcSegmentsMult);
}

/**
 * Process STL with pymeshfix (repair mesh and optionally mirror)
 */
async function processSTL(inputPath, outputPath, mirror = false) {
  const mirrorFlag = mirror ? ' --mirror' : '';
  const { stdout, stderr } = await execAsync(
    `python3 -u "${path.join(__dirname, 'meshfix.py')}" "${inputPath}" "${outputPath}"${mirrorFlag}`
  );
  if (stderr.trim()) {
    process.stderr.write(stderr);
  }
  if (stdout.trim()) {
    process.stdout.write(stdout);
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
        const resolution = getArcSegments(parseFloat(radius));
        return `.appendArc([${endpoint}],{"radius":${radius},"clockwise":${clockwise},"large":${large},"resolution":${resolution}})`;
      }
    );

    // Add resolution to CSG.Path2D.arc() calls (initial arcs that start paths)
    content = content.replace(
      /CSG\.Path2D\.arc\(\{"center":\[([^\]]+)\],"radius":([^,]+),"startangle":([^,]+),"endangle":([^}]+)\}\)/g,
      (match, center, radius, startangle, endangle) => {
        const resolution = getArcSegments(parseFloat(radius));
        return `CSG.Path2D.arc({"center":[${center}],"radius":${radius},"startangle":${startangle},"endangle":${endangle},"resolution":${resolution}})`;
      }
    );

    // Add resolution to CAG.circle() calls
    content = content.replace(
      /CAG\.circle\(\{"center":\[([^\]]+)\],"radius":([^}]+)\}\)/g,
      (match, center, radius) => {
        const resolution = getArcSegments(parseFloat(radius));
        return `CAG.circle({"center":[${center}],"radius":${radius},"resolution":${resolution}})`;
      }
    );

    // Create patched file
    const patchedPath = inputPath.replace('.jscad', '_hires.jscad');
    fs.writeFileSync(patchedPath, content);

    try {
      // Convert JSCAD to STL
      const tempPath = path.join(casesDir, baseName + '_temp.stl');
      await execAsync(`npx @jscad/cli "${patchedPath}" -of stla -o "${tempPath}"`);

      // Process with pymeshfix (repair mesh, mirror if needed)
      await processSTL(tempPath, outputPath, needsMirroring);
      fs.unlinkSync(tempPath);

      console.log(`✓ Converted ${file} -> ${outputName}`);
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
