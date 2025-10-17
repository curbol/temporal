# TEMPORAL

WORK IN PROGRESS (Files and images are not update yet)

This is a preview of the temporal design:
<img width="1280" height="821" alt="image" src="https://github.com/user-attachments/assets/ba894443-c53b-4ec9-a720-97510a52d473" />

a 36/40-key (+ encoders) split ergonomic keyboard

![Maintenance](https://img.shields.io/maintenance/yes/2025) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/thrly/tempest)
![Tempest](images/tempest.jpg)

## Design

- Five columns, three rows, three thumb keys
  - Optional extra keys for 36 or 40-key configuration (snap-off pcb)
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
- Simple 3D-printable case for both 36 and 38-key layouts

![Tempest](images/tempest-half.jpg)

## Firmware

TEMPORAL was designed to be used with ZMK. [You can find the ZMK-config repository and a keymap here.](https://github.com/thrly/tempest-zmk)

## Build Guide

[Details on the build and case can be found here.](/build-guide.md)
![TEMPEST pcb](images/tempest-pcb.png)

![Tempest](images/tempest-alt.jpg)
![Tempest](images/tempest-edge.jpg)
![Tempest](images/tempest-side.jpg)

## Influences

TEMPORAL is inspired by and takes influence from:

- [TEMPEST](https://github.com/thrly/tempest) by thrly
- [KLOR](https://github.com/GEIGEIGEIST/KLOR) by GEIST
