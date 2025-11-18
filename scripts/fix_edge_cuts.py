#!/usr/bin/env python3
"""
Remove tiny Edge.Cuts segments from KiCad PCB files.

Ergogen sometimes generates very small segments on Edge.Cuts layer (usually at curves)
that are essentially zero-length and cause DRC "malformed outline" errors.
This script removes segments shorter than a specified threshold.
"""

import re
import sys
import math
from pathlib import Path

# Minimum segment length in mm - segments shorter than this will be removed
MIN_SEGMENT_LENGTH = 0.01  # 10 microns


def calculate_line_length(start_x, start_y, end_x, end_y):
    """Calculate Euclidean distance between two points."""
    return math.sqrt((end_x - start_x)**2 + (end_y - start_y)**2)


def calculate_arc_length(start_x, start_y, mid_x, mid_y, end_x, end_y):
    """
    Calculate approximate arc length using chord length as lower bound.
    For our purposes (detecting degenerate arcs), this is sufficient.
    """
    # Use chord length as approximation (actual arc is slightly longer)
    return calculate_line_length(start_x, start_y, end_x, end_y)


def process_pcb_file(filepath):
    """Process a KiCad PCB file and remove tiny Edge.Cuts segments."""
    print(f"Processing {filepath}...")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regular expressions for Edge.Cuts gr_line and gr_arc
    # gr_line pattern: (gr_line (start x1 y1) (end x2 y2) (layer Edge.Cuts) ...)
    line_pattern = re.compile(
        r'\(gr_line\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\).*?\)\s*\n',
        re.DOTALL
    )

    # gr_arc pattern: (gr_arc (start x1 y1) (mid x2 y2) (end x3 y3) (layer Edge.Cuts) ...)
    arc_pattern = re.compile(
        r'\(gr_arc\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(mid\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\).*?\)\s*\n',
        re.DOTALL
    )

    # Find and remove tiny gr_line segments
    removed_lines = 0
    for match in line_pattern.finditer(content):
        start_x = float(match.group(1))
        start_y = float(match.group(2))
        end_x = float(match.group(3))
        end_y = float(match.group(4))

        length = calculate_line_length(start_x, start_y, end_x, end_y)

        if length < MIN_SEGMENT_LENGTH:
            # Remove this segment
            content = content.replace(match.group(0), '', 1)
            removed_lines += 1
            print(f"  Removed line segment: length={length:.6f}mm at ({start_x:.3f}, {start_y:.3f})")

    # Find and remove tiny gr_arc segments
    removed_arcs = 0
    for match in arc_pattern.finditer(content):
        start_x = float(match.group(1))
        start_y = float(match.group(2))
        mid_x = float(match.group(3))
        mid_y = float(match.group(4))
        end_x = float(match.group(5))
        end_y = float(match.group(6))

        length = calculate_arc_length(start_x, start_y, mid_x, mid_y, end_x, end_y)

        if length < MIN_SEGMENT_LENGTH:
            # Remove this segment
            content = content.replace(match.group(0), '', 1)
            removed_arcs += 1
            print(f"  Removed arc segment: length≈{length:.6f}mm at ({start_x:.3f}, {start_y:.3f})")

    # Write back
    if removed_lines > 0 or removed_arcs > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Removed {removed_lines} line segments and {removed_arcs} arc segments")
    else:
        print(f"✓ No tiny segments found (all segments >= {MIN_SEGMENT_LENGTH}mm)")

    return removed_lines + removed_arcs


def main():
    """Process all PCB files in ergogen output directory."""
    output_dir = Path("ergogen/output/pcbs")

    if not output_dir.exists():
        print(f"Error: {output_dir} does not exist")
        print("Run 'npm run gen' first to generate PCB files")
        sys.exit(1)

    pcb_files = list(output_dir.glob("*.kicad_pcb"))

    if not pcb_files:
        print(f"No .kicad_pcb files found in {output_dir}")
        sys.exit(1)

    total_removed = 0
    for pcb_file in pcb_files:
        removed = process_pcb_file(pcb_file)
        total_removed += removed

    print(f"\n✓ Processed {len(pcb_files)} PCB files, removed {total_removed} tiny segments total")


if __name__ == "__main__":
    main()
