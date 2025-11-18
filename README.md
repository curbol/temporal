# TEMPORAL

**WORK IN PROGRESS** (Files and images are not updated yet)

Preview design:
<img width="1649" height="1067" alt="image" src="https://github.com/user-attachments/assets/b65a0838-cac9-4117-b53e-7bb658d3d93b" />



A 36-42 key split ergonomic keyboard based on [TEMPEST](https://github.com/thrly/tempest) by thrly. TEMPORAL features a revised layout with an additional snap-off pinky key and an additional thumb key with encoder support.

![Maintenance](https://img.shields.io/maintenance/yes/2025) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/thrly/tempest)
![Tempest](images/tempest.jpg)

## Design

- Five columns, three rows, four thumb keys per side
  - Optional snap-off extra pinky column for 38-42 key configurations
  - One thumb position can be either an encoder or standard switch
- Column stagger and splay on the pinky and ring columns
- EC12 Encoders
- Powered by nice!nano / pro micro microcontroller
- Optional nice!view display
- Designed for wireless use + battery
- Low profile v1 Choc switches + hotswap sockets
- Reversible PCB
- Uses some components (JST plug, power switch, reset) from the Typeractive Corne design
- Layout designed with [Ergogen](https://ergogen.ceoloide.com/) (see [config.yaml](./ergogen/config.yaml))
- PCB designed with [KiCad](https://www.kicad.org/) (v 9)
- Simple 3D-printable case supporting all configurations

![Tempest](images/tempest-half.jpg)

## Firmware

TEMPORAL is designed to be used with ZMK. [You can find the ZMK-config repository and keymap here.](https://github.com/curbol/temporal-zmk)

## Development

To generate PCBs and cases from the Ergogen design:

### Prerequisites

- Node.js and npm
- Python 3
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

[Details on the build and case can be found here.](/docs/build-guide.md)
![TEMPEST pcb](images/tempest-pcb.png)

![Tempest](images/tempest-alt.jpg)
![Tempest](images/tempest-edge.jpg)
![Tempest](images/tempest-side.jpg)

## Influences

TEMPORAL is inspired by and takes influence from:

- [TEMPEST](https://github.com/thrly/tempest) by thrly
- [KLOR](https://github.com/GEIGEIGEIST/KLOR) by GEIST
