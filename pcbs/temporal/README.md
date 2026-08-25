# Temporal PCB

This directory is **not automatically overwritten** during `make gen`.

## Why?

This PCB is preserved to protect manual edits like custom traces, vias, etc.

## How to Regenerate

To get a fresh copy from Ergogen, delete this entire folder:

```bash
rm -rf pcbs/temporal
```

Then run:

```bash
make gen
```

The folder and PCB files will be recreated from the Ergogen configuration.

## Manual Steps in KiCad

After regenerating the PCB, route the connections Ergogen does not place
automatically. Ground planes, silkscreen text keepouts, via stitching and zone
fills are all applied by `make gen` before the board is copied here, so they need
no manual work.

## Keeping This Board Current

Because this directory is never overwritten, the post-processing steps run against
`ergogen/output/pcbs` and reach this board only when it is regenerated. Editing the
`zones`, `via_stitching` or `text_keepouts` sections of `scripts/kicad_config.yaml`
updates every other board but leaves this one as it was. `make check` fails when the
pour no longer matches the custom DRC rules; a via stitching or keepout change needs
a full regeneration and a re-route.
