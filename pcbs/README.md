# PCBs

This directory contains the KiCad PCB design files for TEMPORAL.

## Files

- `temporal/temporal.kicad_pcb` - KiCad PCB design file
- `temporal/temporal.kicad_pro` - KiCad project file

## Manufacturing Specifications

These specifications are configured in [`config/kicad_defaults.yaml`](/config/kicad_defaults.yaml) and automatically applied during the build process.

### PCB Requirements

- **Material:** FR-4, 1.6mm thickness
- **Surface finish:** LeadFree HASL recommended
- **Minimum clearance:** 0.2mm

### Vias

- **Outer diameter:** 0.6mm
- **Drill size:** 0.3mm

### Trace Widths

| Net Class | Width | Purpose |
|-----------|-------|---------|
| Signal | 0.25mm | General signal traces |
| Power | 0.375mm | VCC/GND power distribution |
| Battery | 0.5mm | Battery power lines |

## Ordering

Ready-to-manufacture Gerber files are available at [`gerbers/temporal.zip`](/gerbers/temporal.zip).

Compatible with JLCPCB, PCBWay, and other PCB manufacturers.
