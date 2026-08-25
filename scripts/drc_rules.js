#!/usr/bin/env node
/**
 * Write KiCad custom DRC rule files (.kicad_dru) from scripts/kicad_config.yaml.
 *
 * KiCad finds these by basename beside the .kicad_pcb, and the zone filler honours
 * them, so they must be written before anything fills zones on that board.
 */

const fs = require('fs');
const { loadKicadConfig } = require('./kicad_config');

/**
 * Load rule definitions from the YAML config file.
 */
function loadCustomRules() {
  return loadKicadConfig().custom_rules ?? [];
}

/**
 * Render one rule as a .kicad_dru s-expression.
 */
function renderRule(rule) {
  const lines = [`(rule ${JSON.stringify(rule.name)}`];

  if (rule.condition) {
    lines.push(`\t(condition ${JSON.stringify(rule.condition)})`);
  }

  for (const constraint of [].concat(rule.constraint ?? [])) {
    lines.push(`\t(constraint ${constraint})`);
  }

  return `${lines.join('\n')})`;
}

/**
 * Write the .kicad_dru file beside a board, or remove it when no rules are defined.
 */
function writeDrcRules(pcbPath, rules = loadCustomRules()) {
  if (!pcbPath.endsWith('.kicad_pcb')) {
    throw new Error(`Refusing to derive a .kicad_dru path from ${pcbPath}: not a .kicad_pcb file`);
  }

  const rulesPath = pcbPath.replace(/\.kicad_pcb$/, '.kicad_dru');

  if (rules.length === 0) {
    fs.rmSync(rulesPath, { force: true });
    return false;
  }

  const content = ['(version 1)', ...rules.map(renderRule)].join('\n\n');
  fs.writeFileSync(rulesPath, `${content}\n`, 'utf-8');

  return true;
}

module.exports = { loadCustomRules, writeDrcRules };
