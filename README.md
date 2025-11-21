# TEMPORAL

A 36-44 key split ergonomic keyboard with wireless support and encoder integration. TEMPORAL is inspired by [TEMPEST](https://github.com/thrly/tempest) by thrly, featuring a revised layout with configurable pinky columns and encoder thumb key options.

![Maintenance](https://img.shields.io/maintenance/yes/2025)
![License](https://img.shields.io/badge/License-CERN--OHL--P--2.0-blue)

## Design

- Five columns, three rows, four thumb keys per side
  - Optional snap-off extra pinky column for 36-44 key configurations
  - One thumb position can be either an encoder or standard switch
- Column stagger and splay on the pinky and ring columns
- EC12 rotary encoder support
- Powered by nice!nano or Pro Micro compatible microcontrollers
- Optional nice!view display
- Designed for wireless use with battery support
- Kailh Choc v1 low-profile switches with hotswap sockets
- Reversible PCB design
- Layout designed with [Ergogen](https://ergogen.ceoloide.com/) (see [config.yaml](./ergogen/config.yaml))
- PCB designed with [KiCad](https://www.kicad.org/) v9
- Simple 3D-printable cases for all key configurations

## Firmware

TEMPORAL is designed to be used with ZMK. [You can find the ZMK-config repository and keymap here.](https://github.com/curbol/temporal-zmk)

## Development

To generate PCBs and cases from the Ergogen design:

### Prerequisites

- Node.js and npm
- OpenSCAD (for case generation)
- KiCad 9 (for PCB editing and Gerber export)

### Setup

1. Install dependencies:

```bash
make deps
```

2. Generate PCBs and cases:

```bash
make gen
```

This will:

- Run Ergogen to generate PCB and case files
- Post-process PCBs (fix edge cuts, add ground planes)
- Configure KiCad project files with defaults from `config/kicad_defaults.yaml`
- Generate STL case files
- Export Gerbers for manufacturing

### Configuration

PCB defaults (trace widths, via sizes, clearances, net classes) are centralized in `config/kicad_defaults.yaml`. See `pcbs/README.md` for manufacturing specifications.

## Build Guide

See [docs/build-guide.md](/docs/build-guide.md) for assembly instructions and ordering information.

For a complete list of components needed, see [docs/bom.md](/docs/bom.md).

### Where to Buy Components

- [Typeractive](https://typeractive.xyz/) - nice!nano, nice!view, switches, sockets, encoders, and other components
- [KEEBD](https://keebd.com/) - Alternative source for keyboard components

## Keycaps

TEMPORAL uses Kailh Choc v1 low-profile switches. For keycaps, you can use:

- [KLP Lame Keycaps](https://github.com/braindefender/KLP-Lame-Keycaps/tree/master) - 3D printable keycap files designed for Choc switches

## Influences

TEMPORAL is inspired by and takes influence from:

- [TEMPEST](https://github.com/thrly/tempest) by thrly
- [KLOR](https://github.com/GEIGEIGEIST/KLOR) by GEIST
