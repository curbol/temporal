#!/usr/bin/env node
/**
 * Convert JSCAD files to STL with higher arc resolution
 *
 * The default JSCAD arc resolution can produce visible facets on large arcs.
 * This script adds segment counts to arc commands before conversion.
 *
 * All STLs are processed through OpenSCAD to clean up the mesh and written as
 * binary STL, which is about a third the size of OpenSCAD's ASCII default and
 * reads identically in every slicer.
 * Files ending in _m_right are also mirrored to produce the right-hand STL.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const { glob } = require('glob');

const execAsync = promisify(exec);

function getArcSegments(radius) {
  const arcSegmentsBase = 10;
  const arcSegmentsMult = 10;

  return arcSegmentsBase + Math.ceil(radius * arcSegmentsMult);
}

async function processSTL(inputPath, outputPath, mirror = false) {
  const transform = mirror ? 'mirror([1, 0, 0])' : '';
  const scadContent = `${transform} import("${inputPath}", convexity=10);`;
  const scadPath = inputPath.replace('.stl', '_process.scad');
  fs.writeFileSync(scadPath, scadContent);
  try {
    await execAsync(`openscad --export-format binstl -o "${outputPath}" "${scadPath}"`);
  } finally {
    fs.unlinkSync(scadPath);
  }
}

/**
 * Where a case STL belongs under cases/. Half-cases are foldered by key count, which
 * with the kickstand choice is all that separates them. Shared parts stay at the top.
 */
function outputRelPath(baseName) {
  const variant = baseName.match(/^temporal_(38|42)_(?:(kickstand)_)?(left|m_right)$/);

  if (variant) {
    const [, count, kickstand, hand] = variant;
    const side = hand === 'm_right' ? 'right' : 'left';
    return path.join(count, `${kickstand ? 'kickstand_' : ''}${side}.stl`);
  }

  const plate = baseName.match(/^top_plate_(38|42)$/);

  if (plate) {
    return path.join(plate[1], 'top_plate.stl');
  }

  return `${baseName}.stl`;
}

async function main() {
  const casesDir = path.join(__dirname, '..', 'cases');
  const jscadDir = path.join(__dirname, '..', 'ergogen', 'output', 'cases');

  if (!fs.existsSync(casesDir)) {
    fs.mkdirSync(casesDir, { recursive: true });
  }

  // Skip this script's own patched copies. Ergogen never writes them, but an
  // interrupted run leaves them behind and they would be converted as cases.
  const jscadFiles = await glob('*.jscad', { cwd: jscadDir, ignore: '*_hires.jscad' });

  if (jscadFiles.length === 0) {
    console.error(`No JSCAD files found in ${jscadDir}`);
    console.error("Run 'npm run gen' first to generate case files");
    process.exit(1);
  }

  let failed = 0;

  const conversions = jscadFiles.map(async (file) => {
    const inputPath = path.join(jscadDir, file);
    const baseName = file.replace('.jscad', '');
    const needsMirroring = baseName.endsWith('_m_right');

    const outputName = outputRelPath(baseName);
    const outputPath = path.join(casesDir, outputName);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

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

    const patchedPath = inputPath.replace('.jscad', '_hires.jscad');
    fs.writeFileSync(patchedPath, content);

    try {
      const tempPath = path.join(casesDir, baseName + '_temp.stl');
      await execAsync(`npx @jscad/cli "${patchedPath}" -of stla -o "${tempPath}"`);

      await processSTL(tempPath, outputPath, needsMirroring);
      fs.unlinkSync(tempPath);

      console.log(`✓ Converted ${file} -> ${outputName}`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
      failed++;
    } finally {
      fs.unlinkSync(patchedPath);
    }
  });

  await Promise.all(conversions);

  if (failed > 0) {
    console.error(`Error: ${failed} of ${jscadFiles.length} cases failed to convert`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
