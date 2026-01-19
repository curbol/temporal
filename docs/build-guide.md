# Build Guide

This guide walks through building the Temporal keyboard from start to finish.

> [!TIP]
> [Typeractive's Corne wireless build guide](https://docs.typeractive.xyz/build-guides/corne-wireless) covers a similar board and has videos that may be helpful.

## Before You Start

### Key Configuration

Before starting your build, decide on your key configuration (36-42 keys). The outer pinky columns can be snapped off the PCB if not needed, and each encoder replaces one key position in the thumb cluster.

**Available configurations:**

- **With full pinky column:** 42 keys, 41 keys + 1 encoder, or 40 keys + 2 encoders
- **With breakoff pinky column:** 38 keys, 37 keys + 1 encoder, or 36 keys + 2 encoders

**To remove the pinky column:**

1. Lay the PCB on a hard flat surface with the extra column hanging off the edge
2. Press down on the main PCB to hold it steady
3. Snap off the extra column by pushing down on it quickly and forcefully
4. Sand the PCB edge flat using sandpaper on a flat surface (200-400 grit works well)
5. Clean up thoroughly to remove any PCB dust and residue

> [!WARNING]
> PCB dust is toxic. Wear a mask and work in a well-ventilated area or outside. Clean up well after sanding.

### Identify Left and Right PCBs

The Temporal PCBs are reversible. Before soldering, decide which PCB will be left and which will be right. Components are soldered to opposite sides of each PCB. Look for "Back Left" or "Back Right" printed above the MCU area to confirm you're working on the correct side.

> [!CAUTION]
> Double-check your orientation before soldering. Building two of the same side is a common mistake that's difficult to fix.

### Tools Needed

- Soldering iron with fine tip
- Solder (leaded solder is easier to work with)
- Tweezers
- Flush cutters / wire snips
- Kapton tape or masking tape
- Heat set insert tool (optional, for 3D printed case)

---

## Assembly Overview

Follow this general order:

1. **Back side first:** Diodes, hotswap sockets, jumpers
2. **Front side:** Power switch, reset button
3. **Front side:** MCU sockets, display header, battery connector
4. **Front side:** Encoder (if using)
5. **Install microcontroller and display**, then clean the PCB
6. **Case assembly**
7. **Switches and keycaps**

---

## Step 1: Solder Back Components

All components in this step are soldered to the **back side** of the PCB.

### Soldering Technique

For SMD components (diodes, sockets, jumpers), use this technique:

1. Apply a small amount of solder to **one pad only**
2. Using tweezers, position the component while heating the pre-soldered pad
3. The component will sink into the molten solder - hold it in place until the solder solidifies
4. Solder the remaining pad(s), touching both the pad and component lead simultaneously

### Diodes

> [!NOTE]
> If the diodes are already installed using JLCPCB assembly, skip this step.

Install one diode per key position (18-21 per half depending on your configuration). Diodes are directional - the line on the diode must match the line on the PCB silkscreen.

1. Pre-tin one pad of each diode location
2. Place the diode with the line matching the PCB marking
3. Heat the pre-tinned pad while holding the diode with tweezers
4. Solder the second pad

### Hotswap Sockets

Install one socket per key position (matching your diode count). Hotswap sockets should only be installed one way. Make sure to match up the side with chamfered corners with the matching silkscreen.

<img src="/assets/build_guide/sockets_prepared.jpg" width="400" alt="Hotswap sockets prepared">

1. Pre-tin one pad
2. Place the socket in the silkscreen outline
3. Heat and position the socket
4. Solder the second pad - use enough solder to create a solid connection

<img src="/assets/build_guide/sockets_soldered.jpg" width="400" alt="Hotswap sockets soldered">

> [!TIP]
> Apply gentle pressure while soldering to ensure the socket sits flat against the PCB.

> [!TIP]
> Install sockets in encoder positions even if using encoders - they don't interfere with the encoder and fill in the socket cutout in the case for a cleaner look.

> [!NOTE]
> Hotswap sockets are optional. You can solder switches directly to the PCB if you prefer a permanent installation. This saves the cost of sockets but means you cannot swap switches later without desoldering.

### Jumpers

> [!NOTE]
> If the jumpers are already bridged with 0-ohm resistors from JLCPCB assembly, skip this step.

> [!IMPORTANT]
> Only bridge jumpers on the **BACK side** of the board. This is the same side as your diodes and hotswap sockets.

Bridge all jumper pads on the back side. There are jumpers for the MCU, display, and battery connections.

1. Apply solder to one pad
2. Add more solder while dragging across to the second pad to create a bridge
3. The bridge should be a smooth dome of solder connecting both pads

---

## Step 2: Solder Power and Reset Switches

These components are soldered to the **front side** of the PCB.

### Power Switch (MSK12C02)

> [!TIP]
> These components have multiple legs - once one leg is tacked down, the rest are easy to solder.

<img src="/assets/build_guide/pwr_rst_prepared.jpg" width="400" alt="Power and reset switches prepared">

1. Pre-tin one of the pads
2. Position the switch and heat the pre-tinned pad while holding the switch in place with tweezers
3. Solder the remaining pads

### Reset Button

1. Pre-tin one pad
2. Align the button and heat the pre-tinned pad
3. Solder the remaining pads

<img src="/assets/build_guide/pwr_rst_soldered.jpg" width="400" alt="Power and reset switches soldered">

---

## Step 3: Solder MCU, Display, and Battery Components

These components are installed on the **front side** of the PCB. The sockets and headers use through-hole pins that are soldered from the back.

> [!TIP]
> For all through-hole components: after tacking two corner pins, verify the component is straight and fully seated before soldering the rest.

### MCU Sockets (Machine Pin Sockets)

> [!IMPORTANT]
> The microcontroller will be placed **facing DOWN** (components facing the PCB). Ensure your sockets are positioned correctly.

<img src="/assets/build_guide/mcu_socket_prepared.jpg" width="400" alt="MCU sockets prepared">

1. Insert the sockets into the front of the PCB
2. Tape them in place to prevent them from falling out when you flip the board

<img src="/assets/build_guide/mcu_socket_taped.jpg" width="400" alt="MCU sockets taped">

3. Flip the PCB and solder two pins on opposite corners first while pressing the socket flat against your work surface to ensure it's fully seated
4. Solder the remaining pins

<img src="/assets/build_guide/mcu_solder_pins.jpg" width="400" alt="MCU socket pins soldered">

5. Trim the pins flush with the solder joints using wire snips

### Display Header

<img src="/assets/build_guide/display_socket_prepared.jpg" width="400" alt="Display header prepared">

1. Insert the header pins into the front of the PCB
2. Tape in place

<img src="/assets/build_guide/display_socket_taped.jpg" width="400" alt="Display header taped">

3. Solder from the back using the same technique as the MCU sockets

<img src="/assets/build_guide/display_solder_pins.jpg" width="400" alt="Display header pins soldered">

4. Trim the pins

<img src="/assets/build_guide/display_snip_pins.jpg" width="400" alt="Display header pins trimmed">

### Battery Connector

<img src="/assets/build_guide/batt_prepared.jpg" width="400" alt="Battery connector prepared">

1. Insert the connector into the front of the PCB
2. Tape in place

<img src="/assets/build_guide/batt_taped.jpg" width="400" alt="Battery connector taped">

3. Solder from the back
4. Trim the pins

<img src="/assets/build_guide/batt_snip.jpg" width="400" alt="Battery connector pins trimmed">

> [!IMPORTANT]
> When connecting the battery later, verify polarity matches the PCB markings (+ and -). Reversed polarity can damage the microcontroller. Most 301230 or 401230 LiPo batteries with JST connectors work well.

---

## Step 4: Solder Encoder (Optional)

If you're using rotary encoders instead of switches in the thumb cluster positions:

### Encoder Installation

The encoder has side clips that snap into the PCB, so taping is not necessary.

<img src="/assets/build_guide/enc_prepared.jpg" width="400" alt="Encoder prepared">

1. Insert the encoder from the front - the clips should snap into the mounting holes
2. Flip the board and solder the 3 encoder pins on the back
3. Trim the pins

<img src="/assets/build_guide/enc_soldered.jpg" width="400" alt="Encoder soldered">

### Encoders with Switch Function

If your encoder has a push-button switch (5 pins total instead of 3):

1. The 3 encoder pins are soldered through-hole as described above
2. The 2 switch pins need to be **surface mounted** on the front of the PCB
3. Bend and trim the switch pins so they can lay flat on the SMD pads
4. Solder the switch pins to the SMD pads on the front

---

## Step 5: Install the Microcontroller

### nice!nano Installation

> [!IMPORTANT]
> The microcontroller will be placed **facing DOWN** (components facing the PCB). Ensure your sockets are positioned correctly.

1. Insert the mill-max pins into the sockets (not into the nice!nano yet)
2. Place the nice!nano **face down** (components facing the PCB) onto the pins
3. Solder the pins to the nice!nano
4. The nice!nano should now be removable from the sockets

<img src="/assets/build_guide/mcu_fully_soldered.jpg" width="400" alt="MCU fully soldered">

### Display Installation (Optional)

If using a nice!view or other display:

1. Insert pins into the display header
2. Place the display onto the pins
3. Solder and trim

<img src="/assets/build_guide/display_fully_soldered.jpg" width="400" alt="Display fully soldered">

### Clean the PCB

After all soldering is complete, clean the board to remove flux residue. Flux left on the PCB can be corrosive over time and looks untidy.

<img src="/assets/build_guide/pcb_cleaning_prepared.jpg" width="400" alt="PCB cleaning prepared">

1. Dip a toothbrush in isopropyl alcohol (90% or higher works best)
2. Scrub all solder joints thoroughly
3. Allow the board to dry completely before powering on

<img src="/assets/build_guide/pcb_cleaning_complete.jpg" width="400" alt="PCB cleaning complete">

<img src="/assets/build_guide/mcu_cleaned.jpg" width="400" alt="MCU area cleaned">

---

## Step 6: Case Assembly

### MCU Cover

1. Attach the MCU cover using 10mm standoffs
2. Use 2 M2 screws (4mm length) from the back of the PCB into the standoffs
3. Use 2 more M2 screws (4mm length) from the front through the cover into the standoffs

### 3D Printed Case

<img src="/assets/build_guide/heatset_prepared.jpg" width="400" alt="Heat set inserts prepared">

1. Install 5 heat-set inserts into the case posts using a soldering iron or heat-set tool

<img src="/assets/build_guide/heatset_complete.jpg" width="400" alt="Heat set inserts installed">

2. Place the PCB into the case - the case posts go through the mounting holes in the PCB

<img src="/assets/build_guide/top_plate_prepared.jpg" width="400" alt="Top plate prepared">

3. Place the top plate over the PCB, aligning with the case posts

> [!TIP]
> Insert a few switches into the top plate before placing it on the PCB. This helps maintain proper spacing and alignment.

<img src="/assets/build_guide/top_plate_switches.jpg" width="400" alt="Top plate with switches">

4. Secure with M2 screws (4mm length) through the top plate into the heat-set inserts

<img src="/assets/build_guide/top_plate_on.jpg" width="400" alt="Top plate installed">

### FR-4 Plate Alternative

If using FR-4 plates instead of a 3D printed case:

1. Attach the back plate using 4mm standoffs
2. Secure with M2 screws (3mm length)
3. Add the top plate and secure

---

## Step 7: Switches and Keycaps

1. Insert Choc v1 switches into the top plate
2. Press firmly until the switches click into the hotswap sockets
3. Install keycaps onto the switches
4. If using encoders, press the knobs onto the encoder shafts

<img src="/assets/build_guide/temporal_complete.jpg" width="400" alt="Temporal keyboard complete">

---

## Flashing Firmware

The Temporal uses ZMK firmware for wireless functionality.

### Initial Setup

1. Create a ZMK config repository by following the [ZMK User Setup Guide](https://zmk.dev/docs/user-setup)

2. Add the Temporal shield to your config. Use the [temporal-zmk](https://github.com/curbol/temporal-zmk) repository as a shield module.

3. Update your `config/west.yml` to include the Temporal shield:

   See [example west.yml](https://github.com/curbol/zmk-config/blob/main/config/west.yml) for reference.

4. Update your `build.yaml` to build for both halves:

   See [example build.yaml](https://github.com/curbol/zmk-config/blob/main/build.yaml) for reference.

5. Example config structure: [curbol/zmk-config](https://github.com/curbol/zmk-config/tree/main/config)

### Keymap Editor (Optional)

You can use [Keymap Editor](https://nickcoutsos.github.io/keymap-editor/) to visually edit your keymap. Add the layout from [temporal-zmk](https://github.com/curbol/temporal-zmk) to enable visual editing.

### Flashing the Firmware

1. Push your config changes to GitHub
2. The GitHub Action will build the firmware automatically
3. Download the firmware artifact from the Actions tab
4. Extract the zip file - you'll find two `.uf2` files (one for left, one for right)

### Entering Bootloader Mode

1. Double-click the reset button on the PCB
2. The nice!nano will appear as a USB drive on your computer

### Flash Each Half

1. Drag the `temporal_left-nice_nano_v2-zmk.uf2` file to the left half's drive
2. Repeat for the right half with `temporal_right-nice_nano_v2-zmk.uf2`

> [!NOTE]
> You must flash both halves on first setup. After initial pairing, keymap changes typically only require flashing the left half.

---

## Additional Resources

- [Typeractive Corne Build Guide](https://docs.typeractive.xyz/build-guides/corne-wireless) - Excellent reference for wireless split keyboard builds
- [ZMK Documentation](https://zmk.dev/docs) - Official ZMK firmware documentation
- [temporal-zmk Shield](https://github.com/curbol/temporal-zmk) - Temporal ZMK shield repository
