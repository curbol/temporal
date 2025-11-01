// Custom solar_system footprint for decorative backplate graphic
//
// Description:
//  Creates a solar system diagram with sun, orbital rings, and planets
//  positioned at different angles. Great for magnetic attachment reference.
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint, either F or B
//    layer: default is 'SilkS' (Silkscreen layer)
//      the layer where the graphic will be placed
//    reversible: default is true
//      adds the graphic on both sides of the board
//    diameter: default is 60
//      outer diameter in mm (Neptune's orbit)
//    planet_scale: default is 1.0
//      scale factor for all celestial body sizes
//    line_width: default is 0.15
//      width of orbital ring lines
//    orbit_style: default is "dot"
//      stroke style for orbits: solid, dash, dot, dash_dot, dash_dot_dot, or default

module.exports = {
  params: {
    designator: "SOLAR",
    side: "F",
    layer: "SilkS",
    reversible: true,
    diameter: 60,
    planet_scale: 1.0,
    line_width: 0.15,
    orbit_style: "dot",
  },
  body: (p) => {
    const outer_radius = p.diameter / 2;

    // Planet data: [name, relative_orbit (0-1), angle_degrees, diameter_mm]
    const planets = [
      ["Mercury", 0.167, 45, 0.4],
      ["Venus", 0.267, 135, 0.75],
      ["Earth", 0.4, 270, 0.85],
      ["Mars", 0.533, 0, 0.55],
      ["Jupiter", 0.667, 180, 2.0],
      ["Saturn", 0.8, 90, 1.7],
      ["Uranus", 0.9, 225, 1.3],
      ["Neptune", 1.0, 315, 1.1],
    ];

    const sun_diameter = 5.0 * p.planet_scale;

    const generate_circle = (side, layer, x, y, diameter, style, width, fill = 'none') => {
      const radius = diameter / 2;
      return `
    (fp_circle
      (center ${x} ${y})
      (end ${x + radius} ${y})
      (stroke (width ${width}) (type ${style}))
      (fill ${fill})
      (layer "${side}.${layer}")
    )`;
    };

    const generate_system = (side) => {
      let result = "";

      // Draw orbital rings
      planets.forEach(([name, orbit, angle, planet_dia]) => {
        const orbit_radius = outer_radius * orbit;
        result += generate_circle(side, p.layer, 0, 0, orbit_radius * 2, p.orbit_style, p.line_width, 'none');
      });

      // Draw sun
      result += generate_circle(side, p.layer, 0, 0, sun_diameter, "solid", p.line_width, 'solid');

      // Draw planets
      planets.forEach(([name, orbit, angle, planet_dia]) => {
        const orbit_radius = outer_radius * orbit;
        const scaled_planet_dia = planet_dia * p.planet_scale;
        const angle_rad = (angle * Math.PI) / 180;
        // Round to avoid floating-point precision errors
        const planet_x = Math.round(orbit_radius * Math.cos(angle_rad) * 1000000) / 1000000;
        const planet_y = Math.round(orbit_radius * Math.sin(angle_rad) * 1000000) / 1000000;
        result += generate_circle(side, p.layer, planet_x, planet_y, scaled_planet_dia, "solid", p.line_width, 'solid');
      });

      return result;
    };

    let final = `
  (footprint "solar_system" (layer "F.Cu")
    ${p.at}
  `;

    if (p.reversible) {
      final += generate_system("F");
      final += generate_system("B");
    } else {
      final += generate_system(p.side);
    }

    final += "\n  )";
    return final;
  },
};
