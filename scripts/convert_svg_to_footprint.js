#!/usr/bin/env node
/**
 * Convert SVG to Ergogen JavaScript footprint via KiCad format
 *
 * This script:
 * 1. Uses svg2mod to convert SVG to .kicad_mod format
 * 2. Parses the KiCad footprint to extract polygons
 * 3. Generates an Ergogen-compatible JavaScript footprint
 *
 * Usage:
 *   node scripts/convert_svg_to_footprint.js <input.svg> <output.js> [name]
 *
 * Example:
 *   node scripts/convert_svg_to_footprint.js art/brain.svg ergogen/footprints/ceoloide/brain.js brain
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

function convertSvgToKicad(svgPath, tempKicadPath, name) {
  console.log(`Converting SVG to KiCad format...`);

  try {
    execSync(
      `svg2mod -i "${svgPath}" --force F.SilkS -o "${tempKicadPath}" --format pretty --name "${name}"`,
      { stdio: 'inherit' }
    );

    // svg2mod adds .kicad_mod extension
    return `${tempKicadPath}.kicad_mod`;
  } catch (error) {
    console.error('Error running svg2mod:', error.message);
    process.exit(1);
  }
}

function extractPolygons(content) {
  const polygons = [];

  // Find all fp_poly blocks
  const polyRegex = /\(fp_poly[^)]*\(pts[^)]*(?:\([^)]*\)[^)]*)*\)[^)]*\)/gs;
  const matches = content.matchAll(polyRegex);

  for (const match of matches) {
    const polyText = match[0];

    // Extract layer information
    const layerMatch = polyText.match(/\(layer\s+([^)]+)\)/);
    const layer = layerMatch ? layerMatch[1] : 'F.SilkS';

    // Extract width if present
    const widthMatch = polyText.match(/\(width\s+([\d.]+)\)/);
    const width = widthMatch ? widthMatch[1] : '0.15';

    // Extract all xy points
    const pointRegex = /\(xy\s+([-\d.]+)\s+([-\d.]+)\)/g;
    const points = [];
    let pointMatch;
    while ((pointMatch = pointRegex.exec(polyText)) !== null) {
      points.push([pointMatch[1], pointMatch[2]]);
    }

    polygons.push({ layer, width, points });
  }

  return polygons;
}

function generateJsFootprint(kicadContent, svgPath, name) {
  const polygons = extractPolygons(kicadContent);

  // Capitalize first letter for display name
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  const svgRelPath = path.relative(process.cwd(), svgPath);

  // Generate the JavaScript output
  let jsOutput = `// ${displayName} silkscreen artwork
//
// Description:
//  Converted from ${svgRelPath} using svg2mod
//  Places ${name} graphic on the PCB silkscreen layer
//
// Params:
//    side: default is F for Front
//      the side on which to place the footprint, either F or B
//    reversible: default is false
//      if true, adds mirrored version on opposite side
//    add_keepout: default is false
//      if true, adds keepout zone to prevent copper pour over artwork

module.exports = {
  params: {
    designator: "G",
    side: "F",
    reversible: false,
    add_keepout: false,
  },
  body: (p) => {
    // Simple UUID generator for keepout zones
    const generate_uuid = (seed) => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      const hex = Math.abs(hash).toString(16).padStart(32, '0');
      return \`\${hex.substr(0, 8)}-\${hex.substr(4, 4)}-\${hex.substr(8, 4)}-\${hex.substr(12, 4)}-\${hex.substr(16, 12)}\`;
    };

    // Parse position and rotation from p.at string
    const parseAt = (at_str) => {
      const match = at_str.match(/\\(at\\s+([-\\d.]+)\\s+([-\\d.]+)(?:\\s+([-\\d.]+))?\\)/);
      if (!match) return { x: 0, y: 0, r: 0 };
      return {
        x: parseFloat(match[1]),
        y: parseFloat(match[2]),
        r: match[3] ? parseFloat(match[3]) : 0
      };
    };

    // Transform polygon coordinates to absolute board coordinates
    // Zones always use absolute coordinates, even when embedded in footprints
    const transformPolygon = (polygon_str, x, y, r) => {
      const cos_r = Math.cos(r * Math.PI / 180);
      const sin_r = Math.sin(r * Math.PI / 180);

      return polygon_str.replace(/\\(xy\\s+([-\\d.]+)\\s+([-\\d.]+)\\)/g, (match, px, py) => {
        const fpx = parseFloat(px);
        const fpy = parseFloat(py);

        // Apply rotation then translation
        const rx = fpx * cos_r - fpy * sin_r + x;
        const ry = fpx * sin_r + fpy * cos_r + y;

        return \`(xy \${rx} \${ry})\`;
      });
    };

    const at = parseAt(p.at);
    let output = '';

    // Add artwork polygons
`;

  // Add each polygon
  polygons.forEach((poly, i) => {
    const pointsStr = poly.points.map(([x, y]) => `(xy ${x} ${y})`).join('\n      ');

    jsOutput += `    output += \`
    (fp_poly
      (pts
        ${pointsStr}
      )
      (layer \${p.side}.SilkS)
      (width ${poly.width})
    )
\`;
`;
  });

  // Add reversible logic
  jsOutput += `
    // Add mirrored version on opposite side if reversible
    if (p.reversible) {
`;

  polygons.forEach((poly, i) => {
    const pointsStr = poly.points.map(([x, y]) => `(xy ${parseFloat(x) * -1} ${y})`).join('\n        ');

    jsOutput += `      output += \`
    (fp_poly
      (pts
        ${pointsStr}
      )
      (layer \${p.side === 'F' ? 'B' : 'F'}.SilkS)
      (width ${poly.width})
    )
\`;
`;
  });

  jsOutput += `    }

    // Add keepout zone if requested
    if (p.add_keepout) {
      const uuid = generate_uuid(\`${name}_keepout_\${p.at}_\${Date.now()}\`);
      const polygonData = \``;

  // Add a simplified keepout polygon (using first polygon's bounds)
  if (polygons.length > 0) {
    const firstPoly = polygons[0];
    const pointsStr = firstPoly.points.map(([x, y]) => `(xy ${x} ${y})`).join('\n        ');
    jsOutput += pointsStr;
  }

  jsOutput += `\`;

      output += \`
    (zone
      (net 0)
      (net_name "")
      (layer "F.Cu")
      (uuid "\${uuid}")
      (name "${displayName} Artwork Keepout")
      (hatch edge 0.508)
      (connect_pads
        (clearance 0)
      )
      (min_thickness 0.254)
      (filled_areas_thickness no)
      (keepout
        (tracks not_allowed)
        (vias not_allowed)
        (pads not_allowed)
        (copperpour not_allowed)
        (footprints allowed)
      )
      (fill
        (thermal_gap 0.508)
        (thermal_bridge_width 0.508)
      )
      (polygon
        (pts
          \${transformPolygon(polygonData, at.x, at.y, at.r)}
        )
      )
    )
\`;
    }

    return output;
  }
};
`;

  return jsOutput;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: convert_svg_to_footprint.js <input.svg> <output.js> [name]');
    console.log('');
    console.log('Arguments:');
    console.log('  input.svg   Path to input SVG file');
    console.log('  output.js   Path to output JavaScript footprint file');
    console.log('  name        Optional name for the footprint (defaults to basename of output file)');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/convert_svg_to_footprint.js art/brain.svg ergogen/footprints/ceoloide/brain.js brain');
    process.exit(1);
  }

  const svgPath = args[0];
  const outputPath = args[1];
  const name = args[2] || path.basename(outputPath, '.js');

  // Verify input file exists
  if (!fs.existsSync(svgPath)) {
    console.error(`Error: Input file not found: ${svgPath}`);
    process.exit(1);
  }

  // Create temp file for KiCad conversion
  const tempDir = os.tmpdir();
  const tempKicadPath = path.join(tempDir, `${name}_temp`);

  console.log(`Converting ${svgPath} to ${outputPath}...`);
  console.log(`Footprint name: ${name}`);
  console.log('');

  try {
    // Step 1: Convert SVG to KiCad format
    const kicadPath = convertSvgToKicad(svgPath, tempKicadPath, name);

    // Step 2: Read KiCad file
    const kicadContent = fs.readFileSync(kicadPath, 'utf8');

    // Step 3: Generate JavaScript footprint
    const jsContent = generateJsFootprint(kicadContent, svgPath, name);

    // Step 4: Write output
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, jsContent);

    // Step 5: Cleanup temp file
    if (fs.existsSync(kicadPath)) {
      fs.unlinkSync(kicadPath);
    }

    console.log('✓ Conversion complete!');
    console.log(`  Output: ${outputPath}`);

  } catch (error) {
    console.error('Error during conversion:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateJsFootprint, extractPolygons };
