# Temporal PCB

`make gen` never overwrites this directory.

## Why

This board is hand-routed in KiCad, and the traces and vias here cannot be
regenerated. The build leaves the `.kicad_pcb` alone and rewrites only the
`.kicad_pro` and `.kicad_dru` beside it.

## How to Regenerate

Delete the folder, then rebuild:

```bash
rm -rf pcbs/temporal
make gen
```

That recreates the directory and a fresh, unrouted board from
`ergogen/config.yaml`.

## Manual Steps in KiCad

After regenerating, route the connections Ergogen does not place. Ground planes,
silkscreen text keepouts, via stitching, and zone fills are all applied by
`make gen` before the board is copied here, so they need no manual work.

## Keeping This Board Current

The post-processing steps run against `ergogen/output/pcbs`, so they reach this
board only when it is regenerated. Editing the `zones`, `via_stitching`, or
`text_keepouts` sections of `scripts/kicad_config.yaml` updates every other board
and leaves this one as it was. `make check` fails when the pour no longer matches
the custom DRC rules; a via stitching or keepout change needs a full regeneration
and a re-route.
