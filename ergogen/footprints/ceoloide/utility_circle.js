// Custom utility_circle footprint for magnet placement guides
//
// Description:
//  Allows you to place circles on the PCB's Silkscreen layer,
//  and optionally make it reversible on the opposite side.
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    layer: default is 'SilkS' (Silkscreen layer)
//      the layer where the circle will be placed
//    reversible: default is false
//      adds a mirrored circle on the opposite side of the board
//    diameter: default is 60
//      the diameter of the circle in mm
//    width: default is 0.15
//      set the width of the circle stroke
//    style: default is "solid"
//      stroke style: solid, dash, dot, dash_dot, dash_dot_dot, or default

module.exports = {
  params: {
    designator: "CIRCLE",
    side: "F",
    layer: "SilkS",
    reversible: false,
    diameter: 60,
    width: 0.15,
    style: "solid",
  },
  body: (p) => {
    const generate_circle = (side, layer, diameter, width, style) => {
      const radius = diameter / 2;
      const gr_circle = `
    (gr_circle
      (center ${p.x} ${p.y})
      (end ${p.x + radius} ${p.y})
      (stroke (width ${width}) (type ${style}))
      (layer "${side}.${layer}")
    )
        `;
      return gr_circle;
    };

    let final = "";
    if (p.reversible) {
      final += generate_circle("F", p.layer, p.diameter, p.width, p.style);
      final += generate_circle("B", p.layer, p.diameter, p.width, p.style);
    } else {
      final += generate_circle(p.side, p.layer, p.diameter, p.width, p.style);
    }
    return final;
  },
};
