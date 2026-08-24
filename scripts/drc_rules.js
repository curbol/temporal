#!/usr/bin/env node
/**
 * Write KiCad custom DRC rule files (.kicad_dru) from scripts/kicad_config.yaml.
 *
 * KiCad finds these by basename beside the .kicad_pcb, and the zone filler honours
 * them, so they must be written before anything fills zones on that board.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Load rule definitions from the YAML config file.
 */
function loadCustomRules() {
  const configPath = path.join(__dirname, 'kicad_config.yaml');

  if (!fs.existsSync(configPath)) {
    console.error(`Error: Config file not found at ${configPath}`);
    process.exit(1);
  }

  const config = yaml.load(fs.readFileSync(configPath, 'utf-8'));

  return config.custom_rules ?? [];
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
