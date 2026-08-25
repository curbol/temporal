#!/bin/bash
# Copy PCB files from ergogen output to pcbs/ directory only if they don't exist
# This allows manual routing without overwriting work
# To get a fresh copy, delete the destination file first

set -e

# Source directory
ERGOGEN_OUTPUT="ergogen/output/pcbs"

# Board names come from the pcbs: section of ergogen/config.yaml so this list
# cannot drift from what the build actually generates
mapfile -t PCB_FILES < <(node -e "require('./scripts/ergogen_config').pcbNames().forEach(n => console.log(n))")

if [ ${#PCB_FILES[@]} -eq 0 ]; then
  echo "Error: no boards found under pcbs: in ergogen/config.yaml" >&2
  exit 1
fi

# Counters for summary
COPIED=0
SKIPPED=0

# Copy each PCB file if it doesn't exist
for pcb in "${PCB_FILES[@]}"; do
  DEST_DIR="pcbs/$pcb"
  mkdir -p "$DEST_DIR"

  if [ ! -f "$DEST_DIR/$pcb.kicad_pcb" ]; then
    cp "$ERGOGEN_OUTPUT/$pcb.kicad_pcb" "$DEST_DIR/$pcb.kicad_pcb"
    COPIED=$((COPIED + 1))

    # Create README for temporal PCB explaining regeneration process
    if [ "$pcb" = "temporal" ]; then
      cat >"$DEST_DIR/README.md" <<'EOF'
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
EOF
    fi
  else
    SKIPPED=$((SKIPPED + 1))
  fi
done

# Output summary
if [ $COPIED -gt 0 ]; then
  echo "✓ Copied $COPIED PCB files to pcbs/"
fi
if [ $SKIPPED -gt 0 ]; then
  echo "  Skipped $SKIPPED existing files"
fi
