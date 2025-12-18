# Bill of Materials (BOM)

This is the complete list of components needed to build one Temporal keyboard (both halves).

## Required Components

### Electronics

| Component | Quantity | Notes | Source |
|-----------|----------|-------|--------|
| nice!nano v2.0 | 2 | Wireless microcontroller | [Typeractive](https://typeractive.xyz/) |
| nice!view | 2 | Optional display | [Typeractive](https://typeractive.xyz/) |
| Kailh Choc Hotswap Sockets | 40-44 | Depends on your key configuration | [Typeractive](https://typeractive.xyz/) |
| EZ-Solder Machine Sockets and Headers | 2 sets | For nice!nano installation | [Typeractive](https://typeractive.xyz/) |
| SMD Diodes (1N4148W) | 40-44 | One per switch, depends on configuration | [Typeractive](https://typeractive.xyz/) |
| ALPS EC12 Low Profile Rotary Encoder | 0-2 | Optional, for thumb key encoder positions | [Typeractive](https://typeractive.xyz/) |
| Low Profile Knurled Encoder Knob | 0-2 | If using encoders | [Typeractive](https://typeractive.xyz/) |
| Lithium Battery 110mAh | 2 | PH 2.0mm connector (or similar capacity) | [Typeractive](https://typeractive.xyz/) |
| Battery Jack (JST PH 2.0mm) | 2 | For battery connection | [Typeractive](https://typeractive.xyz/) |
| Power Switch (MSK12C02) | 2 | Power on/off switch | [Typeractive](https://typeractive.xyz/) |
| Reset Button (3x6x4.3mm) | 2 | SMD tactile switch | [Typeractive](https://typeractive.xyz/) |

- Encoders are optional. You can use regular switches in the encoder positions if you prefer.

### Switches & Keycaps

| Component | Quantity | Notes |
|-----------|----------|-------|
| Choc v1 Switches | 40-44 | Low-profile switches, depends on configuration |
| Choc v1 Keycaps | 40-44 | Compatible with Choc switches |

I recommend using sculpted keycaps as it significantly improves the feel, but ultimately it's personal preference.

**[KLP Lame Keycaps](https://github.com/braindefender/KLP-Lame-Keycaps)** - 3D printable sculpted keycaps designed for Choc switches. If ordering from a printing service, here are the quantities needed for a full Temporal build:

| Part | Quantity | Contents |
|------|----------|----------|
| Saddle part 1 | 1 | 6 tilted, 3 home |
| Saddle part 2 | 2 | 4 tilted, 4 home, 1 homing each |
| Saddle part 3 | 1 | 9 tilted each |
| Normal part 2 | 4-5 | 3 thumbs each |

**Totals:** Tilted: 23, Home: 11, Homing: 2, Thumb: 12-15 (depending on encoders)

### Hardware (per keyboard half)

| Component | Quantity per half | Notes | Source |
|-----------|-------------------|-------|--------|
| M2 Heat Set Inserts | 5-10 | 3mm OD × 2mm height (3mm height also works) | [Amazon](https://www.amazon.com/dp/B0FD7DQS8Y) |
| M2 Hex Nuts | 2 | Standard M2 nuts | Hardware store |
| M2 Screws (3mm length) | 2-4 | Wafer head recommended for flat profile | Hardware store |
| M2 Screws (4mm length) | 5-10 | Wafer head recommended for flat profile | Hardware store |

- Try to get M2 inserts with 3mm outer diameter and 2mm height. 3mm height will also work. Avoid inserts with 3.2mm+ outer diameter as they may not fit properly.

### PCBs & Cases

| Component | Quantity | Notes |
|-----------|----------|-------|
| Temporal PCB | 2 | Order using gerbers/temporal.zip |
| 3D Printed Case | 1 | Choose your key configuration (40/44) |
| 3D Printed Case (Mirror) | 1 | Choose your key configuration (40/44) |
| MCU Cover | 2 | Optional, protects the microcontroller |

Use [`gerbers/temporal/temporal.zip`](/gerbers/temporal/temporal.zip) for PCB fabrication with services like JLCPCB or PCBWay.

- Material: FR-4, 1.6mm thickness
- Surface finish: LeadFree HASL
- See [`pcbs/README.md`](/pcbs/README.md) for detailed manufacturing specifications

3D-printable case files are included in the [`cases/`](/cases/) directory. Cases are available for 40 and 44 key configurations.

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
| No-Solder Spring Headers (MAC8 XB-3-5) | Alternative to soldering microcontroller | [Typeractive](https://typeractive.xyz/) |

## Where to Buy

- [Typeractive](https://typeractive.xyz/) - nice!nano, nice!view, switches, sockets, encoders, and other components
- [KEEBD](https://keebd.com/) - Alternative source for keyboard components
- **Amazon** - Good for heat set inserts, screws, and general hardware
- **AliExpress** - Budget alternative for many components (longer shipping times)

### PCB Manufacturing

- **[JLCPCB](https://jlcpcb.com/)** - Affordable PCB manufacturing
- **[PCBWay](https://www.pcbway.com/)** - Alternative PCB manufacturer

Use the gerber files in [`gerbers/`](/gerbers/) when ordering.
