# Build Guide

The TEMPORAL build process is straightforward and follows similar steps to [Typeractive's Corne wireless build guide](https://docs.typeractive.xyz/build-guides/corne-wireless), which provides excellent reference documentation.

## Key Configuration

Before starting your build, decide on your key configuration (36, 38, 40, 42, or 44 keys). The outer pinky columns can be snapped off the PCB if not needed.

> [!WARNING]
> When removing keys, the break-off points may be sharp - file or sand them smooth. PCB dust is toxic, so wear a mask and work in a well-ventilated area or outside.

> [!IMPORTANT]
> Microcontroller should be placed **facing DOWN** (i.e. facing the board).

> [!NOTE]
> The microcontroller pin holes on the board have been narrowed (to 0.85mm) to enable the use of no-solder spring headers (MAC8 XB-3-5, as found from [Typeractive](https://typeractive.xyz/products/no-solder-spring-headers?variant=47196312502503)). These headers will fit the nice!nano, but other Pro Micro controllers may have pin holes that are too wide for these spring headers.

> [!IMPORTANT]
> Ensure that you solder the jumper pads for microcontroller, display, and battery plug closed **on the BACK side of the board** (i.e. the same side you're soldering your hotswap switch plugs and diodes).

## Case

3D-printable case files are included in the [`cases/`](/cases/) directory. Cases are available for all key configurations (36, 38, 40, 42, 44).

### Printing Recommendations

- Material: Matte PLA
- Layer height: 0.12mm
- Infill: Not critical (walls are thin)

> [!TIP]
> Alternatively, use the Gerber files in [`gerbers/`](/gerbers/) to order FR-4 switch plates along with your PCB. Files are provided for top plates, back plates, and MCU covers for all configurations.

## Ordering the PCB

Use [`gerbers/temporal.zip`](/gerbers/temporal.zip) for PCB fabrication with services like JLCPCB or PCBWay.

### Recommended Fabrication Options

- Material: FR-4, 1.6mm thickness
- Surface finish: LeadFree HASL
- See [`pcbs/README.md`](/pcbs/README.md) for detailed manufacturing specifications

The KiCad PCB source files are located at [`pcbs/temporal/temporal.kicad_pcb`](/pcbs/temporal/temporal.kicad_pcb).

## Development

For developers wanting to modify the design, see the main [README.md](../README.md#development) for instructions on using Ergogen and the build system.

> [!NOTE]
> Ergogen is used primarily as a layout tool for key positions and wiring nets. Some footprints (MCU, switches, connectors) may have been manually adjusted in KiCad, so the Ergogen output may differ slightly from the final PCB.
