#!/bin/bash
# Copy Ergogen's boards into pcbs/, skipping any that already exist. That is what
# keeps the hand routing in pcbs/temporal: to get a fresh board, delete it first.

set -e

ERGOGEN_OUTPUT="ergogen/output/pcbs"

# Board names come from the pcbs: section of ergogen/config.yaml so this list
# cannot drift from what the build actually generates
mapfile -t PCB_FILES < <(node -e "require('./scripts/ergogen_config').pcbNames().forEach(n => console.log(n))")

if [ ${#PCB_FILES[@]} -eq 0 ]; then
  echo "Error: no boards found under pcbs: in ergogen/config.yaml" >&2
  exit 1
fi

COPIED=0
SKIPPED=0

for pcb in "${PCB_FILES[@]}"; do
  DEST_DIR="pcbs/$pcb"
  mkdir -p "$DEST_DIR"

  if [ ! -f "$DEST_DIR/$pcb.kicad_pcb" ]; then
    cp "$ERGOGEN_OUTPUT/$pcb.kicad_pcb" "$DEST_DIR/$pcb.kicad_pcb"
    COPIED=$((COPIED + 1))

    if [ "$pcb" = "temporal" ]; then
      cat >"$DEST_DIR/README.md" <<'EOF'
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
EOF
    fi
  else
    SKIPPED=$((SKIPPED + 1))
  fi
done

if [ $COPIED -gt 0 ]; then
  echo "✓ Copied $COPIED PCB files to pcbs/"
fi
if [ $SKIPPED -gt 0 ]; then
  echo "  Skipped $SKIPPED existing files"
fi
