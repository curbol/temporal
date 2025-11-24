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
 *   node scripts/convert_svg_to_footprint.js assets/brain.svg ergogen/footprints/ceoloide/brain.js brain
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Default precision for SVG to footprint conversion
// Lower values = smoother curves but larger files
const DEFAULT_PRECISION = 0.25;

function convertSvgToKicad(svgPath, tempKicadPath, name, precision = DEFAULT_PRECISION) {
  console.log(`Converting SVG to KiCad format...`);
  console.log(`Using precision: ${precision} (lower = smoother)`);

  try {
    execSync(
      `svg2mod -i "${svgPath}" --force F.SilkS -o "${tempKicadPath}" --format pretty --name "${name}" -p ${precision} -c`,
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

  // Find all fp_poly blocks - match opening (fp_poly to its closing )
  // Need to handle nested parentheses properly
  let depth = 0;
  let currentPoly = '';
  let inPoly = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (content.substr(i, 8) === '(fp_poly') {
      inPoly = true;
      currentPoly = '';
      depth = 0;
    }

    if (inPoly) {
      currentPoly += char;

      if (char === '(') depth++;
      if (char === ')') depth--;

      if (depth === 0 && currentPoly.length > 0) {
        // Extract layer information
        const layerMatch = currentPoly.match(/\(layer\s+([^)]+)\)/);
        const layer = layerMatch ? layerMatch[1] : 'F.SilkS';

        // Extract width if present
        const widthMatch = currentPoly.match(/\(width\s+([\d.]+)\)/);
        const width = widthMatch ? widthMatch[1] : '0';

        // Extract all xy points
        const pointRegex = /\(xy\s+([-\d.]+)\s+([-\d.]+)\)/g;
        const points = [];
        let pointMatch;
        while ((pointMatch = pointRegex.exec(currentPoly)) !== null) {
          points.push([pointMatch[1], pointMatch[2]]);
        }

        if (points.length > 0) {
          polygons.push({ layer, width, points });
        }

        inPoly = false;
        currentPoly = '';
      }
    }
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

    // Define all polygon points
    const polygons_data = [
`;

  // Add each polygon's points
  polygons.forEach((poly, i) => {
    jsOutput += `      {
        width: ${poly.width},
        points: \`
${poly.points.map(([x, y]) => `          (xy ${x} ${y})`).join('\n')}
        \`
      },
`;
  });

  jsOutput += `    ];

    // Build footprint polygons
    let front_polys = '';
    let back_polys = '';

    polygons_data.forEach(poly => {
      front_polys += \`
    (fp_poly
      (pts
        \${poly.points}
      )
      (layer "\${p.side}.SilkS")
      (width \${poly.width})
    )\`;

      back_polys += \`
    (fp_poly
      (pts
        \${poly.points}
      )
      (layer "\${p.side === 'F' ? 'B' : 'F'}.SilkS")
      (width \${poly.width})
    )\`;
    });


    // Build the footprint
    let footprint = \`
  (footprint "${name}" (layer "\${p.side}.Cu")
    \${p.at}
    (attr virtual)
    (descr "${displayName} silkscreen artwork")
    (tags svg2mod)
    (fp_text reference "\${p.ref}" (at 0 0) (layer "\${p.side}.SilkS") hide
      (effects (font (size 1.524 1.524) (thickness 0.3048)))
    )
    (fp_text value "G***" (at 0 0) (layer "\${p.side}.SilkS") hide
      (effects (font (size 1.524 1.524) (thickness 0.3048)))
    )
\`;

    // Add polygons based on reversible setting
    if (p.reversible) {
      footprint += front_polys + back_polys;
    } else {
      footprint += front_polys;
    }

    // Add keepout zone if requested
    if (p.add_keepout) {
      const pos = parseAt(p.at);
      const rotation = p.r || pos.r;
      const zone_points = transformPolygon(polygons_data[0].points, pos.x, pos.y, -rotation);

      footprint += \`
    (zone
      (net 0)
      (net_name "")
      (layers "F.Cu" "B.Cu")
      (uuid "\${generate_uuid(p.ref + '-${name}-keepout')}")
      (hatch edge 0.508)
      (keepout
        (tracks not_allowed)
        (vias not_allowed)
        (pads not_allowed)
        (copperpour not_allowed)
        (footprints allowed)
      )
      (polygon
        (pts
\${zone_points}
        )
      )
    )\`;
    }

    footprint += \`
  )\`;

    return footprint;
  }
};
`;

  return jsOutput;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: convert_svg_to_footprint.js <input.svg> <output.js> [name] [precision]');
    console.log('');
    console.log('Arguments:');
    console.log('  input.svg   Path to input SVG file');
    console.log('  output.js   Path to output JavaScript footprint file');
    console.log('  name        Optional name for the footprint (defaults to basename of output file)');
    console.log(`  precision   Optional precision for curve smoothness (default: ${DEFAULT_PRECISION}, lower = smoother)`);
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/convert_svg_to_footprint.js assets/brain.svg ergogen/footprints/ceoloide/brain.js brain');
    console.log('  node scripts/convert_svg_to_footprint.js assets/brain.svg ergogen/footprints/ceoloide/brain.js brain 0.05');
    process.exit(1);
  }

  const svgPath = args[0];
  const outputPath = args[1];
  const name = args[2] || path.basename(outputPath, '.js');
  const precision = args[3] ? parseFloat(args[3]) : DEFAULT_PRECISION;

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
    const kicadPath = convertSvgToKicad(svgPath, tempKicadPath, name, precision);

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
