# Bill of Materials (BOM)

Everything needed to build one Temporal keyboard, both halves.

## Required Components

### Electronics

| Component | Quantity | Notes | Source | Image |
|-----------|----------|-------|--------|-------|
| SMD Diodes (1N4148W) | 36-42 | One per switch, depends on configuration (not needed if using JLCPCB assembly) | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/diode.jpg" width="100" alt="SMD diode"> |
| Kailh Choc Hotswap Sockets | 36-42 | Optional; allows switch swapping without desoldering | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/choc_socket.jpg" width="100" alt="Choc socket"> |
| Power Switch (MSK12C02) | 2 | Power on/off switch | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/pwr_switch.jpg" width="100" alt="Power switch"> |
| Reset Button (3x6x4.3mm) | 2 | SMD tactile switch | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/rst_switch.jpg" width="100" alt="Reset switch"> |
| EZ-Solder Machine Sockets and Headers | 2 sets | For nice!nano installation | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/mcu_ezsolder_socket.jpg" width="100" alt="EZ-Solder sockets"> |
| nice!nano v2.0 | 2 | Wireless microcontroller | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/mcu_nice_nano.jpg" width="100" alt="nice!nano"> |
| Display Header Socket (5-pin 2.54mm) | 2 | If your display doesn't already come with the correct header | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/display_socket.jpg" width="100" alt="Display socket"> |
| nice!view | 2 | Optional display | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/display_nice_view.jpg" width="100" alt="nice!view"> |
| Battery Jack (JST PH 2.0mm) | 2 | For battery connection | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/batt_connector.jpg" width="100" alt="Battery connector"> |
| Lithium Battery 110mAh | 2 | PH 2.0mm connector (or similar capacity) | [KEEBD](https://keebd.com/) [Typeractive](https://typeractive.xyz/) | <img src="/assets/bom/batt_110mAh.jpg" width="100" alt="Battery"> |
| ALPS EC11/EC12 Rotary Encoder | 0-2 | Optional, for thumb key encoder positions | [KEEBD](https://keebd.com/en-us/collections/components) | <img src="/assets/bom/enc_ec12.jpg" width="100" alt="Encoder"> |
| Low Profile Knurled Encoder Knob | 0-2 | If using encoders | [KEEBD](https://keebd.com/en-us/collections/components) | <img src="/assets/bom/enc_knob.jpg" width="100" alt="Encoder knob"> |

Encoders and hotswap sockets are both optional: regular switches work in the encoder positions, and switches can be soldered straight to the PCB.

### Hardware

| Component | Quantity | Notes | Source | Image |
|-----------|----------|-------|--------|-------|
| M2 Heat-Set Inserts | 10 | 3mm OD × 3mm height (2mm height also works) | [KEEBD](https://keebd.com/) | <img src="/assets/bom/heatset_m2_3mm_insert.jpg" width="100" alt="Heat-set insert"> |
| M2 Screws (4mm length) | 18 | Button-head recommended | Amazon | <img src="/assets/bom/m2_button_head.jpg" width="100" alt="M2 screw"> |
| M2 Standoffs (8mm length) | 4 | For MCU cover mounting | [KEEBD](https://keebd.com/) Amazon | <img src="/assets/bom/m2_standoff_8mm.jpg" width="100" alt="M2 standoff"> |
| M2 Standoffs (3mm length) | 10 | FR-4 plate build only, in place of the heat-set inserts | Amazon | |
| M2 Screws (3mm length) | 20 | FR-4 plate build only, button-head | Amazon | |

Avoid inserts wider than 3mm OD. A 3.2mm insert may not seat in the case posts.

### Switches & Keycaps

| Component | Quantity | Notes | Source | Image |
|-----------|----------|-------|--------|-------|
| Choc v1 or v2 Switches | 36-42 | Low-profile switches, depends on configuration | [Low Pro KB](https://lowprokb.ca/) [KEEBD](https://keebd.com/en-us/collections/choc-switches) | <img src="/assets/bom/choc_switch.jpg" width="100" alt="Choc switch"> |
| Choc Keycaps | 36-42 | Compatible with Choc switches | | |

[Ambients Silent Choc switches](https://lowprokb.ca/collections/switches/products/ambients-silent-choc-switches) are my pick for a quiet, smooth feel. Sculpted keycaps improve the feel more than anything else on this page, though that is personal preference.

[KLP Lame Keycaps](https://github.com/braindefender/KLP-Lame-Keycaps) are 3D-printable sculpted keycaps for Choc switches. Ordered from a printing service, a full Temporal build needs:

| Part | Quantity | Contents |
|------|----------|----------|
| Saddle part 1 | 1 | 6 tilted, 3 saddle |
| Saddle part 2 | 2 | 4 tilted, 4 saddle, 1 homing |
| Saddle part 3 | 1 | 9 tilted |
| Thumbs | 1 | 9 thumbs |

Totals: 23 tilted, 11 saddle, 2 homing, and 9 thumb, of which 6-8 are used depending on encoders.

### PCBs & Cases

| Component | Quantity | Notes |
|-----------|----------|-------|
| Temporal PCB | 2 | Order using `gerbers/temporal.zip` |
| 3D-Printed Case (Left) | 1 | Choose your key configuration and switch mounting (see below) |
| 3D-Printed Case (Right) | 1 | Choose your key configuration and switch mounting (see below) |
| MCU Cover | 2 | Optional, protects the microcontroller |

Use [`gerbers/temporal.zip`](/gerbers/temporal.zip) for PCB fabrication with services like JLCPCB or PCBWay.

- Material: FR-4, 1.6mm thickness
- Surface finish: LeadFree HASL
- See [`pcbs/temporal/README.md`](/pcbs/temporal/README.md) for notes on the hand-routed main PCB

> [!TIP]
> Top plates, back plates, and MCU covers can be ordered in HASL (with lead) instead of LeadFree HASL. It is usually cheaper, and these parts have no exposed copper pads, so the finish does not matter.

> [!TIP]
> Order top plates at 1.2mm thickness instead of 1.6mm for the best fit with Choc switches.

3D-printable case files are in the [`cases/`](/cases/) directory, foldered by key count:

```
cases/
├── mcu_cover.stl
├── 38/
│   ├── top_plate.stl
│   ├── left.stl            right.stl
│   └── kickstand_left.stl  kickstand_right.stl
└── 42/                     (same layout)
```

Pick your key count, then print the `left` and `right` pair, with or without the
kickstand. One case fits every build: Choc v1 or v2, hotswap sockets or switches
soldered straight to the board. It carries the clearances for all of them, and at a
2.35mm floor every pocket is blind, so the bottom face is solid.

- **`38` / `42`**: key configuration, matching the breakoff pinky column. A 42 case
  also takes the 41 and 40-key encoder configurations, and a 38 case the 37 and 36.
- **`kickstand`**: optional, adds a wedge for tenting.
- **`top_plate`**: one per hand, printed twice from the same file and flipped.
- **`mcu_cover`**: shared by both hands and both key counts, printed twice.

Top plates are also available as `top_plate_<38|42>_stealth` gerbers: the same plate
without the white silkscreen branding, leaving the lettering as an outline in the
ground plane.

**For home 3D printing:**

- Material: matte PLA
- Layer height: 0.12mm
- Infill: not critical, since the walls are thin

**For JLC's 3D printing service:**

- Technology: MJF (nylon)
- Material: PA11-HP nylon, verified to work well for cases and keycaps

> [!NOTE]
> Other materials likely print fine too; these are just the ones tested.

Alternatively, the gerbers in [`gerbers/`](/gerbers/) cover FR-4 switch plates you can order alongside your PCB: top plates, back plates, and MCU covers for every configuration.

## Optional Tools

| Tool | Purpose | Source | Image |
|------|---------|--------|-------|
| NovelLife Heat-Set Insert Tool | Drives heat-set inserts with a soldering iron | Amazon | <img src="/assets/bom/heatset_insert_tool.jpg" width="100" alt="Heat-set insert tool"> |
| Flux Pen | Helps solder flow nicely, especially for jumpers | [KEEBD](https://keebd.com/en-us/products/kester-951-no-clean-solder-flux-pen) | <img src="/assets/bom/flux_pen.jpg" width="100" alt="Flux pen"> |

## Where to Buy

- [KEEBD](https://keebd.com/): nice!nano, nice!view, switches, sockets, encoders, and most other components
- [Typeractive](https://typeractive.xyz/): most of the same parts
- Amazon: heat-set inserts, screws, and general hardware
- AliExpress: cheaper on most components, with longer shipping

### PCB Manufacturing

- [JLCPCB](https://jlcpcb.com/): inexpensive, with an optional assembly service
- [PCBWay](https://www.pcbway.com/): the usual alternative

Use the gerber files in [`gerbers/`](/gerbers/) when ordering.

> [!TIP]
> Here is how JLCPCB's PCB colors look:
>
> <img src="/assets/bom/pcb_colors.webp" width="400" alt="PCB color options">

#### JLCPCB Assembly (Optional)

JLCPCB can pre-assemble the SMD parts onto your PCBs:

- 21 diodes per board, so none of them need hand-soldering
- 30 0-ohm resistors per board, bridging the solder jumper pads for the MCU, display, and battery connections

To use this service:

1. Select "PCB Assembly" when ordering
2. Upload files from [`jlcpcb/`](/jlcpcb/):
   - `temporal_BOM.csv`: the bill of materials, with LCSC part numbers
   - `temporal_CPL_top.csv`: places parts on the top face, giving the **right**
     half (its top silkscreen reads "Back Right" above the MCU area)
   - `temporal_CPL_bottom.csv`: places parts on the bottom face, giving the
     **left** half ("Back Left")

You need one board of each hand, and assembly is ordered per side, so place two
orders, one per CPL file. A single order using one CPL gives you two identical
halves.

> [!NOTE]
> Hotswap sockets are absent from the assembly files because JLCPCB cannot place them.
