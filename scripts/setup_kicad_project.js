#!/usr/bin/env node
/**
 * Setup KiCad project files (.kicad_pro) with defaults from scripts/kicad_config.yaml
 *
 * This script creates or updates .kicad_pro files with design defaults, ensuring
 * consistent settings across all PCB projects.
 *
 * Usage:
 *   node scripts/setup_kicad_project.js [pcb_path]
 *
 * If no path is provided, processes all .kicad_pcb files in pcbs/ directory.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const yaml = require('js-yaml');

/**
 * Load defaults from YAML config file.
 */
function loadDefaultsConfig() {
  const configPath = path.join(__dirname, 'kicad_config.yaml');

  if (!fs.existsSync(configPath)) {
    console.error(`Error: Config file not found at ${configPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(configPath, 'utf-8');
  const config = yaml.load(content);

  return config;
}

/**
 * Get base .kicad_pro structure with all required sections.
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
      classes: [
        {
          bus_width: 12,
          clearance: 0.2,
          diff_pair_gap: 0.25,
          diff_pair_via_gap: 0.25,
          diff_pair_width: 0.2,
          line_style: 0,
          microvia_diameter: 0.3,
          microvia_drill: 0.1,
          name: "Default",
          pcb_color: "rgba(0, 0, 0, 0.000)",
          priority: 2147483647,
          schematic_color: "rgba(0, 0, 0, 0.000)",
          track_width: 0.2,
          via_diameter: 0.6,
          via_drill: 0.3,
          wire_width: 6
        }
      ],
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
 * Create a net class structure from config.
 */
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
 * Apply defaults from config to project data.
 */
function applyDefaultsToProject(projectData, config) {
  // Apply default net class
  const netClassDefault = config.net_class_default ?? {};
  const defaultClass = projectData.net_settings.classes[0];
  defaultClass.track_width = netClassDefault.track_width ?? 0.25;
  defaultClass.via_diameter = netClassDefault.via_diameter ?? 0.6;
  defaultClass.via_drill = netClassDefault.via_drill ?? 0.3;
  defaultClass.clearance = netClassDefault.clearance ?? 0.2;
  defaultClass.diff_pair_width = netClassDefault.diff_pair_width ?? 0.2;
  defaultClass.diff_pair_gap = netClassDefault.diff_pair_gap ?? 0.25;
  defaultClass.microvia_diameter = netClassDefault.microvia_diameter ?? 0.3;
  defaultClass.microvia_drill = netClassDefault.microvia_drill ?? 0.1;

  // Add additional net classes (Power, Battery, etc.)
  const additionalClasses = config.net_classes ?? [];
  if (additionalClasses.length > 0) {
    // Remove existing custom classes (keep only Default)
    projectData.net_settings.classes = [defaultClass];

    // Sort additional classes alphabetically by name to match KiCad's ordering
    const sortedClasses = [...additionalClasses].sort((a, b) => {
      const nameA = a.name ?? 'Unknown';
      const nameB = b.name ?? 'Unknown';
      return nameA.localeCompare(nameB);
    });

    // Add new custom classes in sorted order
    for (const netClassConfig of sortedClasses) {
      const name = netClassConfig.name ?? 'Unknown';
      const newClass = createNetClass(name, netClassConfig, false);
      projectData.net_settings.classes.push(newClass);
    }
  }

  // Apply design rules
  const rules = config.design_rules ?? {};
  const projectRules = projectData.board.design_settings.rules;
  projectRules.min_clearance = rules.min_clearance ?? 0.0;
  projectRules.min_track_width = rules.min_track_width ?? 0.0;
  projectRules.min_via_diameter = rules.min_via_diameter ?? 0.5;
  projectRules.min_via_annular_width = rules.min_via_annular_width ?? 0.1;
  projectRules.min_copper_edge_clearance = rules.min_copper_edge_clearance ?? 0.5;
  projectRules.min_hole_clearance = rules.min_hole_clearance ?? 0.25;
  projectRules.min_hole_to_hole = rules.min_hole_to_hole ?? 0.25;
  projectRules.min_microvia_diameter = rules.min_microvia_diameter ?? 0.2;
  projectRules.min_microvia_drill = rules.min_microvia_drill ?? 0.1;
  projectRules.min_through_hole_diameter = rules.min_through_hole_diameter ?? 0.3;

  // Apply board defaults
  const boardDefaults = config.board_defaults ?? {};
  const projectDefaults = projectData.board.design_settings.defaults;
  projectDefaults.board_outline_line_width = boardDefaults.board_outline_line_width ?? 0.05;
  projectDefaults.copper_line_width = boardDefaults.copper_line_width ?? 0.2;
  projectDefaults.copper_text_size_h = boardDefaults.copper_text_size_h ?? 1.5;
  projectDefaults.copper_text_size_v = boardDefaults.copper_text_size_v ?? 1.5;
  projectDefaults.copper_text_thickness = boardDefaults.copper_text_thickness ?? 0.3;
  projectDefaults.silk_line_width = boardDefaults.silk_line_width ?? 0.1;
  projectDefaults.silk_text_size_h = boardDefaults.silk_text_size_h ?? 1.0;
  projectDefaults.silk_text_size_v = boardDefaults.silk_text_size_v ?? 1.0;
  projectDefaults.silk_text_thickness = boardDefaults.silk_text_thickness ?? 0.1;
  projectDefaults.zones.min_clearance = boardDefaults.zones_min_clearance ?? 0.5;

  return projectData;
}

/**
 * Create or update a .kicad_pro file with defaults.
 */
function setupProjectFile(pcbPath, config) {
  if (!fs.existsSync(pcbPath)) {
    console.warn(`Warning: PCB file not found: ${pcbPath}`);
    return false;
  }

  // Determine project file path
  const projectPath = pcbPath.replace(/\.kicad_pcb$/, '.kicad_pro');
  const projectName = path.basename(pcbPath, '.kicad_pcb');

  // Load existing project or create new one
  let projectData;
  if (fs.existsSync(projectPath)) {
    const content = fs.readFileSync(projectPath, 'utf-8');
    projectData = JSON.parse(content);
  } else {
    projectData = getBaseProjectStructure(projectName);
  }

  // Apply defaults
  projectData = applyDefaultsToProject(projectData, config);

  // Write project file with custom formatting to match KiCad's numeric formatting
  const jsonString = JSON.stringify(projectData, null, 2);

  // Replace integer values that should have .0 to match KiCad's formatting
  // This ensures consistent formatting and prevents unnecessary diffs
  const formattedJson = jsonString
    .replace(/: (0|1|2)(\s*[,\n])/g, ': $1.0$2') // Format common integers
    .replace(/: (\d+)\.0+(\d)/g, ': $1.$2'); // Fix over-zealous replacement of decimals

  fs.writeFileSync(projectPath, formattedJson, 'utf-8');

  return true;
}

/**
 * Main entry point.
 */
async function main() {
  const config = loadDefaultsConfig();

  // If a specific PCB path is provided, process only that one
  if (process.argv.length > 2) {
    const pcbPath = process.argv[2];
    setupProjectFile(pcbPath, config);
  } else {
    // Process all .kicad_pcb files in pcbs/ directory
    const pcbsDir = 'pcbs';

    if (!fs.existsSync(pcbsDir)) {
      console.error(`Error: PCBs directory not found: ${pcbsDir}`);
      process.exit(1);
    }

    // Find all .kicad_pcb files
    const pcbFiles = await glob(`${pcbsDir}/**/*.kicad_pcb`);

    if (pcbFiles.length === 0) {
      process.exit(0);
    }

    let successCount = 0;
    for (const pcbFile of pcbFiles) {
      if (setupProjectFile(pcbFile, config)) {
        successCount++;
      }
    }

    if (successCount > 0) {
      console.log(`✓ Configured ${successCount} KiCad project files`);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
