#!/bin/bash
# Copy PCB files from ergogen output to pcbs/ directory only if they don't exist
# This allows manual routing without overwriting work
# To get a fresh copy, delete the destination file first

set -e

# Source directory
ERGOGEN_OUTPUT="ergogen/output/pcbs"

# List of all PCB files to copy
PCB_FILES=(
  "temporal"
  "top_plate_38"
  "top_plate_40"
  "top_plate_42"
  "top_plate_44"
  "back_plate_38"
  "back_plate_40"
  "back_plate_42"
  "back_plate_44"
  "mcu_cover"
)

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

After regenerating the PCB, the following manual steps are needed:

2. **Add manual traces** - Route connections that Ergogen doesn't handle automatically

3. **(Optional) Create rule areas** - Add rule areas to exclude the "TEMPORAL" and "by curbol" silkscreen text from the ground plane fill
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
