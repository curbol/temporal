# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A hardware repo, not a software one. It builds a 36-42 key split ergonomic keyboard: PCBs, plates, gerbers, JLCPCB assembly files, and 3D-printable cases. There is no test suite; `make check` (lint, DRC, and reproducibility of the derived artifacts) is the automated verification, and the rest means running the build and inspecting the outputs in KiCad or a slicer/mesh viewer.

## Commands

```bash
make deps      # Install openscad, kicad, zip/unzip, Maple Mono NF, and the ViaStitching KiCad plugin
make gen       # Full build: clean → ergogen → post-process → renders → gerbers → JLCPCB → STLs
make check     # Parse + lint + build + DRC + embedded-font + zone-fill + reproducibility checks (what CI runs)
               # Reproducibility covers temporal.json, jlcpcb/, the .kicad_pro/.kicad_dru files, and gerbers/
make gerbers   # Export + zip gerbers for every pcbs/*/*.kicad_pcb
make assembly  # Regenerate jlcpcb/ BOM + CPL from pcbs/temporal
make convert   # JSCAD → STL only (slowest stage; minutes)
make clean     # Delete ergogen/output, cases/, gerbers/, jlcpcb/, and all of pcbs/ EXCEPT pcbs/temporal
```

`make check` is the closest thing to a test suite. It is safe to run at any time: it
writes only to `ergogen/output/` and a temp directory, and a shell trap restores
`temporal.json`, `jlcpcb/` and the `.kicad_pro`/`.kicad_dru` files it regenerates to
compare, whether the run succeeds or fails.

Individual post-processing steps are plain node scripts and can be re-run alone, e.g. `node scripts/via_stitching.js`, `node scripts/fill_zones.js`, `node scripts/setup_kicad_project.js pcbs/top_plate_42/top_plate_42.kicad_pcb`.

`make gen` rewrites hundreds of committed binary/generated files (STLs, gerber zips, PCB renders). Expect a large diff; that is normal, not a bug.

## Architecture

`ergogen/config.yaml` (~1700 lines) is the single source of truth. Everything else is derived from it, either by Ergogen itself or by the post-processing scripts. Change the geometry there, never in a generated `.kicad_pcb` or `.stl`.

The config is ordered `units` → `points` → `outlines` → `cases` → `pcbs`. `units` holds every tuning constant (switch dimensions, wall thickness, splay, MCU/display/battery offsets) as named values; downstream sections reference them arithmetically, so a dimension change is a one-line edit at the top.

Build pipeline as run by `make gen`:

1. `npm run gen` → Ergogen emits `ergogen/output/{pcbs,cases,outlines}`, then `scripts/generate_layout.js` derives `temporal.json` (ZMK Studio physical layout) from the same points.
2. Post-processing, in this order (each mutates the `.kicad_pcb` files in place, so order matters):
   - `fix_edge_cuts.js` drops near-zero-length Edge.Cuts segments Ergogen emits at curves, which otherwise fail DRC as malformed outlines.
   - `fix_silkscreen_width.js` widens silkscreen strokes to `units.silk_line_width`, since the vendored footprints draw at 0.1-0.15mm and JLCPCB's minimum is 0.153mm. It matches balanced s-expressions, so it covers the multi-line `fp_poly` blocks `convert_svg_to_footprint.js` emits as well as Ergogen's single-line graphics. KiCad has no minimum-stroke DRC rule, so it asserts that it matched something and that no sub-minimum stroke survives.
   - `add_ground_planes.js` adds F.Cu/B.Cu GND zones following the board outline.
   - `create_text_keepouts.js` adds rule areas around named silkscreen text so the pour does not swallow it.
   - `via_stitching.js` grid-stitches GND vias via the ViaStitching plugin.
   - `fill_zones.js` writes each board's `.kicad_dru` custom DRC rules, then fills all zones (the filler honours those rules, so they must exist first).
   - `embed_fonts.js` embeds the silkscreen font into each board, so what gets fabricated does not depend on the fonts installed on the exporting machine.
   - `copy_pcb_if_missing.sh` copies Ergogen PCBs into `pcbs/<name>/` **only if absent**.
   - `setup_kicad_project.js` writes `.kicad_pro` and `.kicad_dru` files from `scripts/kicad_config.yaml`.
   - `create_stealth_variants.js` derives `top_plate_{38,42}_stealth` from the generated top plates by stripping silkscreen text and the now-unused embedded fonts. The glyph-shaped copper keepouts stay: stealth drops the white ink but keeps the lettering as an outline in the ground pour.
3. Renders (`kicad-cli pcb render`), gerbers, JLCPCB BOM/CPL, then `convert_jscad.js` for STLs.

`pcbs/temporal/` is hand-routed and deliberately never overwritten: `make clean` skips it and `copy_pcb_if_missing.sh` won't clobber it. Traces added manually in KiCad live only there. To regenerate it you must `rm -rf pcbs/temporal` first, and the manual routing has to be redone (see `pcbs/temporal/README.md`). All other `pcbs/*` directories are disposable.

Step 2 runs entirely against `ergogen/output/pcbs`, so its results reach `pcbs/temporal` only on the run that first creates it. Editing the `zones`, `via_stitching` or `text_keepouts` sections of `scripts/kicad_config.yaml` updates every disposable board but leaves the hand-routed one alone. `scripts/check_zone_fills.js` (run by `make check`) catches a pour that has fallen behind its DRC rules; the other two need a regeneration and a re-route.

The Python scripts (`via_stitching.py`, `fill_zones.py`, `create_text_keepouts.py`, `check_zone_fills.py`) are not run directly; their JS wrappers locate KiCad's bundled interpreter through `scripts/kicad_python.js` and shell out to it, because `pcbnew` is only importable from that interpreter.

`scripts/kicad_config.js` and `scripts/ergogen_config.js` are the only readers of the two config files. `kicad_config.js` also fills the net class track and via geometry in from `ergogen/config.yaml`'s units, so those numbers are typed once; `ergogen_config.js` supplies the board list (`pcbNames`) and the post-processing input set (`ergogenOutputPcbs`), so neither is repeated in a script body.

## Conventions

Naming inside `ergogen/config.yaml`:

- A leading `_` marks an intermediate outline/case/pcb. Ergogen skips those when writing output; they exist only to be composed into exported ones.
- `_left` is generated directly; `_m_right` is generated as the mirror source and `convert_jscad.js` mirrors it into `<name>_right.stl`. A name with neither suffix is a shared part. The `_m_right` suffix never survives into `cases/`.
- Case keys read `temporal_<38|42>[_kickstand]_<left|m_right>`, which is the whole decision a builder makes: key count is fixed by the breakoff pinky column and the kickstand is a tenting wedge fused to the shell. `scripts/convert_jscad.js` turns that into `cases/<count>/[kickstand_]<hand>.stl`; shared parts (`mcu_cover`) and the per-count `top_plate` stay outside the count folders. PCB variants keep the flat suffix form (`top_plate_42_stealth`).
- `_choc_v2_*` outlines are the clearances a Choc v2 switch needs that a v1 does not: the wider Ø4.8 centre boss and the corner stabilizer pin. One case carries every clearance at once, Choc v1 and v2, socketed and soldered, because `bottom_thickness` is `socket_depth + floor_skin` and that leaves all of them blind. A build gets pockets it does not use, never a hole. `_choc_v2_center_post_<hand>` is hand-specific because its pocket crosses the socket relief and bridges to it.

Tuning values belong in YAML, not in script bodies. `scripts/kicad_config.yaml` owns net classes, design rules, custom DRC rules, zone/via-stitching parameters, keepout text patterns, and the JLCPCB part numbers plus embedded-resistor positions. Adding a JLCPCB assembly part is a config edit, not a code edit.

Dimensions `ergogen/config.yaml` already owns are not repeated in that file: `scripts/kicad_config.js` fills the net class track widths, the via geometry (net classes and stitching alike) and the silkscreen pen in from the `copper_*` and `silk_line_width` units. Changing a trace width is an edit to `units:`.

`ergogen/footprints/ceoloide/` is vendored from ceoloide's library and locally patched (notably `switch_choc_v1_v2.js` for Choc v2 and routing, and `power_switch_smd_side.js` for `label_font_face`/`label_font_thickness`). Do not replace those files wholesale with upstream versions; diff first.

Not every footprint there is referenced by `ergogen/config.yaml`. `mounting_hole_plated.js` and `utility_circle.js` are the rest of the vendored subset, and `brain.js`, `neuron.js` and `solar_system.js` are artwork produced by `scripts/convert_svg_to_footprint.js`. They are kept on purpose; being unreferenced is not a reason to delete them.

Silkscreen is uniform: one face (`"Maple Mono NF"`), bold, and every stroke at `units.silk_line_width`. Two constraints drive that.

KiCad addresses fonts by family plus bold/italic, and every Maple Mono file reports `Maple Mono NF` as its first fontconfig family, so a weight-suffixed `face:` like `"Maple Mono NF ExtraBold"` resolves to nothing and is silently substituted at export. Name the plain family and set bold, which is the only way to reach a heavier Maple Mono file: bold resolves to `MapleMono-NF-Bold.ttf`, and `embed_fonts.js` carries whichever file the text actually uses. `utility_text` takes `bold`; `mcu_nice_nano` and `power_switch_smd_side` take `label_font_bold`.

`units.silk_line_width` is 0.16mm because JLCPCB's minimum is 0.153mm (6 mil). It governs the text `thickness`, the graphic strokes `fix_silkscreen_width.js` widens, and the `board_defaults` the `.kicad_pro` files carry. `design_rules.min_text_thickness` in `scripts/kicad_config.yaml` holds KiCad to the fab's floor, which is a different number on purpose.

Because the fonts are embedded, `make check` asserts that any board naming a `face` also carries an embedded font, rather than checking what happens to be installed. That check works in CI, where no fonts are installed at all.
