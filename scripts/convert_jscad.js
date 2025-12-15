#!/usr/bin/env node
/**
 * Convert JSCAD files to STL with higher arc resolution
 *
 * The default JSCAD arc resolution can produce visible facets on large arcs.
 * This script adds segment counts to arc commands before conversion.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { glob } = require('glob');

// Higher resolution for smoother arcs
// Segments per full circle - higher = smoother but larger files
const ARC_SEGMENTS = 128;

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

  for (const file of jscadFiles) {
    const inputPath = path.join(jscadDir, file);
    const outputName = file.replace('.jscad', '.stl');
    const outputPath = path.join(casesDir, outputName);

    // Read original JSCAD content
    let content = fs.readFileSync(inputPath, 'utf8');

    // Add resolution parameter to appendArc calls
    // Original: .appendArc([x,y],{"radius":r,"clockwise":bool,"large":bool})
    // Patched:  .appendArc([x,y],{"radius":r,"clockwise":bool,"large":bool,"resolution":N})
    content = content.replace(
      /\.appendArc\(\[([^\]]+)\],\{"radius":([^,]+),"clockwise":(true|false),"large":(true|false)\}\)/g,
      `.appendArc([$1],{"radius":$2,"clockwise":$3,"large":$4,"resolution":${ARC_SEGMENTS}})`
    );

    // Create patched file
    const patchedPath = inputPath.replace('.jscad', '_hires.jscad');
    fs.writeFileSync(patchedPath, content);

    try {
      // Convert to STL
      execSync(`npx @jscad/cli "${patchedPath}" -of stla -o "${outputPath}"`, {
        stdio: 'pipe'
      });
      console.log(`✓ Converted ${file} -> ${outputName}`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    } finally {
      // Clean up patched file
      fs.unlinkSync(patchedPath);
    }
  }
}

main().catch(console.error);
