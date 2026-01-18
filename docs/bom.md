# Bill of Materials (BOM)

This is the complete list of components needed to build one Temporal keyboard (both halves).

## Required Components

### Electronics

| Component | Quantity | Notes | Source |
|-----------|----------|-------|--------|
| nice!nano v2.0 | 2 | Wireless microcontroller | [Typeractive](https://typeractive.xyz/) |
| nice!view | 2 | Optional display | [Typeractive](https://typeractive.xyz/) |
| Kailh Choc Hotswap Sockets | 36-42 | Optional - allows switch swapping without desoldering | [Typeractive](https://typeractive.xyz/) |
| EZ-Solder Machine Sockets and Headers | 2 sets | For nice!nano installation | [Typeractive](https://typeractive.xyz/) |
| SMD Diodes (1N4148W) | 36-42 | One per switch, depends on configuration (not needed if using JLCPCB assembly) | [Typeractive](https://typeractive.xyz/) |
| ALPS EC11/EC12 Rotary Encoder | 0-2 | Optional, for thumb key encoder positions | [Typeractive](https://typeractive.xyz/) |
| Low Profile Knurled Encoder Knob | 0-2 | If using encoders | [Typeractive](https://typeractive.xyz/) |
| Lithium Battery 110mAh | 2 | PH 2.0mm connector (or similar capacity) | [Typeractive](https://typeractive.xyz/) |
| Battery Jack (JST PH 2.0mm) | 2 | For battery connection | [Typeractive](https://typeractive.xyz/) |
| Power Switch (MSK12C02) | 2 | Power on/off switch | [Typeractive](https://typeractive.xyz/) |
| Reset Button (3x6x4.3mm) | 2 | SMD tactile switch | [Typeractive](https://typeractive.xyz/) |

- Encoders are optional. You can use regular switches in the encoder positions if you prefer.
- Hotswap sockets are optional. You can solder switches directly to the PCB for a permanent installation.

### Hardware

| Component | Quantity | Notes | Source |
|-----------|-------------------|-------|--------|
| M2 Heat Set Inserts | 10 | 3mm OD × 2mm height (3mm height also works) | [KEEBD](https://keebd.com/) |
| M2 Screws (4mm length) | 18 | Mix of wafer head for flat profile and others for small footprint | Hardware store |

- Try to get M2 inserts with 3mm outer diameter and 2mm height. 3mm height will also work. Avoid inserts with 3.2mm+ outer diameter as they may not fit properly.

### Switches & Keycaps

| Component | Quantity | Notes |
|-----------|----------|-------|
| Choc v1 Switches | 36-42 | Low-profile switches, depends on configuration |
| Choc v1 Keycaps | 36-42 | Compatible with Choc switches |

I recommend using sculpted keycaps as it significantly improves the feel, but ultimately it's personal preference.

**[KLP Lame Keycaps](https://github.com/braindefender/KLP-Lame-Keycaps)** - 3D printable sculpted keycaps designed for Choc switches. If ordering from a printing service, here are the quantities needed for a full Temporal build:

| Part | Quantity | Contents |
|------|----------|----------|
| Saddle part 1 | 1 | 6 tilted, 3 saddle |
| Saddle part 2 | 2 | 4 tilted, 4 saddle, 1 homing |
| Saddle part 3 | 1 | 9 tilted |
| Thumbs | 1 | 9 thumbs |

**Totals:** Tilted: 23, Saddle: 11, Homing: 2, Thumb: 12-15 (depending on encoders)

### PCBs & Cases

| Component | Quantity | Notes |
|-----------|----------|-------|
| Temporal PCB | 2 | Order using gerbers/temporal.zip |
| 3D Printed Case (Left) | 1 | Choose your key configuration (38/42) |
| 3D Printed Case (Right) | 1 | Choose your key configuration (38/42) |
| MCU Cover | 2 | Optional, protects the microcontroller |

Use [`gerbers/temporal/temporal.zip`](/gerbers/temporal/temporal.zip) for PCB fabrication with services like JLCPCB or PCBWay.

- Material: FR-4, 1.6mm thickness
- Surface finish: LeadFree HASL
- See [`pcbs/README.md`](/pcbs/README.md) for detailed manufacturing specifications

3D-printable case files are included in the [`cases/`](/cases/) directory. Cases are available for 38 and 42 key configurations, with optional kickstand variants for tenting.

**For home 3D printing:**

- Material: Matte PLA
- Layer height: 0.12mm
- Infill: Not critical (walls are thin)

**For JLC 3D printing service:**

- 3D Technology: MJF (Nylon)
- Material: PA11-HP Nylon (verified to work well for cases and keycaps)

> Note: Other materials would likely work well also

> Alternatively, use the Gerber files in [`gerbers/`](/gerbers/) to order FR-4 switch plates along with your PCB. Files are provided for top plates, back plates, and MCU covers for all configurations.

## Optional Tools

| Tool | Purpose | Source |
|------|---------|--------|
| NovelLife Heat Set Insert Tool | Makes installing heat set inserts easier with soldering iron | Amazon |

## Where to Buy

- [Typeractive](https://typeractive.xyz/) - nice!nano, nice!view, switches, sockets, encoders, and other components
- [KEEBD](https://keebd.com/) - Alternative source for keyboard components
- **Amazon** - Good for heat set inserts, screws, and general hardware
- **AliExpress** - Budget alternative for many components (longer shipping times)

### PCB Manufacturing

- **[JLCPCB](https://jlcpcb.com/)** - Affordable PCB manufacturing with optional assembly service
- **[PCBWay](https://www.pcbway.com/)** - Alternative PCB manufacturer

Use the gerber files in [`gerbers/`](/gerbers/) when ordering.

#### JLCPCB Assembly (Optional)

JLCPCB can pre-assemble SMD components onto your PCBs. This includes:

- **SMD Diodes** - Saves hand-soldering 21 tiny components per board
- **Jumpers** - 30 0-ohm resistors per board can bridge the solder jumper pads for MCU, display, and battery connections (eliminating manual jumper soldering)

To use this service:

1. Select "PCB Assembly" when ordering
2. Upload files from [`jlcpcb/`](/jlcpcb/):
   - `temporal_BOM.csv` - Bill of Materials with LCSC part numbers
   - `temporal_CPL_top.csv` or `temporal_CPL_bottom.csv` - Component placement

Note: Hotswap sockets are not included in assembly files because JLCPCB cannot assemble them.
