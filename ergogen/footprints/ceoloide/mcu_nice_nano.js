// thrly: changed socket size (drill 1) down to 0.85mm to hold Typeractive no-solder spring headers

// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//  A single-side or reversible footprint for the nice!nano (or any pro-micro compatible
//  controller) that uses jumpers instead of two socket rows to be reversible.
//
//  Note that the extra pins are *ONLY* compatible with nice!nano boards and not with
//  clones like the Supermini, which has pins in a slightly different position.
//
//  This is a re-implementation of the promicro_pretty footprint made popular
//  by @benvallack.
//
// Pinout and schematics:
//  https://nicekeyboards.com/docs/nice-nano/pinout-schematic
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    reverse_mount: default is false (MCU facing away from the PCB)
//      if true, the sockets will be oriented so that the MCU faces the PCB (RAW / B+ is the
//      top left pin). This is the most common mounting option for the nice!nano.
//      When set to false, the pads will match the datasheet and assume the MCU faces away
//      from the PCB (RAW / B+ is the top right pin).
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the vias
//      and the through-holes for the MCU
//    include_extra_pins: default is false
//      if true and if not reversible it will include nice!nano extra pin sockets (P1.01,
//      P1.02, P1.07)
//    only_required_jumpers: default is false
//      if true, it will only place jumpers on the first 4 rows of pins, which can't be
//      reversed in firmware, i.e. RAW and P1, GND and P0, GND and RST, GND and VCC.
//    use_rectangular_jumpers: default is false
//      if true, it will replace chevron-style jumpers with rectangual pads
//    via_size: default is 0.8
//      allows to define the size of the via. Not recommended below 0.56 (JLCPCB minimum),
//      or above 0.8 (KiCad default), to avoid overlap or DRC errors.
//    via_drill: default is 0.4
//      allows to define the size of the drill. Not recommended below 0.3 (JLCPCB minimum),
//      or above 0.4 (KiCad default), to avoid overlap or DRC errors.
//    Pxx_label, VCC_label, RAW_label, GND_label, RST_label: default is ''
//      allows to override the label for each pin
//    mcu_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    mcu_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    mcu_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    mcu_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
//
// @infused-kim's improvements:
//  - Use real traces instead of pads, which gets rid of hundreds of DRC errors.
//  - Leave more space between the vias to allow easier routing through the middle
//    of the footprint
//
// @ceoloide's improvements:
//  - Move vias closer to the pads to clear up more space for silkscreen
//  - Add ability to use rectangular jumpers instead of chevron-style
//  - Add ability to control via size, to free up space for routing if needed
//  - Add ability to only have required jumpers and let the rest be handled in firmware
//  - Add single side (non-reversible) support
//  - Add ability to mount with MCU facing towards or away from PCB
//  - Add ability to show silkscreen labels on both sides for single side footprint
//  - Add extra pins (P1.01, P1.02, P1.07) when footprint is single-side or reversible
//    (only required jumpers)
//  - Upgrade to KiCad 8
//
// @curbol's improvements:
//  - Row 0 vias offset 0.5mm down to make space for a power switch under the USB connector
//  - Row 0 (RAW) uses 0.5mm traces
//  - Row 3 (VCC) uses 0.375mm traces
//  - Trace widths via params (default_trace_width, raw_trace_width, vcc_trace_width)
//  - Optional GND vias between jumper rows for better ground stitching (include_gnd_vias)
//
// # Placement and soldering of jumpers
//
// The reversible footprint is meant to be used with jumpers on the
// OPPOSITE side of where the nice!nano (or pro-micro compatible board) is
// installed. The silkscreen labels will also match the board when read on
// the opposite side. This is to have all jumpers and components to solder on
// the same side, and be able to read the correct labels of the MCU to do
// tests with a multimeter.
//
// # Further credits
//
// The original footprint was created from scratch by @infused-kim, but was based on the ideas from
// these other footprints:
//
// https://github.com/Albert-IV/ergogen-contrib/blob/main/src/footprints/promicro_pretty.js
// https://github.com/50an6xy06r6n/keyboard_reversible.pretty

module.exports = {
  params: {
    designator: "MCU",
    side: "F",
    reversible: false,
    reverse_mount: false,
    include_traces: true,
    include_extra_pins: false,
    invert_jumpers_position: false,
    only_required_jumpers: false,
    use_rectangular_jumpers: false,
    include_resistor_pads: false,
    via_size: 0.6, // JLCPC min is 0.56 for 1-2 layer boards, KiCad defaults to 0.8
    via_drill: 0.3, // JLCPC min is 0.3 for 1-2 layer boards, KiCad defaults to 0.4
    include_gnd_vias: false, // Add GND vias between jumper rows for better grounding
    default_trace_width: 0.25, // Default trace width for signal traces
    raw_trace_width: 0.5, // Trace width for RAW power traces
    vcc_trace_width: 0.375, // Trace width for VCC power traces

    show_instructions: true,
    show_silk_labels: true,
    show_silk_labels_on_both_sides: false,
    show_via_labels: true,

    label_font_face: "",
    label_font_size: 1,
    label_font_thickness: 0.15,
    via_label_font_size: 0.5,
    via_label_font_thickness: 0.08,

    mcu_3dmodel_filename: "",
    mcu_3dmodel_xyz_offset: [0, 0, 0],
    mcu_3dmodel_xyz_rotation: [0, 0, 0],
    mcu_3dmodel_xyz_scale: [1, 1, 1],

    RAW_label: "",
    GND_label: "",
    RST_label: "",
    VCC_label: "",
    P21_label: "",
    P20_label: "",
    P19_label: "",
    P18_label: "",
    P15_label: "",
    P14_label: "",
    P16_label: "",
    P10_label: "",

    P1_label: "",
    P0_label: "",
    P2_label: "",
    P3_label: "",
    P4_label: "",
    P5_label: "",
    P6_label: "",
    P7_label: "",
    P8_label: "",
    P9_label: "",

    P101_label: "",
    P102_label: "",
    P107_label: "",

    RAW: { type: "net", value: "RAW" },
    GND: { type: "net", value: "GND" },
    RST: { type: "net", value: "RST" },
    VCC: { type: "net", value: "VCC" },
    P21: { type: "net", value: "P21" },
    P20: { type: "net", value: "P20" },
    P19: { type: "net", value: "P19" },
    P18: { type: "net", value: "P18" },
    P15: { type: "net", value: "P15" },
    P14: { type: "net", value: "P14" },
    P16: { type: "net", value: "P16" },
    P10: { type: "net", value: "P10" },

    P1: { type: "net", value: "P1" },
    P0: { type: "net", value: "P0" },
    P2: { type: "net", value: "P2" },
    P3: { type: "net", value: "P3" },
    P4: { type: "net", value: "P4" },
    P5: { type: "net", value: "P5" },
    P6: { type: "net", value: "P6" },
    P7: { type: "net", value: "P7" },
    P8: { type: "net", value: "P8" },
    P9: { type: "net", value: "P9" },

    P101: { type: "net", value: "P101" },
    P102: { type: "net", value: "P102" },
    P107: { type: "net", value: "P107" },
  },
  body: (p) => {
    const get_pin_net_name = (p, pin_name) => {
      return p[pin_name].name;
    };

    const get_pin_net_str = (p, pin_name) => {
      return p[pin_name].str;
    };

    const get_pin_label_override = (p, pin_name) => {
      let prop_name = `${pin_name}_label`;
      return p[prop_name];
    };

    const get_pin_label = (p, pin_name) => {
      let label = get_pin_label_override(p, pin_name);
      if (label == "") {
        label = get_pin_net_name(p, pin_name);
      }

      if (label === undefined) {
        label = '""';
      }

      return label;
    };

    const get_font_str = (is_via_label) => {
      const size = is_via_label ? p.via_label_font_size : p.label_font_size;
      const thickness = is_via_label ? p.via_label_font_thickness : p.label_font_thickness;
      const face = p.label_font_face != "" ? ` (face "${p.label_font_face}")` : "";
      return `(font${face} (size ${size} ${size}) (thickness ${thickness}))`;
    };

    const gen_traces_row = (row_num) => {
      // Trace width variables
      const tw = p.default_trace_width;
      const raw_tw = p.raw_trace_width;
      const vcc_tw = p.vcc_trace_width;

      // For row 0 (top pins), shift vias and connected traces down 0.5mm to make room for power switch
      const via_y_offset = row_num === 0 ? 0.5 : 0;

      // Front traces: for row 0, go horizontal then 45° to via; otherwise straight horizontal
      const front_traces = via_y_offset > 0 ? `
  (segment (start ${p.eaxy(
        p.use_rectangular_jumpers ? 4.58 : 4.775,
        -12.7 + row_num * 2.54
      )}) (end ${p.eaxy(3.4 + via_y_offset, -12.7 + row_num * 2.54)}) (width 0.5) (layer "F.Cu"))
  (segment (start ${p.eaxy(3.4 + via_y_offset, -12.7 + row_num * 2.54)}) (end ${p.eaxy(3.4, -12.7 + row_num * 2.54 + via_y_offset)}) (width 0.5) (layer "F.Cu"))
  (segment (start ${p.eaxy(
        p.use_rectangular_jumpers ? -4.58 : -4.775,
        -12.7 + row_num * 2.54
      )}) (end ${p.eaxy(-3.4 - via_y_offset, -12.7 + row_num * 2.54)}) (width 0.5) (layer "F.Cu"))
  (segment (start ${p.eaxy(-3.4 - via_y_offset, -12.7 + row_num * 2.54)}) (end ${p.eaxy(-3.4, -12.7 + row_num * 2.54 + via_y_offset)}) (width 0.5) (layer "F.Cu"))
` : `
  (segment (start ${p.eaxy(
        p.use_rectangular_jumpers ? 4.58 : 4.775,
        -12.7 + row_num * 2.54
      )}) (end ${p.eaxy(3.4, -12.7 + row_num * 2.54)}) (width 0.5) (layer "F.Cu"))
  (segment (start ${p.eaxy(
        p.use_rectangular_jumpers ? -4.58 : -4.775,
        -12.7 + row_num * 2.54
      )}) (end ${p.eaxy(-3.4, -12.7 + row_num * 2.54)}) (width 0.5) (layer "F.Cu"))
`;

      // Right side shifted down to avoid GND vias when they are included
      const trace_y_offset = p.include_gnd_vias ? 0.2 : 0;
      const row_y = -12.7 + row_num * 2.54;
      const socket_to_jumper_traces = `
  (segment (start ${p.eaxy(-7.62, row_y)}) (end ${p.eaxy(-5.5, row_y)}) (width 0.5) (layer "F.Cu"))
  (segment (start ${p.eaxy(-7.62, row_y)}) (end ${p.eaxy(-5.5, row_y)}) (width 0.5) (layer "B.Cu"))
  (segment (start ${p.eaxy(5.5, row_y + trace_y_offset)}) (end ${p.eaxy(7.62, row_y + trace_y_offset)}) (width 0.5) (layer "F.Cu"))
  (segment (start ${p.eaxy(7.62, row_y + trace_y_offset)}) (end ${p.eaxy(5.5, row_y + trace_y_offset)}) (width 0.5) (layer "B.Cu"))`;

      // Back layer routing traces
      const base_y = row_num * 2.54 - 12.7;

      // Row 0: Special routing with via offset and RAW using wider traces
      if (row_num === 0) {
        // Right side (pad 124, encoder_b) → left via: default trace width
        // Pattern adjusted for 0.5mm via offset
        const right_traces = `
  (segment (start ${p.eaxy(4.58, base_y)}) (end ${p.eaxy(3.785298, base_y)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.785298, base_y)}) (end ${p.eaxy(3.659298, base_y - 0.126)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.659298, base_y - 0.126)}) (end ${p.eaxy(3.140702, base_y - 0.126)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.140702, base_y - 0.126)}) (end ${p.eaxy(2.734702, base_y + 0.28)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(2.734702, base_y + 0.28)}) (end ${p.eaxy(-3.18, base_y + 0.28)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.18, base_y + 0.28)}) (end ${p.eaxy(-3.4, base_y + 0.5)}) (width ${tw}) (layer "B.Cu"))`;

        // Left side (pad 101, RAW) → right via: RAW trace width with special routing for clearance
        const raw_traces = `
  (segment (start ${p.eaxy(-4.58, base_y)}) (end ${p.eaxy(-4.58, base_y + 0.382)}) (width ${raw_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-4.58, base_y + 0.382)}) (end ${p.eaxy(-3.711, base_y + 1.251)}) (width ${raw_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.711, base_y + 1.251)}) (end ${p.eaxy(-3.089, base_y + 1.251)}) (width ${raw_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.089, base_y + 1.251)}) (end ${p.eaxy(-2.694, base_y + 0.856)}) (width ${raw_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-2.694, base_y + 0.856)}) (end ${p.eaxy(3.044, base_y + 0.856)}) (width ${raw_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.044, base_y + 0.856)}) (end ${p.eaxy(3.4, base_y + 0.5)}) (width ${raw_tw}) (layer "B.Cu"))`;

        return front_traces + socket_to_jumper_traces + right_traces + raw_traces;
      }

      // Row 3: VCC on left side uses wider traces with adjusted routing for clearance
      if (row_num === 3) {
        // Right side (pad 121, P0.08) → left via: default trace width
        const back_traces_right = `
  (segment (start ${p.eaxy(4.58, base_y)}) (end ${p.eaxy(4.285298, base_y)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(4.285298, base_y)}) (end ${p.eaxy(3.659298, base_y - 0.626)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.659298, base_y - 0.626)}) (end ${p.eaxy(3.140702, base_y - 0.626)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.140702, base_y - 0.626)}) (end ${p.eaxy(2.734702, base_y - 0.23)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(2.734702, base_y - 0.23)}) (end ${p.eaxy(-3.18, base_y - 0.23)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.18, base_y - 0.23)}) (end ${p.eaxy(-3.4, base_y)}) (width ${tw}) (layer "B.Cu"))`;

        // Left side (pad 104, VCC) → right via: VCC trace width with adjusted routing
        // Routes higher (base_y + 0.6885) then crosses at base_y + 0.305 for clearance from GND vias/traces
        const back_traces_left = `
  (segment (start ${p.eaxy(-4.58, base_y)}) (end ${p.eaxy(-4.374, base_y)}) (width ${vcc_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-4.374, base_y)}) (end ${p.eaxy(-3.685, base_y + 0.6885)}) (width ${vcc_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.685, base_y + 0.6885)}) (end ${p.eaxy(-3.115, base_y + 0.6885)}) (width ${vcc_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.115, base_y + 0.6885)}) (end ${p.eaxy(-2.731, base_y + 0.305)}) (width ${vcc_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-2.731, base_y + 0.305)}) (end ${p.eaxy(3.101, base_y + 0.305)}) (width ${vcc_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.101, base_y + 0.305)}) (end ${p.eaxy(3.18, base_y + 0.226)}) (width ${vcc_tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.18, base_y + 0.226)}) (end ${p.eaxy(3.4, base_y)}) (width ${vcc_tw}) (layer "B.Cu"))`;

        return front_traces + socket_to_jumper_traces + back_traces_right + back_traces_left;
      }

      // Rows 1, 2, 4-11: Standard cross pattern with default trace width
      // Right side (right pad → left via)
      const back_traces_right = `
  (segment (start ${p.eaxy(4.58, base_y)}) (end ${p.eaxy(4.285298, base_y)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(4.285298, base_y)}) (end ${p.eaxy(3.659298, base_y - 0.626)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.659298, base_y - 0.626)}) (end ${p.eaxy(3.140702, base_y - 0.626)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.140702, base_y - 0.626)}) (end ${p.eaxy(2.734702, base_y - 0.23)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(2.734702, base_y - 0.23)}) (end ${p.eaxy(-3.18, base_y - 0.23)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.18, base_y - 0.23)}) (end ${p.eaxy(-3.4, base_y)}) (width ${tw}) (layer "B.Cu"))`;

      // Left side (left pad → right via)
      const back_traces_left = `
  (segment (start ${p.eaxy(-4.58, base_y)}) (end ${p.eaxy(-4.285298, base_y)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-4.285298, base_y)}) (end ${p.eaxy(-3.659298, base_y + 0.626)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.659298, base_y + 0.626)}) (end ${p.eaxy(-3.140702, base_y + 0.626)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.140702, base_y + 0.626)}) (end ${p.eaxy(-2.734702, base_y + 0.23)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(-2.734702, base_y + 0.23)}) (end ${p.eaxy(3.18, base_y + 0.23)}) (width ${tw}) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.18, base_y + 0.23)}) (end ${p.eaxy(3.4, base_y)}) (width ${tw}) (layer "B.Cu"))`;

      return front_traces + socket_to_jumper_traces + back_traces_right + back_traces_left;
    };

    const gen_traces = () => {
      let traces = "";
      for (let i = 0; i < 12; i++) {
        if (i < 4 || !p.only_required_jumpers) {
          let row_traces = gen_traces_row(i);
          traces += row_traces;
        }
      }

      return traces;
    };

    // Generate GND vias between jumper rows for better ground stitching
    // Vias are placed on the right side between jumper pads and socket holes
    const gen_gnd_vias = () => {
      let vias = "";
      const via_x = 6.3; // Between jumper pads (~5.5) and socket holes (7.62)

      // Generate vias above rows 0-11 (12 vias total, one per row)
      for (let row = 0; row <= 11; row++) {
        const row_y = -12.7 + row * 2.54;
        const via_offset = 0.55;
        const via_y = row_y - via_offset;

        vias += `
    (via (at ${p.eaxy(via_x, via_y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.GND.index}))`;
      }

      return vias;
    };

    // Generate jumper vias (actual vias instead of through-hole pads)
    // These connect the jumper pads between front and back layers
    const gen_jumper_vias = () => {
      const pin_names = [
        ["P1", "RAW"],
        ["P0", "GND"],
        ["GND", "RST"],
        ["GND", "VCC"],
        ["P2", "P21"],
        ["P3", "P20"],
        ["P4", "P19"],
        ["P5", "P18"],
        ["P6", "P15"],
        ["P7", "P14"],
        ["P8", "P16"],
        ["P9", "P10"],
      ];

      const invert = (p.side == "B" && !p.reverse_mount && !p.reversible) ||
        (p.side == "F" && p.reverse_mount && !p.reversible) ||
        (!p.reverse_mount && p.reversible);

      let vias = "";
      for (let row = 0; row < pin_names.length; row++) {
        // Only generate vias for reversible rows that need jumpers
        if (!(p.reversible && (row < 4 || !p.only_required_jumpers))) {
          continue;
        }

        const pin_name_left = pin_names[row][invert ? 1 : 0];
        const pin_name_right = pin_names[row][invert ? 0 : 1];
        const net_left_index = p[pin_name_left].index;
        const net_right_index = p[pin_name_right].index;

        const row_y = -12.7 + row * 2.54;
        // For row 0 (top pins), shift vias down 0.5mm to make room for power switch
        const via_y_offset = row === 0 ? 0.5 : 0;
        const via_y = row_y + via_y_offset;

        vias += `
    (via (at ${p.eaxy(-3.4, via_y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net_left_index}))
    (via (at ${p.eaxy(3.4, via_y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net_right_index}))`;
      }

      return vias;
    };

    const invert_pins =
      (p.side == "B" && !p.reverse_mount && !p.reversible) ||
      (p.side == "F" && p.reverse_mount && !p.reversible) ||
      (!p.reverse_mount && p.reversible);

    const gen_socket_row = (
      row_num,
      pin_name_left,
      pin_name_right,
      show_via_labels,
      show_silk_labels
    ) => {
      const row_offset_y = 2.54 * row_num;
      // For row 0 (top pins), shift vias down 0.5mm to make room for power switch
      const via_y_offset = row_num === 0 ? 0.5 : 0;

      const socket_hole_num_left = 24 - row_num;
      const socket_hole_num_right = 1 + row_num;
      const via_num_left = 124 - row_num;
      const via_num_right = 101 + row_num;

      const net_left = get_pin_net_str(p, pin_name_left);
      const net_right = get_pin_net_str(p, pin_name_right);
      const via_label_left = get_pin_label(p, pin_name_left);
      const via_label_right = get_pin_label(p, pin_name_right);

      // These are the silkscreen labels that will be printed on the PCB.
      // If the footprint is reversible, they will be aligned with the pins
      // on the opposite side of where the MCU board is mounted.
      const net_silk_front_left = via_label_left;
      const net_silk_front_right = via_label_right;
      const net_silk_back_left = via_label_right;
      const net_silk_back_right = via_label_left;

      let socket_row_base = `
    ${"" /* Socket Holes */}
    (pad "${socket_hole_num_left}" thru_hole circle (at -7.62 ${-12.7 + row_offset_y
        } ${p.r}) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.reversible && (row_num < 4 || !p.only_required_jumpers)
          ? p.local_net(socket_hole_num_left).str
          : net_left
        })
    (pad "${socket_hole_num_right}" thru_hole circle (at 7.62 ${-12.7 + row_offset_y
        } ${p.r}) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.reversible && (row_num < 4 || !p.only_required_jumpers)
          ? p.local_net(socket_hole_num_right).str
          : net_right
        })
      `;
      // Vias are now generated as actual via elements in gen_jumper_vias()
      // instead of through-hole pads inside the footprint
      let socket_row_vias = ``;

      let socket_row_rectangular_jumpers = `
    ${"" /* Jumper Pads - Front Left */}
    (pad "${socket_hole_num_left}" smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_left).str
        })
    (pad "${via_num_left}" smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${net_left})

    ${"" /* Jumper Pads - Front Right */}
    (pad "${via_num_right}" smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${net_right})
    (pad "${socket_hole_num_right}" smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_right).str
        })

    ${"" /* Jumper Pads - Back Left */}
    (pad "${socket_hole_num_left}" smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_left).str
        })
    (pad "${via_num_right}" smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${net_right})

    ${"" /* Jumper Pads - Back Right */}
    (pad "${via_num_left}" smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${net_left})
    (pad "${socket_hole_num_right}" smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_right).str
        })
        `;

      let socket_row_chevron_jumpers = `
    ${"" /* Jumper Pads - Front Left */}
    (pad "${socket_hole_num_left}" smd custom (at -5.5 ${-12.7 + row_offset_y
        } ${p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_left).str
        }
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
      ) (width 0) (fill yes))
    ))
    (pad "${via_num_left}" smd custom (at -4.775 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${net_left}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))

    ${"" /* Jumper Pads - Front Right */}
    (pad "${via_num_right}" smd custom (at 4.775 ${-12.7 + row_offset_y} ${180 + p.r
        }) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${net_right}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))
    (pad "${socket_hole_num_right}" smd custom (at 5.5 ${-12.7 + row_offset_y
        } ${180 + p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_right).str
        }
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
      ) (width 0) (fill yes))
    ))

    ${"" /* Jumper Pads - Back Left */}
    (pad "${socket_hole_num_left}" smd custom (at -5.5 ${-12.7 + row_offset_y
        } ${p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_left).str
        }
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
      ) (width 0) (fill yes))
    ))

    (pad "${via_num_right}" smd custom (at -4.775 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${net_right}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))

    ${"" /* Jumper Pads - Back Right */}
    (pad "${via_num_left}" smd custom (at 4.775 ${-12.7 + row_offset_y} ${180 + p.r
        }) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${net_left}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))
    (pad "${socket_hole_num_right}" smd custom (at 5.5 ${-12.7 + row_offset_y
        } ${180 + p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_right).str
        }
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
      ) (width 0) (fill yes))
    ))
        `;

      // 0402 resistor pads (1.0 x 0.5mm body) - overlays jumper pads for optional JLCPCB assembly
      let socket_row_resistor_pads = `
    ${"" /* 0402 Resistor Pads - Front Left */}
    (pad "${socket_hole_num_left}" smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_left).str
        })
    (pad "${via_num_left}" smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "F.Cu" "F.Paste" "F.Mask") ${net_left})

    ${"" /* 0402 Resistor Pads - Front Right */}
    (pad "${via_num_right}" smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "F.Cu" "F.Paste" "F.Mask") ${net_right})
    (pad "${socket_hole_num_right}" smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_right).str
        })

    ${"" /* 0402 Resistor Pads - Back Left */}
    (pad "${socket_hole_num_left}" smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_left).str
        })
    (pad "${via_num_right}" smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "B.Cu" "B.Paste" "B.Mask") ${net_right})

    ${"" /* 0402 Resistor Pads - Back Right */}
    (pad "${via_num_left}" smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "B.Cu" "B.Paste" "B.Mask") ${net_left})
    (pad "${socket_hole_num_right}" smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.r
        }) (size 0.6 0.5) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_right).str
        })
        `;

      let socket_row = socket_row_base;
      if (p.reversible && (row_num < 4 || !p.only_required_jumpers)) {
        socket_row += socket_row_vias;
        if (p.use_rectangular_jumpers) {
          socket_row += socket_row_rectangular_jumpers;
        } else {
          socket_row += socket_row_chevron_jumpers;
        }
        if (p.include_resistor_pads) {
          socket_row += socket_row_resistor_pads;
        }
      }
      if (show_silk_labels == true) {
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == "F") {
          // Silkscreen labels - front
          if (
            row_num != 9 ||
            !p.include_extra_pins ||
            (p.include_extra_pins && invert_pins && !p.reversible) ||
            (p.include_extra_pins && !p.only_required_jumpers && p.reversible)
          ) {
            socket_row += `
    (fp_text user "${net_silk_front_left}" (at -${p.reversible && (row_num < 4 || !p.only_required_jumpers)
                ? net_silk_front_left.length > 2
                  ? 1.45
                  : 2.04
                : 4.47
              } ${-12.7 + row_offset_y} ${p.r}) (layer "F.SilkS")
      (effects ${get_font_str(false)})
    )
            `;
          }
          if (
            row_num != 9 ||
            !p.include_extra_pins ||
            (p.include_extra_pins && !invert_pins && !p.reversible) ||
            (p.include_extra_pins && !p.only_required_jumpers && p.reversible)
          ) {
            socket_row += `
    (fp_text user "${net_silk_front_right}" (at ${p.reversible && (row_num < 4 || !p.only_required_jumpers)
                ? net_silk_front_right.length > 2
                  ? 1.45
                  : 2.04
                : 4.47
              } ${-12.7 + row_offset_y} ${p.r}) (layer "F.SilkS")
      (effects ${get_font_str(false)})
    )
            `;
          }
        }
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == "B") {
          // Silkscreen labels - back
          if (
            row_num != 9 ||
            !p.include_extra_pins ||
            (p.include_extra_pins && !invert_pins && !p.reversible) ||
            (p.include_extra_pins && !p.only_required_jumpers && p.reversible)
          ) {
            socket_row += `
    (fp_text user "${net_silk_back_left}" (at ${p.reversible ? "-" : ""}${p.reversible && (row_num < 4 || !p.only_required_jumpers)
                ? net_silk_back_left.length > 2
                  ? 1.45
                  : 2.04
                : 4.47
              } ${-12.7 + row_offset_y} ${p.r}) (layer "B.SilkS")
      (effects ${get_font_str(false)} (justify mirror))
    )
            `;
          }
          if (
            row_num != 9 ||
            !p.include_extra_pins ||
            (p.include_extra_pins && invert_pins && !p.reversible) ||
            (p.include_extra_pins && !p.only_required_jumpers && p.reversible)
          ) {
            socket_row += `
    (fp_text user "${net_silk_back_right}" (at ${p.reversible ? "" : "-"}${p.reversible && (row_num < 4 || !p.only_required_jumpers)
                ? net_silk_back_right.length > 2
                  ? 1.45
                  : 2.04
                : 4.47
              } ${-12.7 + row_offset_y} ${p.r}) (layer "B.SilkS")
      (effects ${get_font_str(false)} (justify mirror))
    )
            `;
          }
        }
      }

      if (
        show_via_labels &&
        p.reversible &&
        (row_num < 4 || !p.only_required_jumpers)
      ) {
        socket_row += `
    ${"" /* Via Labels - Front */}
    (fp_text user "${via_label_left}" (at -3.262 ${-13.5 + row_offset_y} ${p.r
          }) (layer "F.Fab")
      (effects ${get_font_str(true)})
    )
    (fp_text user "${via_label_right}" (at 3.262 ${-13.5 + row_offset_y} ${p.r
          }) (layer "F.Fab")
      (effects ${get_font_str(true)})
    )

    ${"" /* Via Labels - Back */}
    (fp_text user "${via_label_left}" (at -3.262 ${-13.5 + row_offset_y} ${180 + p.r
          }) (layer "B.Fab")
      (effects ${get_font_str(true)} (justify mirror))
    )
    (fp_text user "${via_label_right}" (at 3.262 ${-13.5 + row_offset_y} ${180 + p.r
          }) (layer "B.Fab")
      (effects ${get_font_str(true)} (justify mirror))
    )
          `;
      }

      return socket_row;
    };
    const gen_socket_rows = (show_via_labels, show_silk_labels) => {
      const pin_names = [
        // The pin matrix below assumes PCB is mounted with the MCU
        // facing away from the PCB (reverse_mount = false) on the
        // Front side. It should be inverted for reverse_mount = true
        // or when mounted on teh Back
        ["P1", "RAW"],
        ["P0", "GND"],
        ["GND", "RST"],
        ["GND", "VCC"],
        ["P2", "P21"],
        ["P3", "P20"],
        ["P4", "P19"],
        ["P5", "P18"],
        ["P6", "P15"],
        ["P7", "P14"],
        ["P8", "P16"],
        ["P9", "P10"],
      ];

      let socket_rows = "";
      for (let i = 0; i < pin_names.length; i++) {
        let pin_name_left = pin_names[i][invert_pins ? 1 : 0];
        let pin_name_right = pin_names[i][invert_pins ? 0 : 1];

        const socket_row = gen_socket_row(
          i,
          pin_name_left,
          pin_name_right,
          show_via_labels,
          show_silk_labels
        );

        socket_rows += socket_row;
      }
      // Socket silkscreen
      // P1 / D1 / P0.06 is marked according to orientation
      if (show_silk_labels == true) {
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == "F") {
          socket_rows += `
    (fp_line (start 6.29 -14.03) (end 8.95 -14.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.29 16.57) (end 8.95 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 -14.03) (end -6.29 -14.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 16.57) (end -6.29 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start ${invert_pins ? "" : "-"}6.29 -11.43) (end ${invert_pins ? "" : "-"
            }8.95 -11.43) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
            `;
        }
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == "B") {
          socket_rows += `
    (fp_line (start -6.29 -14.03) (end -8.95 -14.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.29 16.57) (end -8.95 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 -14.03) (end 6.29 -14.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 16.57) (end 6.29 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start ${invert_pins ? (p.reversible ? "-" : "") : p.reversible ? "" : "-"
            }8.95 -11.43) (end ${invert_pins ? (p.reversible ? "-" : "") : p.reversible ? "" : "-"
            }6.29 -11.43) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
          `;
        }
      }
      return socket_rows;
    };

    const common_top = `
  (footprint "ceoloide:mcu_nice_nano"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -15 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects ${get_font_str(false)})
    )
    (attr exclude_from_pos_files exclude_from_bom)

    ${"" /* USB socket outline */}
    (fp_line (start 3.556 -18.034) (end 3.556 -16.51) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -16.51) (end -3.81 -18.034) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -18.034) (end 3.556 -18.034) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))


  ${"" /* Controller outline */}
    (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 -16.51) (end -8.89 16.57) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 -16.51) (end 8.89 16.57) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 16.57) (end 8.89 16.57) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `;

    const instructions = `
    (fp_text user "Back" (at -6.6 -15.8 ${p.r}) (layer "F.SilkS")
      (effects ${get_font_str(false)})
    )
    (fp_text user "Right" (at -6.6 -14.4 ${p.r}) (layer "F.SilkS")
      (effects ${get_font_str(false)})
    )
    (fp_text user "(M${!p.reverse_mount ? "↑" : "↓"})" (at 6.6 -15.1 ${p.r}) (layer "F.SilkS")
      (effects ${get_font_str(false)})
    )
    (fp_text user "Back" (at 6.6 -15.8 ${p.r}) (layer "B.SilkS")
      (effects ${get_font_str(false)} (justify mirror))
    )
    (fp_text user "Left" (at 6.6 -14.4 ${p.r}) (layer "B.SilkS")
      (effects ${get_font_str(false)} (justify mirror))
    )
    (fp_text user "(M${!p.reverse_mount ? "↑" : "↓"})" (at -6.6 -15.1 ${p.r}) (layer "B.SilkS")
      (effects ${get_font_str(false)} (justify mirror))
    )
    `;

    const socket_rows = gen_socket_rows(p.show_via_labels, p.show_silk_labels);
    const traces = gen_traces();
    const gnd_vias = gen_gnd_vias();
    const jumper_vias = gen_jumper_vias();

    const extra_pins = `
    (pad "25" thru_hole circle (at ${invert_pins ? "" : "-"}5.08 10.16 ${p.r
      }) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.P101})
    (pad "26" thru_hole circle (at ${invert_pins ? "" : "-"}2.54 10.16 ${p.r
      }) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.P102})
    (pad "27" thru_hole circle (at 0 10.16 ${p.r
      }) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.P107})
    `;
    const extra_pins_reversible = `
    (pad "28" thru_hole circle (at ${invert_pins ? "-" : ""}5.08 10.16 ${p.r
      }) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.P101})
    (pad "29" thru_hole circle (at ${invert_pins ? "-" : ""}2.54 10.16 ${p.r
      }) (size 1.7 1.7) (drill 0.85) (layers "*.Cu" "*.Mask") ${p.P102})
    `;

    const mcu_3dmodel = `
    (model ${p.mcu_3dmodel_filename}
      (offset (xyz ${p.mcu_3dmodel_xyz_offset[0]} ${p.mcu_3dmodel_xyz_offset[1]} ${p.mcu_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.mcu_3dmodel_xyz_scale[0]} ${p.mcu_3dmodel_xyz_scale[1]} ${p.mcu_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.mcu_3dmodel_xyz_rotation[0]} ${p.mcu_3dmodel_xyz_rotation[1]} ${p.mcu_3dmodel_xyz_rotation[2]}))
    )
    `;

    return `
    ${"" /* Controller*/}
    ${common_top}
    ${socket_rows}
    ${p.include_extra_pins &&
        (!p.reversible || (p.reversible && p.only_required_jumpers))
        ? extra_pins
        : ""
      }
    ${p.include_extra_pins && p.reversible && p.only_required_jumpers
        ? extra_pins_reversible
        : ""
      }
    ${p.reversible && p.show_instructions ? instructions : ""}
    ${p.mcu_3dmodel_filename ? mcu_3dmodel : ""}
  )

  ${"" /* Traces and vias */}
  ${p.reversible && p.include_traces ? traces : ""}
  ${p.reversible ? jumper_vias : ""}
  ${p.include_gnd_vias && p.reversible ? gnd_vias : ""}
    `;
  },
};
