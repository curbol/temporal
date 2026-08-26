#!/usr/bin/env node
/**
 * Write the .kicad_pro and .kicad_dru beside each board from the defaults in
 * scripts/kicad_config.yaml, so every project carries the same settings.
 *
 * Usage:
 *   node scripts/setup_kicad_project.js [pcb_path]
 *
 * With no path, processes every .kicad_pcb under pcbs/.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { writeDrcRules } = require('./drc_rules');
const { loadKicadConfig, CONFIG_PATH: KICAD_CONFIG_PATH } = require('./kicad_config');

/**
 * The base .kicad_pro structure, with every required section present.
 */
function getBaseProjectStructure(projectName) {
  return {
    board: {
      "3dviewports": [],
      design_settings: {
        defaults: {
          apply_defaults_to_fp_fields: false,
          apply_defaults_to_fp_shapes: false,
          apply_defaults_to_fp_text: false,
          board_outline_line_width: 0.05,
          copper_line_width: 0.2,
          copper_text_italic: false,
          copper_text_size_h: 1.5,
          copper_text_size_v: 1.5,
          copper_text_thickness: 0.3,
          copper_text_upright: false,
          courtyard_line_width: 0.05,
          dimension_precision: 4,
          dimension_units: 3,
          dimensions: {
            arrow_length: 1270000,
            extension_offset: 500000,
            keep_text_aligned: true,
            suppress_zeroes: true,
            text_position: 0,
            units_format: 0
          },
          fab_line_width: 0.1,
          fab_text_italic: false,
          fab_text_size_h: 1.0,
          fab_text_size_v: 1.0,
          fab_text_thickness: 0.15,
          fab_text_upright: false,
          other_line_width: 0.1,
          other_text_italic: false,
          other_text_size_h: 1.0,
          other_text_size_v: 1.0,
          other_text_thickness: 0.15,
          other_text_upright: false,
          pads: {
            drill: 0.8,
            height: 1.27,
            width: 2.54
          },
          silk_line_width: 0.1,
          silk_text_italic: false,
          silk_text_size_h: 1.0,
          silk_text_size_v: 1.0,
          silk_text_thickness: 0.1,
          silk_text_upright: false,
          zones: {
            min_clearance: 0.5
          }
        },
        diff_pair_dimensions: [],
        drc_exclusions: [],
        meta: {
          version: 2
        },
        rule_severities: {
          annular_width: "error",
          clearance: "error",
          connection_width: "warning",
          copper_edge_clearance: "error",
          copper_sliver: "warning",
          courtyards_overlap: "error",
          creepage: "error",
          diff_pair_gap_out_of_range: "error",
          diff_pair_uncoupled_length_too_long: "error",
          drill_out_of_range: "error",
          duplicate_footprints: "warning",
          extra_footprint: "warning",
          footprint: "error",
          footprint_filters_mismatch: "ignore",
          footprint_symbol_mismatch: "warning",
          footprint_type_mismatch: "ignore",
          hole_clearance: "error",
          hole_to_hole: "warning",
          holes_co_located: "warning",
          invalid_outline: "error",
          isolated_copper: "warning",
          item_on_disabled_layer: "error",
          items_not_allowed: "error",
          length_out_of_range: "error",
          lib_footprint_issues: "ignore",
          lib_footprint_mismatch: "warning",
          malformed_courtyard: "error",
          microvia_drill_out_of_range: "error",
          mirrored_text_on_front_layer: "warning",
          missing_courtyard: "ignore",
          missing_footprint: "warning",
          net_conflict: "warning",
          nonmirrored_text_on_back_layer: "warning",
          npth_inside_courtyard: "ignore",
          padstack: "warning",
          pth_inside_courtyard: "ignore",
          shorting_items: "error",
          silk_edge_clearance: "warning",
          silk_over_copper: "ignore",
          silk_overlap: "warning",
          skew_out_of_range: "error",
          solder_mask_bridge: "error",
          starved_thermal: "error",
          text_height: "warning",
          text_on_edge_cuts: "error",
          text_thickness: "warning",
          through_hole_pad_without_hole: "error",
          too_many_vias: "error",
          track_angle: "error",
          track_dangling: "warning",
          track_segment_length: "error",
          track_width: "error",
          tracks_crossing: "error",
          unconnected_items: "error",
          unresolved_variable: "error",
          via_dangling: "warning",
          zones_intersect: "error"
        },
        rules: {
          max_error: 0.005,
          min_clearance: 0.0,
          min_connection: 0.0,
          min_copper_edge_clearance: 0.5,
          min_groove_width: 0.0,
          min_hole_clearance: 0.25,
          min_hole_to_hole: 0.25,
          min_microvia_diameter: 0.2,
          min_microvia_drill: 0.1,
          min_resolved_spokes: 2,
          min_silk_clearance: 0.0,
          min_text_height: 0.8,
          min_text_thickness: 0.08,
          min_through_hole_diameter: 0.3,
          min_track_width: 0.0,
          min_via_annular_width: 0.1,
          min_via_diameter: 0.5,
          solder_mask_to_copper_clearance: 0.0,
          use_height_for_length_calcs: true
        },
        teardrop_options: [
          {
            td_onpthpad: true,
            td_onroundshapesonly: false,
            td_onsmdpad: true,
            td_ontrackend: false,
            td_onvia: true
          }
        ],
        teardrop_parameters: [
          {
            td_allow_use_two_tracks: true,
            td_curve_segcount: 0,
            td_height_ratio: 1.0,
            td_length_ratio: 0.5,
            td_maxheight: 2.0,
            td_maxlen: 1.0,
            td_on_pad_in_zone: false,
            td_target_name: "td_round_shape",
            td_width_to_size_filter_ratio: 0.9
          },
          {
            td_allow_use_two_tracks: true,
            td_curve_segcount: 0,
            td_height_ratio: 1.0,
            td_length_ratio: 0.5,
            td_maxheight: 2.0,
            td_maxlen: 1.0,
            td_on_pad_in_zone: false,
            td_target_name: "td_rect_shape",
            td_width_to_size_filter_ratio: 0.9
          },
          {
            td_allow_use_two_tracks: true,
            td_curve_segcount: 0,
            td_height_ratio: 1.0,
            td_length_ratio: 0.5,
            td_maxheight: 2.0,
            td_maxlen: 1.0,
            td_on_pad_in_zone: false,
            td_target_name: "td_track_end",
            td_width_to_size_filter_ratio: 0.9
          }
        ],
        track_widths: [],
        tuning_pattern_settings: {
          diff_pair_defaults: {
            corner_radius_percentage: 80,
            corner_style: 1,
            max_amplitude: 1.0,
            min_amplitude: 0.2,
            single_sided: false,
            spacing: 1.0
          },
          diff_pair_skew_defaults: {
            corner_radius_percentage: 80,
            corner_style: 1,
            max_amplitude: 1.0,
            min_amplitude: 0.2,
            single_sided: false,
            spacing: 0.6
          },
          single_track_defaults: {
            corner_radius_percentage: 80,
            corner_style: 1,
            max_amplitude: 1.0,
            min_amplitude: 0.2,
            single_sided: false,
            spacing: 0.6
          }
        },
        via_dimensions: [],
        zones_allow_external_fillets: false
      },
      ipc2581: {
        dist: "",
        distpn: "",
        internal_id: "",
        mfg: "",
        mpn: ""
      },
      layer_pairs: [],
      layer_presets: [],
      viewports: []
    },
    boards: [],
    cvpcb: {
      equivalence_files: []
    },
    libraries: {
      pinned_footprint_libs: [],
      pinned_symbol_libs: []
    },
    meta: {
      filename: `${projectName}.kicad_pro`,
      version: 3
    },
    net_settings: {
      classes: [createNetClass("Default", {}, true)],
      meta: {
        version: 4
      },
      net_colors: null,
      netclass_assignments: null,
      netclass_patterns: []
    },
    pcbnew: {
      last_paths: {
        gencad: "",
        idf: "",
        netlist: "",
        plot: "",
        pos_files: "",
        specctra_dsn: "",
        step: "",
        svg: "",
        vrml: ""
      },
      page_layout_descr_file: ""
    },
    schematic: {
      legacy_lib_dir: "",
      legacy_lib_list: []
    },
    sheets: [],
    text_variables: {}
  };
}

/**
 * Return a copy of an object with its keys in alphabetical order, matching how
 * KiCad writes .kicad_pro so the file does not churn between tools.
 */
function sortKeys(object) {
  return Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));
}

function createNetClass(name, config, isDefault = false) {
  return {
    bus_width: 12,
    clearance: config.clearance ?? 0.2,
    diff_pair_gap: config.diff_pair_gap ?? 0.25,
    diff_pair_via_gap: config.diff_pair_gap ?? 0.25,
    diff_pair_width: config.diff_pair_width ?? 0.2,
    line_style: 0,
    microvia_diameter: config.microvia_diameter ?? 0.3,
    microvia_drill: config.microvia_drill ?? 0.1,
    name: name,
    pcb_color: "rgba(0, 0, 0, 0.000)",
    priority: isDefault ? 2147483647 : 0,
    schematic_color: "rgba(0, 0, 0, 0.000)",
    track_width: config.track_width ?? 0.25,
    via_diameter: config.via_diameter ?? 0.6,
    via_drill: config.via_drill ?? 0.3,
    wire_width: 6
  };
}

/**
 * Keys copied straight through from scripts/kicad_config.yaml, which owns them.
 * A missing one is a config error rather than something to paper over with a
 * default that would silently disagree with the YAML.
 */
const DESIGN_RULE_KEYS = [
  'min_clearance',
  'min_track_width',
  'min_via_diameter',
  'min_via_annular_width',
  'min_copper_edge_clearance',
  'min_hole_clearance',
  'min_hole_to_hole',
  'min_microvia_diameter',
  'min_microvia_drill',
  'min_through_hole_diameter',
  'min_text_height',
  'min_text_thickness'
];

const BOARD_DEFAULT_KEYS = [
  'board_outline_line_width',
  'copper_line_width',
  'copper_text_size_h',
  'copper_text_size_v',
  'copper_text_thickness',
  'silk_line_width',
  'silk_text_size_h',
  'silk_text_size_v',
  'silk_text_thickness'
];

function required(section, key, sectionName) {
  const value = section[key];

  if (typeof value !== 'number') {
    console.error(`Error: ${sectionName}.${key} is missing from ${KICAD_CONFIG_PATH}`);
    process.exit(1);
  }

  return value;
}

function applyDefaultsToProject(projectData, config) {
  // Rebuild the net classes from config so a class removed from the YAML also
  // disappears from an existing .kicad_pro, while keeping any field KiCad itself
  // added to a class we already wrote
  const existingByName = new Map(
    (projectData.net_settings.classes ?? []).map(netClass => [netClass.name, netClass]));

  const merge = netClass => sortKeys({ ...(existingByName.get(netClass.name) ?? {}), ...netClass });

  // Sort additional classes alphabetically by name to match KiCad's ordering
  const additionalClasses = [...(config.net_classes ?? [])].sort((a, b) => {
    const nameA = a.name ?? 'Unknown';
    const nameB = b.name ?? 'Unknown';
    return nameA.localeCompare(nameB);
  });

  projectData.net_settings.classes = [
    merge(createNetClass("Default", config.net_class_default ?? {}, true)),
    ...additionalClasses.map(netClassConfig =>
      merge(createNetClass(netClassConfig.name ?? 'Unknown', netClassConfig, false)))
  ];

  const netclassPatterns = config.netclass_patterns ?? [];
  if (netclassPatterns.length > 0) {
    projectData.net_settings.netclass_patterns = netclassPatterns.map(p => ({
      netclass: p.netclass,
      pattern: p.pattern
    }));
  }

  const rules = config.design_rules ?? {};
  const projectRules = projectData.board.design_settings.rules;
  for (const key of DESIGN_RULE_KEYS) {
    projectRules[key] = required(rules, key, 'design_rules');
  }

  const boardDefaults = config.board_defaults ?? {};
  const projectDefaults = projectData.board.design_settings.defaults;
  for (const key of BOARD_DEFAULT_KEYS) {
    projectDefaults[key] = required(boardDefaults, key, 'board_defaults');
  }
  projectDefaults.zones.min_clearance = required(boardDefaults, 'zones_min_clearance', 'board_defaults');

  return projectData;
}

function setupProjectFile(pcbPath, config) {
  if (!pcbPath.endsWith('.kicad_pcb')) {
    console.error(`Error: not a .kicad_pcb file: ${pcbPath}`);
    return false;
  }

  if (!fs.existsSync(pcbPath)) {
    console.warn(`Warning: PCB file not found: ${pcbPath}`);
    return false;
  }

  const projectPath = pcbPath.replace(/\.kicad_pcb$/, '.kicad_pro');
  const projectName = path.basename(pcbPath, '.kicad_pcb');

  let projectData;
  if (fs.existsSync(projectPath)) {
    const content = fs.readFileSync(projectPath, 'utf-8');
    projectData = JSON.parse(content);
  } else {
    projectData = getBaseProjectStructure(projectName);
  }

  projectData = applyDefaultsToProject(projectData, config);

  fs.writeFileSync(projectPath, JSON.stringify(projectData, null, 2), 'utf-8');

  writeDrcRules(pcbPath, config.custom_rules ?? []);

  return true;
}

async function main() {
  const config = loadKicadConfig();

  if (process.argv.length > 2) {
    if (!setupProjectFile(process.argv[2], config)) {
      process.exit(1);
    }
  } else {
    const pcbsDir = 'pcbs';

    if (!fs.existsSync(pcbsDir)) {
      console.error(`Error: PCBs directory not found: ${pcbsDir}`);
      process.exit(1);
    }

    const pcbFiles = await glob(`${pcbsDir}/*/*.kicad_pcb`, { ignore: '**/_autosave-*' });

    if (pcbFiles.length === 0) {
      process.exit(0);
    }

    let successCount = 0;
    let failed = 0;
    for (const pcbFile of pcbFiles) {
      if (setupProjectFile(pcbFile, config)) {
        successCount++;
      } else {
        failed++;
      }
    }

    if (successCount > 0) {
      console.log(`✓ Configured ${successCount} KiCad project files`);
    }

    if (failed > 0) {
      console.error(`Error: ${failed} of ${pcbFiles.length} PCB files could not be configured`);
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
