# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A hardware repo, not a software one. It builds a 36-42 key split ergonomic keyboard: PCBs, plates, gerbers, JLCPCB assembly files, and 3D-printable cases. There is no test suite and no linter; verification means running the build and inspecting the outputs in KiCad (DRC) or a slicer/mesh viewer.

## Commands

```bash
make deps      # Install openscad, kicad, inkscape, Maple Mono NF, and the ViaStitching KiCad plugin
make gen       # Full build: clean → ergogen → post-process → renders → gerbers → JLCPCB → STLs
make gerbers   # Export + zip gerbers for every pcbs/*/*.kicad_pcb
make assembly  # Regenerate jlcpcb/ BOM + CPL from pcbs/temporal
make convert   # JSCAD → STL only (slowest stage; minutes)
make clean     # Delete ergogen/output, cases/, gerbers/, jlcpcb/, and all of pcbs/ EXCEPT pcbs/temporal
```

Individual post-processing steps are plain node scripts and can be re-run alone, e.g. `node scripts/via_stitching.js`, `node scripts/fill_zones.js`, `node scripts/setup_kicad_project.js pcbs/top_plate_42/top_plate_42.kicad_pcb`.

`make gen` rewrites hundreds of committed binary/generated files (STLs, gerber zips, PCB renders). Expect a large diff; that is normal, not a bug.

## Architecture

`ergogen/config.yaml` (~1700 lines) is the single source of truth. Everything else is derived from it, either by Ergogen itself or by the post-processing scripts. Change the geometry there, never in a generated `.kicad_pcb` or `.stl`.

The config is ordered `units` → `points` → `outlines` → `cases` → `pcbs`. `units` holds every tuning constant (switch dimensions, wall thickness, splay, MCU/display/battery offsets) as named values; downstream sections reference them arithmetically, so a dimension change is a one-line edit at the top.

Build pipeline as run by `make gen`:

1. `npm run gen` → Ergogen emits `ergogen/output/{pcbs,cases,outlines}`, then `scripts/generate_layout.js` derives `temporal.json` (ZMK Studio physical layout) from the same points.
2. Post-processing, in this order (each mutates the `.kicad_pcb` files in place, so order matters):
   - `fix_edge_cuts.js` drops near-zero-length Edge.Cuts segments Ergogen emits at curves, which otherwise fail DRC as malformed outlines.
   - `add_ground_planes.js` adds F.Cu/B.Cu GND zones following the board outline.
   - `create_text_keepouts.js` adds rule areas around named silkscreen text so the pour does not swallow it.
   - `via_stitching.js` grid-stitches GND vias via the ViaStitching plugin.
   - `fill_zones.js` writes each board's `.kicad_dru` custom DRC rules, then fills all zones (the filler honours those rules, so they must exist first).
   - `copy_pcb_if_missing.sh` copies Ergogen PCBs into `pcbs/<name>/` **only if absent**.
   - `setup_kicad_project.js` writes `.kicad_pro` and `.kicad_dru` files from `scripts/kicad_config.yaml`.
   - `create_stealth_variants.js` derives `top_plate_{38,42}_stealth` from the generated top plates by stripping silkscreen text.
3. Renders (`kicad-cli pcb render`), gerbers, JLCPCB BOM/CPL, then `convert_jscad.js` for STLs.

`pcbs/temporal/` is hand-routed and deliberately never overwritten: `make clean` skips it and `copy_pcb_if_missing.sh` won't clobber it. Traces added manually in KiCad live only there. To regenerate it you must `rm -rf pcbs/temporal` first, and the manual routing has to be redone (see `pcbs/temporal/README.md`). All other `pcbs/*` directories are disposable.

The two Python scripts (`via_stitching.py`, `fill_zones.py`) are not run directly; their JS wrappers locate KiCad's bundled interpreter through `scripts/kicad_python.js` and shell out to it, because `pcbnew` is only importable from that interpreter.

## Conventions

Naming inside `ergogen/config.yaml`:

- A leading `_` marks an intermediate outline/case/pcb. Ergogen skips those when writing output; they exist only to be composed into exported ones.
- `_left` is generated directly; `_m_right` is generated as the mirror source and `convert_jscad.js` mirrors it into `<name>_right.stl`. A name with neither suffix is a shared part. The `_m_right` suffix never survives into `cases/`.
- Variants encode key count in the name (`38` = breakoff pinky column, `42` = full pinky column) and options as further suffixes (`socket`/`solder`, `kickstand`, `stealth`).

Tuning values belong in YAML, not in script bodies. `scripts/kicad_config.yaml` owns net classes, design rules, custom DRC rules, zone/via-stitching parameters, keepout text patterns, and the JLCPCB part numbers plus embedded-resistor positions. Adding a JLCPCB assembly part or changing a trace width is a config edit, not a code edit.

`ergogen/footprints/ceoloide/` is vendored from ceoloide's library and locally patched (notably `switch_choc_v1_v2.js`). Do not replace those files wholesale with upstream versions; diff first.
