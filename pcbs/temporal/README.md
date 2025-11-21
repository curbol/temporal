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
