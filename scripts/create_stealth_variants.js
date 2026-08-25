#!/usr/bin/env node

/**
 * Create stealth variants of top plate PCBs with silkscreen text removed.
 * Keepout zones are preserved (they're on F.Cu/B.Cu, not silkscreen).
 */

const fs = require('fs');
const path = require('path');
const { writeDrcRules } = require('./drc_rules');
const { pcbNames } = require('./ergogen_config');

const PCBS_DIR = path.join(__dirname, '..', 'pcbs');
// Every top plate gets a stealth variant, derived from the boards the config declares
const SOURCE_PCBS = pcbNames().filter(name => name.startsWith('top_plate_'));
const SILKSCREEN_LAYERS = ['F.SilkS', 'B.SilkS'];

/**
 * Parse S-expression and extract balanced block starting at given index.
 * Returns the end index (after closing paren) and the extracted content.
 */
function extractSexpBlock(content, startIndex) {
  if (content[startIndex] !== '(') {
    return null;
  }

  let depth = 0;
  let i = startIndex;

  while (i < content.length) {
    if (content[i] === '(') {
      depth++;
    } else if (content[i] === ')') {
      depth--;
      if (depth === 0) {
        return {
          block: content.slice(startIndex, i + 1),
          endIndex: i + 1
        };
      }
    }
    i++;
  }

  return null;
}

/**
 * Check if a gr_text block is on a silkscreen layer.
 */
function isOnSilkscreenLayer(block) {
  for (const layer of SILKSCREEN_LAYERS) {
    // Look for (layer "F.SilkS") or (layer "B.SilkS")
    if (block.includes(`(layer "${layer}")`) || block.includes(`(layer ${layer})`)) {
      return true;
    }
  }
  return false;
}

/**
 * Remove silkscreen gr_text elements from PCB content.
 */
function removeSilkscreenText(content) {
  let result = '';
  let i = 0;
  let removedCount = 0;

  while (i < content.length) {
    // Look for gr_text start
    const grTextMatch = content.slice(i).match(/^(\s*)\(gr_text\s/);

    if (grTextMatch) {
      const whitespace = grTextMatch[1];
      const blockStart = i + whitespace.length;
      const extracted = extractSexpBlock(content, blockStart);

      if (extracted && isOnSilkscreenLayer(extracted.block)) {
        // Skip this gr_text block (and its leading whitespace)
        i = extracted.endIndex;
        removedCount++;
        // Also consume trailing newline if present
        if (content[i] === '\n') {
          i++;
        }
        continue;
      }
    }

    result += content[i];
    i++;
  }

  return { content: result, removedCount };
}

/**
 * True when some text still names a font face, so the embedded fonts are in use.
 */
function usesEmbeddedFace(content) {
  for (const match of content.matchAll(/\((?:gr_text|fp_text)\s/g)) {
    const extracted = extractSexpBlock(content, match.index);
    if (extracted && extracted.block.includes('(face ')) {
      return true;
    }
  }

  return false;
}

/**
 * Drop the fonts embedded for text this variant no longer has. Left in place they
 * are megabytes of a typeface the board never renders.
 */
function removeEmbeddedFonts(content) {
  if (usesEmbeddedFace(content)) {
    return content;
  }

  const markerIndex = content.indexOf('\n\t(embedded_files');

  if (markerIndex !== -1) {
    const extracted = extractSexpBlock(content, content.indexOf('(', markerIndex));
    if (extracted) {
      content = content.slice(0, markerIndex) + content.slice(extracted.endIndex);
    }
  }

  return content.replace('(embedded_fonts yes)', '(embedded_fonts no)');
}

/**
 * Create stealth variant of a PCB.
 */
function createStealthVariant(sourceName) {
  const sourceDir = path.join(PCBS_DIR, sourceName);
  const stealthName = `${sourceName}_stealth`;
  const stealthDir = path.join(PCBS_DIR, stealthName);

  // Check source exists
  const sourcePcbPath = path.join(sourceDir, `${sourceName}.kicad_pcb`);
  if (!fs.existsSync(sourcePcbPath)) {
    console.error(`Source PCB not found: ${sourcePcbPath}`);
    return false;
  }

  // Create stealth directory
  if (!fs.existsSync(stealthDir)) {
    fs.mkdirSync(stealthDir, { recursive: true });
  }

  // Read and process PCB
  const pcbContent = fs.readFileSync(sourcePcbPath, 'utf-8');
  const { content: strippedContent, removedCount } = removeSilkscreenText(pcbContent);
  const stealthContent = removeEmbeddedFonts(strippedContent);

  // Write stealth PCB
  const stealthPcbPath = path.join(stealthDir, `${stealthName}.kicad_pcb`);
  fs.writeFileSync(stealthPcbPath, stealthContent);

  // Copy and rename project file if it exists
  const sourceProPath = path.join(sourceDir, `${sourceName}.kicad_pro`);
  if (fs.existsSync(sourceProPath)) {
    const proContent = fs.readFileSync(sourceProPath, 'utf-8');
    const proJson = JSON.parse(proContent);

    // Update filename in meta
    if (proJson.meta && proJson.meta.filename) {
      proJson.meta.filename = `${stealthName}.kicad_pro`;
    }

    const stealthProPath = path.join(stealthDir, `${stealthName}.kicad_pro`);
    fs.writeFileSync(stealthProPath, JSON.stringify(proJson, null, 2));
  }

  writeDrcRules(stealthPcbPath);

  return { name: stealthName, removedCount };
}

function main() {
  if (SOURCE_PCBS.length === 0) {
    console.error('Error: no top plate boards found under pcbs: in ergogen/config.yaml');
    process.exit(1);
  }

  const results = [];
  let failed = 0;

  for (const sourceName of SOURCE_PCBS) {
    const result = createStealthVariant(sourceName);
    if (result) {
      results.push(result);
    } else {
      failed++;
    }
  }

  if (results.length > 0) {
    const summary = results.map(r => `${r.name}: ${r.removedCount} text(s)`).join(', ');
    console.log(`✓ Created ${results.length} stealth variant(s) [${summary}]`);
  }

  if (failed > 0) {
    console.error(`Error: ${failed} stealth variant(s) could not be created`);
    process.exit(1);
  }
}

main();
