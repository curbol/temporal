#!/usr/bin/env python3
"""
Setup KiCad project files (.kicad_pro) with defaults from config/kicad_defaults.yaml

This script creates or updates .kicad_pro files with design defaults, ensuring
consistent settings across all PCB projects.

Usage:
    python3 scripts/setup_kicad_project.py [pcb_path]

If no path is provided, processes all .kicad_pcb files in pcbs/ directory.
"""

import json
import sys
from pathlib import Path
import yaml


def load_defaults_config():
    """Load defaults from YAML config file."""
    config_path = Path(__file__).parent.parent / "config" / "kicad_defaults.yaml"

    if not config_path.exists():
        print(f"Error: Config file not found at {config_path}")
        sys.exit(1)

    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)

    print(f"Loaded defaults from {config_path}")
    return config


def get_base_project_structure(project_name):
    """Create base .kicad_pro structure with all required sections."""
    return {
        "board": {
            "3dviewports": [],
            "design_settings": {
                "defaults": {
                    "apply_defaults_to_fp_fields": False,
                    "apply_defaults_to_fp_shapes": False,
                    "apply_defaults_to_fp_text": False,
                    "board_outline_line_width": 0.05,
                    "copper_line_width": 0.2,
                    "copper_text_italic": False,
                    "copper_text_size_h": 1.5,
                    "copper_text_size_v": 1.5,
                    "copper_text_thickness": 0.3,
                    "copper_text_upright": False,
                    "courtyard_line_width": 0.05,
                    "dimension_precision": 4,
                    "dimension_units": 3,
                    "dimensions": {
                        "arrow_length": 1270000,
                        "extension_offset": 500000,
                        "keep_text_aligned": True,
                        "suppress_zeroes": True,
                        "text_position": 0,
                        "units_format": 0
                    },
                    "fab_line_width": 0.1,
                    "fab_text_italic": False,
                    "fab_text_size_h": 1.0,
                    "fab_text_size_v": 1.0,
                    "fab_text_thickness": 0.15,
                    "fab_text_upright": False,
                    "other_line_width": 0.1,
                    "other_text_italic": False,
                    "other_text_size_h": 1.0,
                    "other_text_size_v": 1.0,
                    "other_text_thickness": 0.15,
                    "other_text_upright": False,
                    "pads": {
                        "drill": 0.8,
                        "height": 1.27,
                        "width": 2.54
                    },
                    "silk_line_width": 0.1,
                    "silk_text_italic": False,
                    "silk_text_size_h": 1.0,
                    "silk_text_size_v": 1.0,
                    "silk_text_thickness": 0.1,
                    "silk_text_upright": False,
                    "zones": {
                        "min_clearance": 0.5
                    }
                },
                "diff_pair_dimensions": [],
                "drc_exclusions": [],
                "meta": {
                    "version": 2
                },
                "rule_severities": {
                    "annular_width": "error",
                    "clearance": "error",
                    "connection_width": "warning",
                    "copper_edge_clearance": "error",
                    "copper_sliver": "warning",
                    "courtyards_overlap": "error",
                    "creepage": "error",
                    "diff_pair_gap_out_of_range": "error",
                    "diff_pair_uncoupled_length_too_long": "error",
                    "drill_out_of_range": "error",
                    "duplicate_footprints": "warning",
                    "extra_footprint": "warning",
                    "footprint": "error",
                    "footprint_filters_mismatch": "ignore",
                    "footprint_symbol_mismatch": "warning",
                    "footprint_type_mismatch": "ignore",
                    "hole_clearance": "error",
                    "hole_to_hole": "warning",
                    "holes_co_located": "warning",
                    "invalid_outline": "error",
                    "isolated_copper": "warning",
                    "item_on_disabled_layer": "error",
                    "items_not_allowed": "error",
                    "length_out_of_range": "error",
                    "lib_footprint_issues": "ignore",
                    "lib_footprint_mismatch": "warning",
                    "malformed_courtyard": "error",
                    "microvia_drill_out_of_range": "error",
                    "mirrored_text_on_front_layer": "warning",
                    "missing_courtyard": "ignore",
                    "missing_footprint": "warning",
                    "net_conflict": "warning",
                    "nonmirrored_text_on_back_layer": "warning",
                    "npth_inside_courtyard": "ignore",
                    "padstack": "warning",
                    "pth_inside_courtyard": "ignore",
                    "shorting_items": "error",
                    "silk_edge_clearance": "warning",
                    "silk_over_copper": "ignore",
                    "silk_overlap": "warning",
                    "skew_out_of_range": "error",
                    "solder_mask_bridge": "error",
                    "starved_thermal": "error",
                    "text_height": "warning",
                    "text_on_edge_cuts": "error",
                    "text_thickness": "warning",
                    "through_hole_pad_without_hole": "error",
                    "too_many_vias": "error",
                    "track_angle": "error",
                    "track_dangling": "warning",
                    "track_segment_length": "error",
                    "track_width": "error",
                    "tracks_crossing": "error",
                    "unconnected_items": "error",
                    "unresolved_variable": "error",
                    "via_dangling": "warning",
                    "zones_intersect": "error"
                },
                "rules": {
                    "max_error": 0.005,
                    "min_clearance": 0.0,
                    "min_connection": 0.0,
                    "min_copper_edge_clearance": 0.5,
                    "min_groove_width": 0.0,
                    "min_hole_clearance": 0.25,
                    "min_hole_to_hole": 0.25,
                    "min_microvia_diameter": 0.2,
                    "min_microvia_drill": 0.1,
                    "min_resolved_spokes": 2,
                    "min_silk_clearance": 0.0,
                    "min_text_height": 0.8,
                    "min_text_thickness": 0.08,
                    "min_through_hole_diameter": 0.3,
                    "min_track_width": 0.0,
                    "min_via_annular_width": 0.1,
                    "min_via_diameter": 0.5,
                    "solder_mask_to_copper_clearance": 0.0,
                    "use_height_for_length_calcs": True
                },
                "teardrop_options": [
                    {
                        "td_onpthpad": True,
                        "td_onroundshapesonly": False,
                        "td_onsmdpad": True,
                        "td_ontrackend": False,
                        "td_onvia": True
                    }
                ],
                "teardrop_parameters": [
                    {
                        "td_allow_use_two_tracks": True,
                        "td_curve_segcount": 0,
                        "td_height_ratio": 1.0,
                        "td_length_ratio": 0.5,
                        "td_maxheight": 2.0,
                        "td_maxlen": 1.0,
                        "td_on_pad_in_zone": False,
                        "td_target_name": "td_round_shape",
                        "td_width_to_size_filter_ratio": 0.9
                    },
                    {
                        "td_allow_use_two_tracks": True,
                        "td_curve_segcount": 0,
                        "td_height_ratio": 1.0,
                        "td_length_ratio": 0.5,
                        "td_maxheight": 2.0,
                        "td_maxlen": 1.0,
                        "td_on_pad_in_zone": False,
                        "td_target_name": "td_rect_shape",
                        "td_width_to_size_filter_ratio": 0.9
                    },
                    {
                        "td_allow_use_two_tracks": True,
                        "td_curve_segcount": 0,
                        "td_height_ratio": 1.0,
                        "td_length_ratio": 0.5,
                        "td_maxheight": 2.0,
                        "td_maxlen": 1.0,
                        "td_on_pad_in_zone": False,
                        "td_target_name": "td_track_end",
                        "td_width_to_size_filter_ratio": 0.9
                    }
                ],
                "track_widths": [],
                "tuning_pattern_settings": {
                    "diff_pair_defaults": {
                        "corner_radius_percentage": 80,
                        "corner_style": 1,
                        "max_amplitude": 1.0,
                        "min_amplitude": 0.2,
                        "single_sided": False,
                        "spacing": 1.0
                    },
                    "diff_pair_skew_defaults": {
                        "corner_radius_percentage": 80,
                        "corner_style": 1,
                        "max_amplitude": 1.0,
                        "min_amplitude": 0.2,
                        "single_sided": False,
                        "spacing": 0.6
                    },
                    "single_track_defaults": {
                        "corner_radius_percentage": 80,
                        "corner_style": 1,
                        "max_amplitude": 1.0,
                        "min_amplitude": 0.2,
                        "single_sided": False,
                        "spacing": 0.6
                    }
                },
                "via_dimensions": [],
                "zones_allow_external_fillets": False
            },
            "ipc2581": {
                "dist": "",
                "distpn": "",
                "internal_id": "",
                "mfg": "",
                "mpn": ""
            },
            "layer_pairs": [],
            "layer_presets": [],
            "viewports": []
        },
        "boards": [],
        "cvpcb": {
            "equivalence_files": []
        },
        "libraries": {
            "pinned_footprint_libs": [],
            "pinned_symbol_libs": []
        },
        "meta": {
            "filename": f"{project_name}.kicad_pro",
            "version": 3
        },
        "net_settings": {
            "classes": [
                {
                    "bus_width": 12,
                    "clearance": 0.2,
                    "diff_pair_gap": 0.25,
                    "diff_pair_via_gap": 0.25,
                    "diff_pair_width": 0.2,
                    "line_style": 0,
                    "microvia_diameter": 0.3,
                    "microvia_drill": 0.1,
                    "name": "Default",
                    "pcb_color": "rgba(0, 0, 0, 0.000)",
                    "priority": 2147483647,
                    "schematic_color": "rgba(0, 0, 0, 0.000)",
                    "track_width": 0.2,
                    "via_diameter": 0.6,
                    "via_drill": 0.3,
                    "wire_width": 6
                }
            ],
            "meta": {
                "version": 4
            },
            "net_colors": None,
            "netclass_assignments": None,
            "netclass_patterns": []
        },
        "pcbnew": {
            "last_paths": {
                "gencad": "",
                "idf": "",
                "netlist": "",
                "plot": "",
                "pos_files": "",
                "specctra_dsn": "",
                "step": "",
                "svg": "",
                "vrml": ""
            },
            "page_layout_descr_file": ""
        },
        "schematic": {
            "legacy_lib_dir": "",
            "legacy_lib_list": []
        },
        "sheets": [],
        "text_variables": {}
    }


def create_net_class(name, config, is_default=False):
    """Create a net class structure from config."""
    return {
        "bus_width": 12,
        "clearance": config.get('clearance', 0.2),
        "diff_pair_gap": config.get('diff_pair_gap', 0.25),
        "diff_pair_via_gap": config.get('diff_pair_gap', 0.25),
        "diff_pair_width": config.get('diff_pair_width', 0.2),
        "line_style": 0,
        "microvia_diameter": config.get('microvia_diameter', 0.3),
        "microvia_drill": config.get('microvia_drill', 0.1),
        "name": name,
        "pcb_color": "rgba(0, 0, 0, 0.000)",
        "priority": 2147483647 if is_default else 0,
        "schematic_color": "rgba(0, 0, 0, 0.000)",
        "track_width": config.get('track_width', 0.25),
        "via_diameter": config.get('via_diameter', 0.6),
        "via_drill": config.get('via_drill', 0.3),
        "wire_width": 6
    }


def apply_defaults_to_project(project_data, config):
    """Apply defaults from config to project data."""

    # Apply default net class
    net_class_default = config.get('net_class_default', {})
    default_class = project_data['net_settings']['classes'][0]
    default_class['track_width'] = net_class_default.get('track_width', 0.25)
    default_class['via_diameter'] = net_class_default.get('via_diameter', 0.6)
    default_class['via_drill'] = net_class_default.get('via_drill', 0.3)
    default_class['clearance'] = net_class_default.get('clearance', 0.2)
    default_class['diff_pair_width'] = net_class_default.get('diff_pair_width', 0.2)
    default_class['diff_pair_gap'] = net_class_default.get('diff_pair_gap', 0.25)
    default_class['microvia_diameter'] = net_class_default.get('microvia_diameter', 0.3)
    default_class['microvia_drill'] = net_class_default.get('microvia_drill', 0.1)

    # Add additional net classes (Power, Battery, etc.)
    additional_classes = config.get('net_classes', [])
    if additional_classes:
        # Remove existing custom classes (keep only Default)
        project_data['net_settings']['classes'] = [default_class]

        # Add new custom classes
        for net_class_config in additional_classes:
            name = net_class_config.get('name', 'Unknown')
            new_class = create_net_class(name, net_class_config, is_default=False)
            project_data['net_settings']['classes'].append(new_class)

    # Apply design rules
    rules = config.get('design_rules', {})
    project_rules = project_data['board']['design_settings']['rules']
    project_rules['min_clearance'] = rules.get('min_clearance', 0.0)
    project_rules['min_track_width'] = rules.get('min_track_width', 0.0)
    project_rules['min_via_diameter'] = rules.get('min_via_diameter', 0.5)
    project_rules['min_via_annular_width'] = rules.get('min_via_annular_width', 0.1)
    project_rules['min_copper_edge_clearance'] = rules.get('min_copper_edge_clearance', 0.5)
    project_rules['min_hole_clearance'] = rules.get('min_hole_clearance', 0.25)
    project_rules['min_hole_to_hole'] = rules.get('min_hole_to_hole', 0.25)
    project_rules['min_microvia_diameter'] = rules.get('min_microvia_diameter', 0.2)
    project_rules['min_microvia_drill'] = rules.get('min_microvia_drill', 0.1)
    project_rules['min_through_hole_diameter'] = rules.get('min_through_hole_diameter', 0.3)

    # Apply board defaults
    board_defaults = config.get('board_defaults', {})
    project_defaults = project_data['board']['design_settings']['defaults']
    project_defaults['board_outline_line_width'] = board_defaults.get('board_outline_line_width', 0.05)
    project_defaults['copper_line_width'] = board_defaults.get('copper_line_width', 0.2)
    project_defaults['copper_text_size_h'] = board_defaults.get('copper_text_size_h', 1.5)
    project_defaults['copper_text_size_v'] = board_defaults.get('copper_text_size_v', 1.5)
    project_defaults['copper_text_thickness'] = board_defaults.get('copper_text_thickness', 0.3)
    project_defaults['silk_line_width'] = board_defaults.get('silk_line_width', 0.1)
    project_defaults['silk_text_size_h'] = board_defaults.get('silk_text_size_h', 1.0)
    project_defaults['silk_text_size_v'] = board_defaults.get('silk_text_size_v', 1.0)
    project_defaults['silk_text_thickness'] = board_defaults.get('silk_text_thickness', 0.1)
    project_defaults['zones']['min_clearance'] = board_defaults.get('zones_min_clearance', 0.5)

    return project_data


def setup_project_file(pcb_path, config):
    """Create or update a .kicad_pro file with defaults."""
    pcb_path = Path(pcb_path)

    if not pcb_path.exists():
        print(f"Warning: PCB file not found: {pcb_path}")
        return False

    # Determine project file path
    project_path = pcb_path.with_suffix('.kicad_pro')
    project_name = pcb_path.stem

    # Load existing project or create new one
    if project_path.exists():
        print(f"Updating existing project file: {project_path}")
        with open(project_path, 'r') as f:
            project_data = json.load(f)
    else:
        print(f"Creating new project file: {project_path}")
        project_data = get_base_project_structure(project_name)

    # Apply defaults
    project_data = apply_defaults_to_project(project_data, config)

    # Write project file
    with open(project_path, 'w') as f:
        json.dump(project_data, f, indent=2)

    print(f"✓ Successfully configured {project_path}")
    return True


def main():
    """Main entry point."""
    config = load_defaults_config()

    # If a specific PCB path is provided, process only that one
    if len(sys.argv) > 1:
        pcb_path = Path(sys.argv[1])
        setup_project_file(pcb_path, config)
    else:
        # Process all .kicad_pcb files in pcbs/ directory
        pcbs_dir = Path(__file__).parent.parent / "pcbs"

        if not pcbs_dir.exists():
            print(f"Error: PCBs directory not found: {pcbs_dir}")
            sys.exit(1)

        # Find all .kicad_pcb files
        pcb_files = list(pcbs_dir.rglob("*.kicad_pcb"))

        if not pcb_files:
            print(f"No .kicad_pcb files found in {pcbs_dir}")
            sys.exit(0)

        print(f"\nFound {len(pcb_files)} PCB file(s)")
        print("=" * 60)

        success_count = 0
        for pcb_file in pcb_files:
            if setup_project_file(pcb_file, config):
                success_count += 1
            print()

        print("=" * 60)
        print(f"Processed {success_count}/{len(pcb_files)} project file(s) successfully")


if __name__ == "__main__":
    main()
