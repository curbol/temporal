// thrly: edited power labels to +/-

// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @infused-kim + @ceoloide improvements
//
// Description:
//  SMD side-operated on-off switch, compatible with Alps SSSS811101 as sold on
//  Typeractive.xyz and LCSC. These switches are shorter than the height of hotswap sockets,
//  so they can be mounted on the same side.
//
//  Should be compatible with:
//    - G-Switch MK-12C02-G015 (untested)
//    - PCM12SMTR (untested)
//
// Datasheet:
//   https://cdn.shopify.com/s/files/1/0618/5674/3655/files/ALPS-SSSS811101.pdf?v=1670451309
//
// Nets:
//    from: corresponds to pin 1 on the Front and 3 on the back
//    to: corresponds to pin 2 on both sides
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F (Front)
//      or B (Back)
//    reversible: default is false
//      if true, it will include pads on both Front and Back to make the footprint reversible
//    invert_behavior: default is false
//      if true, pin 3 will connect to the "from" net, and if false it will connect to pin 1,
//      effectively inverting the behavior of the switch.
//    include_silkscreen: default is true
//      if true it will include silkscreen markings, which is recommended to know which side
//      connects Bat+ to RAW.
//    include_courtyard: default is false
//      if true it will include the courtyard around the component
//    include_traces_vias: default is false
//      if true it will include traces and vias when reversible is true to connect front and
//      back pads for easier routing
//    via_size: default is 0.6
//      allows to define the size of the via. Not recommended below 0.56 (JLCPCB minimum),
//      or above 0.8 (KiCad default)
//    via_drill: default is 0.3
//      allows to define the size of the drill. Not recommended below 0.3 (JLCPCB minimum),
//      or above 0.4 (KiCad default)
//    trace_width: default is 0.25mm
//      allows to override the trace width that connects the pads to vias
//    switch_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    switch_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    switch_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    switch_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
//
// @ceoloide's improvements:
//  - Add ability to set text on both sides
//  - Add ability to adjust font thickness and size
//  - Add ability to invert switch behavior / pin connections
//  - Invert behavior on opposite layer to maintain consistency
//  - Add on/off silkscreen to aid operation
//  - Upgrade to KiCad 8

module.exports = {
  params: {
    designator: "PWR",
    side: "F",
    reversible: false,
    invert_behavior: true,
    include_silkscreen: true,
    include_courtyard: false,
    include_traces_vias: false,
    via_size: 0.6,
    via_drill: 0.3,
    trace_width: 0.375,
    switch_3dmodel_filename: "",
    switch_3dmodel_xyz_offset: [0, 0, 0],
    switch_3dmodel_xyz_rotation: [0, 0, 0],
    switch_3dmodel_xyz_scale: [1, 1, 1],
    from: { type: "net", value: "BAT_P" },
    to: { type: "net", value: "RAW" },
  },
  body: (p) => {
    const common_start = `
  (footprint "ceoloide:power_switch_smd_side"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at -3.6 0 ${-90 + p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (attr smd)
    `;
    const silkscreen_front = `
    (fp_text user "+" (at 0 ${p.invert_behavior ? "-" : ""}4.2 ${p.r
      }) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text user "-" (at 0 ${p.invert_behavior ? "" : "-"}4.2 ${p.r
      }) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_line (start 0.415 -3.45) (end -0.375 -3.45) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.375 3.45) (end 0.415 3.45) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.425 1.6) (end -1.425 -0.1) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.425 2.85) (end 1.425 -2.85) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.425 -1.4) (end -1.425 -1.6) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    `;
    const silkscreen_back = `
    (fp_text user "${p.ref}" (at -3.5 0 ${90 + p.r}) (layer "B.SilkS") ${p.ref_hide
      }
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text user "+" (at 0 ${p.invert_behavior ? "-" : ""}4.2 ${p.r
      }) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text user "-" (at 0 ${p.invert_behavior ? "" : "-"}4.2 ${p.r
      }) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_line (start -1.425 1.4) (end -1.425 1.6) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 0.415 3.45) (end -0.375 3.45) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -0.375 -3.45) (end 0.415 -3.45) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.425 -1.6) (end -1.425 0.1) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.425 -2.85) (end 1.425 2.85) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    `;
    const courtyard_front = `
    (fp_line (start 1.795 4.4) (end -2.755 4.4) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 1.65) (end 1.795 4.4) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 3.095 1.65) (end 1.795 1.65) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 3.095 -1.65) (end 3.095 1.65) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 -1.65) (end 3.095 -1.65) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 -4.4) (end 1.795 -1.65) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -2.755 -4.4) (end 1.795 -4.4) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -2.755 4.4) (end -2.755 -4.4) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    `;
    const courtyard_back = `
    (fp_line (start -2.755 -4.4) (end -2.755 4.4) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 3.095 1.65) (end 3.095 -1.65) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 1.65) (end 3.095 1.65) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 -4.4) (end -2.755 -4.4) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 -1.65) (end 1.795 -4.4) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 3.095 -1.65) (end 1.795 -1.65) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start 1.795 4.4) (end 1.795 1.65) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -2.755 4.4) (end 1.795 4.4) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    `;

    const pads_front = `
    (fp_line (start -1.305 -3.35) (end -1.305 3.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.295 -3.35) (end -1.305 -3.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.295 3.35) (end 1.295 -3.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -1.305 3.35) (end 1.295 3.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.595 0.1) (end 1.295 0.1) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.645 0.15) (end 2.595 0.1) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.845 0.35) (end 2.645 0.15) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.845 1.2) (end 2.845 0.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.645 1.4) (end 2.845 1.2) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.345 1.4) (end 2.645 1.4) (layer "F.Fab") (stroke (width 0.1) (type solid)))
    (pad "" smd rect (at 1.125 -3.65 ${90 + p.r
      }) (size 1 0.8) (layers "F.Cu" "F.Paste" "F.Mask"))
    (pad "" smd rect (at -1.085 -3.65 ${90 + p.r
      }) (size 1 0.8) (layers "F.Cu" "F.Paste" "F.Mask"))
    (pad "" smd rect (at -1.085 3.65 ${90 + p.r
      }) (size 1 0.8) (layers "F.Cu" "F.Paste" "F.Mask"))
    (pad "" smd rect (at 1.125 3.65 ${90 + p.r
      }) (size 1 0.8) (layers "F.Cu" "F.Paste" "F.Mask"))
    (pad "1" smd rect (at -1.735 2.25 ${90 + p.r
      }) (size 0.7 1.5) (layers "F.Cu" "F.Paste" "F.Mask") ${p.invert_behavior ? "" : p.from.str
      })
    (pad "2" smd rect (at -1.735 -0.75 ${90 + p.r
      }) (size 0.7 1.5) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
    (pad "3" smd rect (at -1.735 -2.25 ${90 + p.r
      }) (size 0.7 1.5) (layers "F.Cu" "F.Paste" "F.Mask") ${p.invert_behavior ? p.from.str : ""
      })
    `;
    const pads_back = `
    (fp_line (start 2.595 -0.1) (end 1.295 -0.1) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -1.305 3.35) (end -1.305 -3.35) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.645 -0.15) (end 2.595 -0.1) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.845 -1.2) (end 2.845 -0.35) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.345 -1.4) (end 2.645 -1.4) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.845 -0.35) (end 2.645 -0.15) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 2.645 -1.4) (end 2.845 -1.2) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.295 -3.35) (end 1.295 3.35) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start 1.295 3.35) (end -1.305 3.35) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (fp_line (start -1.305 -3.35) (end 1.295 -3.35) (layer "B.Fab") (stroke (width 0.1) (type solid)))
    (pad "" smd rect (at -1.085 -3.65 ${270 + p.r
      }) (size 1 0.8) (layers "B.Cu" "B.Paste" "B.Mask"))
    (pad "" smd rect (at 1.125 -3.65 ${270 + p.r
      }) (size 1 0.8) (layers "B.Cu" "B.Paste" "B.Mask"))
    (pad "" smd rect (at -1.085 3.65 ${270 + p.r
      }) (size 1 0.8) (layers "B.Cu" "B.Paste" "B.Mask"))
    (pad "" smd rect (at 1.125 3.65 ${270 + p.r
      }) (size 1 0.8) (layers "B.Cu" "B.Paste" "B.Mask"))
    (pad "1" smd rect (at -1.735 -2.25 ${270 + p.r
      }) (size 0.7 1.5) (layers "B.Cu" "B.Paste" "B.Mask") ${p.invert_behavior ? p.from.str : ""
      })
    (pad "2" smd rect (at -1.735 0.75 ${270 + p.r
      }) (size 0.7 1.5) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})
    (pad "3" smd rect (at -1.735 2.25 ${270 + p.r
      }) (size 0.7 1.5) (layers "B.Cu" "B.Paste" "B.Mask") ${p.invert_behavior ? "" : p.from.str
      })
    `;
    const common_end = `
    (pad "" np_thru_hole circle (at 0.025 -1.5 ${90 + p.r
      }) (size 0.9 0.9) (drill 0.9) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at 0.025 1.5 ${90 + p.r
      }) (size 0.9 0.9) (drill 0.9) (layers "*.Cu" "*.Mask"))
  )
    `;

    const switch_3dmodel = `
    (model ${p.switch_3dmodel_filename}
      (offset (xyz ${p.switch_3dmodel_xyz_offset[0]} ${p.switch_3dmodel_xyz_offset[1]} ${p.switch_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.switch_3dmodel_xyz_scale[0]} ${p.switch_3dmodel_xyz_scale[1]} ${p.switch_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.switch_3dmodel_xyz_rotation[0]} ${p.switch_3dmodel_xyz_rotation[1]} ${p.switch_3dmodel_xyz_rotation[2]}))
    )
    `;

    // Vias and traces to connect front and back pads for reversible footprints
    // Using 45° transitions for cleaner routing
    const reversible_traces_vias = `
    ${''/* Connect "to" pad (RAW) - center position with 45° routing */}
    (via (at ${p.eaxy(0, 0)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.to.index}))
    ${''/* Front RAW pad to via */}
    (segment (start ${p.eaxy(-1.735, -0.75)}) (end ${p.eaxy(-1.335, -0.35)}) (width 0.5) (layer "F.Cu") (net ${p.to.index}))
    (segment (start ${p.eaxy(-1.335, -0.35)}) (end ${p.eaxy(-0.35, -0.35)}) (width 0.5) (layer "F.Cu") (net ${p.to.index}))
    (segment (start ${p.eaxy(-0.35, -0.35)}) (end ${p.eaxy(0, 0)}) (width 0.5) (layer "F.Cu") (net ${p.to.index}))
    ${''/* Back RAW pad to via */}
    (segment (start ${p.eaxy(-1.735, 0.75)}) (end ${p.eaxy(-1.335, 0.35)}) (width 0.5) (layer "B.Cu") (net ${p.to.index}))
    (segment (start ${p.eaxy(-1.335, 0.35)}) (end ${p.eaxy(-0.35, 0.35)}) (width 0.5) (layer "B.Cu") (net ${p.to.index}))
    (segment (start ${p.eaxy(-0.35, 0.35)}) (end ${p.eaxy(0, 0)}) (width 0.5) (layer "B.Cu") (net ${p.to.index}))

    ${''/* Connect "from" pads (BAT_P) - only create vias/traces for the position that has active pads based on invert_behavior */}
    ${p.invert_behavior ? `
    ${''/* Bottom position active when invert_behavior is true - 45° routing */}
    (via (at ${p.eaxy(0, -2.65)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.from.index}))
    ${''/* Front BAT_P pad to via */}
    (segment (start ${p.eaxy(-1.735, -2.25)}) (end ${p.eaxy(-1.335, -2.65)}) (width 0.5) (layer "F.Cu") (net ${p.from.index}))
    (segment (start ${p.eaxy(-1.335, -2.65)}) (end ${p.eaxy(0, -2.65)}) (width 0.5) (layer "F.Cu") (net ${p.from.index}))
    ${''/* Back BAT_P pad to via */}
    (segment (start ${p.eaxy(-1.735, -2.25)}) (end ${p.eaxy(-1.335, -2.65)}) (width 0.5) (layer "B.Cu") (net ${p.from.index}))
    (segment (start ${p.eaxy(-1.335, -2.65)}) (end ${p.eaxy(0, -2.65)}) (width 0.5) (layer "B.Cu") (net ${p.from.index}))
    ` : `
    ${''/* Top position active when invert_behavior is false - 45° routing */}
    (via (at ${p.eaxy(0, 2.65)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.from.index}))
    ${''/* Front BAT_P pad to via */}
    (segment (start ${p.eaxy(-1.735, 2.25)}) (end ${p.eaxy(-1.335, 2.65)}) (width 0.5) (layer "F.Cu") (net ${p.from.index}))
    (segment (start ${p.eaxy(-1.335, 2.65)}) (end ${p.eaxy(0, 2.65)}) (width 0.5) (layer "F.Cu") (net ${p.from.index}))
    ${''/* Back BAT_P pad to via */}
    (segment (start ${p.eaxy(-1.735, 2.25)}) (end ${p.eaxy(-1.335, 2.65)}) (width 0.5) (layer "B.Cu") (net ${p.from.index}))
    (segment (start ${p.eaxy(-1.335, 2.65)}) (end ${p.eaxy(0, 2.65)}) (width 0.5) (layer "B.Cu") (net ${p.from.index}))
    `}
    `;

    let final = common_start;
    if (p.side == "F" || p.reversible) {
      final += pads_front;
      if (p.include_silkscreen) {
        final += silkscreen_front;
      }
      if (p.include_courtyard) {
        final += courtyard_front;
      }
    }
    if (p.side == "B" || p.reversible) {
      final += pads_back;
      if (p.include_silkscreen) {
        final += silkscreen_back;
      }
      if (p.include_courtyard) {
        final += courtyard_back;
      }
    }

    if (p.switch_3dmodel_filename) {
      final += switch_3dmodel;
    }

    final += common_end;

    if (p.reversible && p.include_traces_vias) {
      final += reversible_traces_vias;
    }

    return final;
  },
};
