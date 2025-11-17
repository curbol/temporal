# PCBs

This directory contains the KiCad PCB design files for the Temporal keyboard.

## Files

- `temporal/` - Main KiCad project directory
  - `temporal.kicad_pcb` - PCB layout
  - `temporal.kicad_pro` - KiCad project file
  - `temporal.kicad_prl` - Project local settings

## Manufacturing Specifications

### Vias

- **Outer diameter:** 0.6mm
- **Drill size:** 0.3mm

### Trace Widths

| Type | Width |
|------|-------|
| Signals | 0.25mm |
| Power (VCC/GND) | 0.375mm |
| Battery | 0.5mm |

### Clearance

- **Minimum clearance:** 0.2mm

## Notes

These specifications are suitable for most PCB manufacturers. If you encounter manufacturing issues, consult with your fabrication house as they may have different minimum capabilities.
