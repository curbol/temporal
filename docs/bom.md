# Bill of Materials (BOM)

This is the complete list of components needed to build one TEMPORAL keyboard (both halves).

## Required Components

### Electronics

| Component | Quantity | Notes | Source |
|-----------|----------|-------|--------|
| nice!nano v2.0 | 2 | Wireless microcontroller | [Typeractive](https://typeractive.xyz/) |
| nice!view | 2 | Optional display | [Typeractive](https://typeractive.xyz/) |
| Kailh Choc Hotswap Sockets | 36-44 | Depends on your key configuration | [Typeractive](https://typeractive.xyz/) |
| EZ-Solder Machine Sockets and Headers | 2 sets | For nice!nano installation | [Typeractive](https://typeractive.xyz/) |
| SMD Diodes (1N4148W) | 36-44 | One per switch, depends on configuration | [Typeractive](https://typeractive.xyz/) |
| ALPS EC12 Low Profile Rotary Encoder | 0-2 | Optional, for thumb key encoder positions | [Typeractive](https://typeractive.xyz/) |
| Low Profile Knurled Encoder Knob | 0-2 | If using encoders | [Typeractive](https://typeractive.xyz/) |
| Lithium Battery 110mAh | 2 | PH 2.0mm connector (or similar capacity) | [Typeractive](https://typeractive.xyz/) |
| Battery Jack (JST PH 2.0mm) | 2 | For battery connection | [Typeractive](https://typeractive.xyz/) |
| Power Switch (MSK12C02) | 2 | Power on/off switch | [Typeractive](https://typeractive.xyz/) |
| Reset Button (3x6x4.3mm) | 2 | SMD tactile switch | [Typeractive](https://typeractive.xyz/) |

### Switches & Keycaps

| Component | Quantity | Notes |
|-----------|----------|-------|
| Kailh Choc v1 Switches | 36-44 | Low-profile switches, depends on configuration |
| Choc v1 Keycaps | 36-44 | Compatible with Choc switches |

### Hardware (per keyboard half)

| Component | Quantity per half | Notes | Source |
|-----------|-------------------|-------|--------|
| M2 Heat Set Inserts | ~4-6 | 3mm OD × 2mm height (3mm height also works) | [Amazon](https://www.amazon.com/dp/B0FD7DQS8Y) |
| M2 Hex Nuts | 2 | Standard M2 nuts | Hardware store |
| M2 Screws (3mm length) | ~2-4 | Wafer head recommended for flat profile | Hardware store |
| M2 Screws (4mm length) | ~2-4 | Wafer head recommended for flat profile | Hardware store |

### PCBs & Cases

| Component | Quantity | Notes |
|-----------|----------|-------|
| TEMPORAL PCB | 2 | Order using gerbers/temporal.zip |
| 3D Printed Cases | 2 | Choose your key configuration (36/38/40/42/44) |
| MCU Cover | 2 | Optional, protects the microcontroller |

## Configuration-Specific Quantities

Choose the quantities based on your desired key configuration:

| Configuration | Total Keys | Switches/Sockets/Diodes | PCB Keys to Keep |
|---------------|------------|-------------------------|------------------|
| 36 keys | 36 | 36 | Snap off both outer columns |
| 38 keys | 38 | 38 | Snap off one outer column |
| 40 keys | 40 | 40 | Keep one outer column per side |
| 42 keys | 42 | 42 | Keep both outer columns, one side |
| 44 keys | 44 | 44 | Keep all keys |

## Optional Tools

| Tool | Purpose | Source |
|------|---------|--------|
| NovelLife Heat Set Insert Tool | Makes installing heat set inserts easier with soldering iron | Amazon |
| No-Solder Spring Headers (MAC8 XB-3-5) | Alternative to soldering microcontroller | [Typeractive](https://typeractive.xyz/) |

## Notes

- **Heat set inserts:** Try to get M2 inserts with 3mm outer diameter and 2mm height. 3mm height will also work. Avoid inserts with 3.2mm+ outer diameter as they may not fit properly.
- **PCB pin holes:** The microcontroller pin holes are narrowed to 0.85mm specifically for no-solder spring headers. Standard headers will also work, but spring headers provide a cleaner, no-solder installation.
- **Batteries:** The listed 110mAh batteries are a good size, but you can use different capacities based on your needs.
- **Encoders:** Encoders are optional. You can use regular switches in the encoder positions if you prefer.

## Where to Buy

### Primary Sources

- **[Typeractive](https://typeractive.xyz/)** - Excellent source for nice!nano, nice!view, Choc switches, sockets, and all keyboard-specific components
- **[KEEBD](https://keebd.com/)** - Alternative source for keyboard components
- **Amazon** - Good for heat set inserts, screws, and general hardware
- **AliExpress** - Budget alternative for many components (longer shipping times)

### PCB Manufacturing

- **[JLCPCB](https://jlcpcb.com/)** - Affordable PCB manufacturing
- **[PCBWay](https://www.pcbway.com/)** - Alternative PCB manufacturer

Use the file `gerbers/temporal.zip` when ordering.
