#!/usr/bin/env python3
"""
Apply the KiCad 10 compatibility patches to the ViaStitching plugin's FillArea.py.

KiCad 10 moved a via's width onto its padstack, so GetWidth() no longer returns the
copper diameter the clearance maths needs. The plugin still calls it, which spaces
the stitching vias off the wrong width. Both call sites are rewritten to prefer
GetFrontWidth() where it exists.

This replaced two `sed -i` calls in the deps target. BSD sed, which is what macOS
ships, does not turn a `\\n` in the replacement into a newline, so it wrote a literal
'n' and produced a file that still contained both marker strings and no longer
parsed. Patching here keeps one implementation for both platforms, and the file is
compiled afterwards so a partial apply cannot be reported as success.

Usage:
    python3 patch_fill_area.py <path to FillArea.py>
"""

import py_compile
import sys

PATCHES = [
    (
        "dist = self.clearance + self.size / 2 + via.GetWidth() / 2",
        'via_width = via.GetFrontWidth() if hasattr(via, "GetFrontWidth") else via.GetWidth()\n'
        "        dist = self.clearance + self.size / 2 + via_width / 2",
        "via_width = via.GetFrontWidth()",
    ),
    (
        'clearance = max(track.GetOwnClearance(UNDEFINED_LAYER, ""), self.clearance, '
        "max_target_area_clearance) + (self.size / 2) + (track.GetWidth() / 2)",
        "track_width = track.GetFrontWidth() if (isinstance(track, PCB_VIA) and "
        'hasattr(track, "GetFrontWidth")) else track.GetWidth()\n'
        '            clearance = max(track.GetOwnClearance(UNDEFINED_LAYER, ""), self.clearance, '
        "max_target_area_clearance) + (self.size / 2) + (track_width / 2)",
        "track_width = track.GetFrontWidth()",
    ),
]


def main():
    if len(sys.argv) != 2:
        print("Usage: patch_fill_area.py <path to FillArea.py>", file=sys.stderr)
        return 1

    path = sys.argv[1]

    try:
        with open(path, encoding="utf-8") as handle:
            source = handle.read()
    except OSError as err:
        print(f"Error: could not read {path}: {err}", file=sys.stderr)
        return 1

    for original, patched, marker in PATCHES:
        if marker in source:
            continue

        if original not in source:
            print(
                f"Error: ViaStitching KiCad 10 patch does not apply in {path}.",
                file=sys.stderr,
            )
            print(
                "Upstream FillArea.py has changed; update PATCHES in "
                "scripts/patch_fill_area.py.",
                file=sys.stderr,
            )
            return 1

        source = source.replace(original, patched, 1)

    with open(path, "w", encoding="utf-8") as handle:
        handle.write(source)

    missing = [marker for _, _, marker in PATCHES if marker not in source]

    if missing:
        print(f"Error: patched {path} is missing {', '.join(missing)}.", file=sys.stderr)
        return 1

    try:
        py_compile.compile(path, doraise=True)
    except py_compile.PyCompileError as err:
        print(f"Error: patched {path} does not parse: {err}", file=sys.stderr)
        return 1

    print("ViaStitching KiCad 10 compatibility patches verified")
    return 0


if __name__ == "__main__":
    sys.exit(main())
