# Bill of Materials (BOM)

This is the complete list of components needed to build one Temporal keyboard (both halves).

## Required Components

### Electronics

| Component | Quantity | Notes | Source | Image |
|-----------|----------|-------|--------|-------|
| nice!nano v2.0 | 2 | Wireless microcontroller | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/mcu_nice_nano.jpg" width="100" alt="nice!nano"> |
| nice!view | 2 | Optional display | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/display_nice_view.jpg" width="100" alt="nice!view"> |
| Kailh Choc Hotswap Sockets | 36-42 | Optional - allows switch swapping without desoldering | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/choc_socket.jpg" width="100" alt="Choc socket"> |
| EZ-Solder Machine Sockets and Headers | 2 sets | For nice!nano installation | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/mcu_ezsolder_socket.jpg" width="100" alt="EZ-Solder sockets"> |
| SMD Diodes (1N4148W) | 36-42 | One per switch, depends on configuration (not needed if using JLCPCB assembly) | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/diode.jpg" width="100" alt="SMD diode"> |
| ALPS EC11/EC12 Rotary Encoder | 0-2 | Optional, for thumb key encoder positions | [KEEBD](https://keebd.com/en-us/collections/components) | <img src="/assets/bom/enc_ec12.jpg" width="100" alt="Encoder"> |
| Low Profile Knurled Encoder Knob | 0-2 | If using encoders | [KEEBD](https://keebd.com/en-us/collections/components) | <img src="/assets/bom/enc_knob.jpg" width="100" alt="Encoder knob"> |
| Lithium Battery 110mAh | 2 | PH 2.0mm connector (or similar capacity) | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/batt_110mAh.jpg" width="100" alt="Battery"> |
| Battery Jack (JST PH 2.0mm) | 2 | For battery connection | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/batt_connector.jpg" width="100" alt="Battery connector"> |
| Power Switch (MSK12C02) | 2 | Power on/off switch | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/pwr_switch.jpg" width="100" alt="Power switch"> |
| Reset Button (3x6x4.3mm) | 2 | SMD tactile switch | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/rst_switch.jpg" width="100" alt="Reset switch"> |

- Encoders are optional. You can use regular switches in the encoder positions if you prefer.
- Hotswap sockets are optional. You can solder switches directly to the PCB for a permanent installation.

### Hardware

| Component | Quantity | Notes | Source | Image |
|-----------|-------------------|-------|--------|-------|
| M2 Heat Set Inserts | 10 | 3mm OD × 3mm height (2mm height also works) | [KEEBD](https://keebd.com/) | <img src="/assets/bom/heatset_m2_3mm_insert.jpg" width="100" alt="Heat set insert"> |
| M2 Screws (4mm length) | 18 | Button-head recommended | Amazon | <img src="/assets/bom/m2_button_head.jpg" width="100" alt="M2 screw"> |

- Try to get M2 inserts with 3mm outer diameter and 3mm height. 2mm height also works. Avoid inserts with 3.2mm+ outer diameter as they may not fit properly.

### Switches & Keycaps

| Component | Quantity | Notes | Source | Image |
|-----------|----------|-------|--------|-------|
| Choc v1 Switches | 36-42 | Low-profile switches, depends on configuration | [KEEBD](https://keebd.com/en-us/collections/choc-switches) [Low Pro KB](https://lowprokb.ca/) | <img src="/assets/bom/choc_switch.jpg" width="100" alt="Choc switch"> |
| Choc v1 Keycaps | 36-42 | Compatible with Choc switches | | |

I recommend [Ambients Silent Choc switches](https://lowprokb.ca/collections/switches/products/ambients-silent-choc-switches) for a quiet, smooth typing experience.

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

> **Tip:** For top plates, back plates, and MCU covers, you can choose HASL (with lead) instead of LeadFree HASL - it's usually cheaper and these parts have no exposed copper pads, so the surface finish doesn't matter.

> **Tip:** Order top plates at 1.2mm thickness instead of 1.6mm for the best fit with Choc switches.

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

| Tool | Purpose | Source | Image |
|------|---------|--------|-------|
| NovelLife Heat Set Insert Tool | Makes installing heat set inserts easier with soldering iron | Amazon | <img src="/assets/bom/heatset_insert_tool.jpg" width="100" alt="Heat set insert tool"> |
| Flux Pen | Helps solder flow nicely, especially for jumpers | [KEEBD](https://keebd.com/en-us/products/kester-951-no-clean-solder-flux-pen) | <img src="/assets/bom/flux_pen.jpg" width="100" alt="Flux pen"> |

## Where to Buy

- [KEEBD](https://keebd.com/) - nice!nano, nice!view, switches, sockets, encoders, and other components
- [Typeractive](https://typeractive.xyz/) - Alternative source for keyboard components
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
