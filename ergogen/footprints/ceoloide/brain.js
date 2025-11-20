// Brain silkscreen artwork
//
// Description:
//  Converted from art/brain.svg using svg2mod
//  Places brain graphic on the PCB silkscreen layer
//
// Params:
//    side: default is F for Front
//      the side on which to place the footprint, either F or B
//    reversible: default is false
//      if true, adds mirrored version on opposite side
//    add_keepout: default is false
//      if true, adds keepout zone to prevent copper pour over artwork

module.exports = {
  params: {
    designator: "G",
    side: "F",
    reversible: false,
    add_keepout: false,
  },
  body: (p) => {
    // Simple UUID generator for keepout zones
    const generate_uuid = (seed) => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      const hex = Math.abs(hash).toString(16).padStart(32, '0');
      return `${hex.substr(0, 8)}-${hex.substr(4, 4)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 12)}`;
    };

    // Parse position and rotation from p.at string
    const parseAt = (at_str) => {
      const match = at_str.match(/\(at\s+([-\d.]+)\s+([-\d.]+)(?:\s+([-\d.]+))?\)/);
      if (!match) return { x: 0, y: 0, r: 0 };
      return {
        x: parseFloat(match[1]),
        y: parseFloat(match[2]),
        r: match[3] ? parseFloat(match[3]) : 0
      };
    };

    // Transform polygon coordinates to absolute board coordinates
    // Zones always use absolute coordinates, even when embedded in footprints
    const transformPolygon = (polygon_str, x, y, r) => {
      const cos_r = Math.cos(r * Math.PI / 180);
      const sin_r = Math.sin(r * Math.PI / 180);

      return polygon_str.replace(/\(xy\s+([-\d.]+)\s+([-\d.]+)\)/g, (match, px, py) => {
        const fpx = parseFloat(px);
        const fpy = parseFloat(py);

        // Apply rotation then translation
        const rx = fpx * cos_r - fpy * sin_r + x;
        const ry = fpx * sin_r + fpy * cos_r + y;

        return `(xy ${rx} ${ry})`;
      });
    };

    const at = parseAt(p.at);
    let output = '';

    // Add artwork polygons
    output += `
    (fp_poly
      (pts
        (xy 72.44938685533262 60.52280914709645)
      (xy 72.43100499514188 60.52037124229216)
      )
      (layer ${p.side}.SilkS)
      (width 0.15)
    )
`;
    output += `
    (fp_poly
      (pts
        (xy 84.18943932553161 23.411269533541955)
      (xy 84.19303492681628 23.403560735081683)
      )
      (layer ${p.side}.SilkS)
      (width 0.15)
    )
`;
    output += `
    (fp_poly
      (pts
        (xy 84.1873549189898 23.954821584974724)
      (xy 84.1909765753562 23.94714325607358)
      )
      (layer ${p.side}.SilkS)
      (width 0.15)
    )
`;

    // Add mirrored version on opposite side if reversible
    if (p.reversible) {
      output += `
    (fp_poly
      (pts
        (xy -72.44938685533262 60.52280914709645)
        (xy -72.43100499514188 60.52037124229216)
      )
      (layer ${p.side === 'F' ? 'B' : 'F'}.SilkS)
      (width 0.15)
    )
`;
      output += `
    (fp_poly
      (pts
        (xy -84.18943932553161 23.411269533541955)
        (xy -84.19303492681628 23.403560735081683)
      )
      (layer ${p.side === 'F' ? 'B' : 'F'}.SilkS)
      (width 0.15)
    )
`;
      output += `
    (fp_poly
      (pts
        (xy -84.1873549189898 23.954821584974724)
        (xy -84.1909765753562 23.94714325607358)
      )
      (layer ${p.side === 'F' ? 'B' : 'F'}.SilkS)
      (width 0.15)
    )
`;
    }

    // Add keepout zone if requested
    if (p.add_keepout) {
      const uuid = generate_uuid(`brain_keepout_${p.at}_${Date.now()}`);
      const polygonData = `(xy 72.44938685533262 60.52280914709645)
        (xy 72.43100499514188 60.52037124229216)`;

      output += `
    (zone
      (net 0)
      (net_name "")
      (layer "F.Cu")
      (uuid "${uuid}")
      (name "Brain Artwork Keepout")
      (hatch edge 0.508)
      (connect_pads
        (clearance 0)
      )
      (min_thickness 0.254)
      (filled_areas_thickness no)
      (keepout
        (tracks not_allowed)
        (vias not_allowed)
        (pads not_allowed)
        (copperpour not_allowed)
        (footprints allowed)
      )
      (fill
        (thermal_gap 0.508)
        (thermal_bridge_width 0.508)
      )
      (polygon
        (pts
          ${transformPolygon(polygonData, at.x, at.y, at.r)}
        )
      )
    )
`;
    }

    return output;
  }
};
