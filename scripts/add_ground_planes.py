#!/usr/bin/env python3
"""
Add GND copper pour zones to KiCad PCB files.

Creates filled copper zones on F.Cu and B.Cu layers connected to the GND net,
following the board outline from Edge.Cuts layer.
"""

import re
import sys
import uuid
from pathlib import Path


def generate_uuid():
    """Generate a KiCad-compatible UUID (8-8-4-4-12 format)."""
    return str(uuid.uuid4())


def calculate_bounding_box(content, margin=2.0):
    """
    Calculate a rectangular bounding box that covers the entire board.
    Returns a list of 4 (x, y) coordinate tuples forming a rectangle.

    Parameters:
    - content: PCB file content
    - margin: Extra margin in mm to add around the board (default 2mm)
    """
    # Find all Edge.Cuts gr_line segments
    line_pattern = re.compile(
        r'\(gr_line\s+\(start\s+([-\d.]+)\s+([-\d.]+)\)\s+\(end\s+([-\d.]+)\s+([-\d.]+)\)\s+\(layer\s+Edge\.Cuts\)',
        re.DOTALL
    )

    # Collect all x and y coordinates
    x_coords = []
    y_coords = []

    for match in line_pattern.finditer(content):
        start_x = float(match.group(1))
        start_y = float(match.group(2))
        end_x = float(match.group(3))
        end_y = float(match.group(4))

        x_coords.extend([start_x, end_x])
        y_coords.extend([start_y, end_y])

    if not x_coords or not y_coords:
        return []

    # Calculate bounding box with margin
    min_x = min(x_coords) - margin
    min_y = min(y_coords) - margin
    max_x = max(x_coords) + margin
    max_y = max(y_coords) + margin

    # Return rectangle as 4 points: bottom-left, bottom-right, top-right, top-left
    bounding_box = [
        (min_x, min_y),  # bottom-left
        (max_x, min_y),  # bottom-right
        (max_x, max_y),  # top-right
        (min_x, max_y)   # top-left
    ]

    return bounding_box


def create_zone_definition(net_number, net_name, layer, points, tstamp):
    """
    Create a KiCad zone definition with hatch fill pattern.

    Parameters:
    - net_number: Net number (e.g., 3 for GND)
    - net_name: Net name string (e.g., "GND")
    - layer: Layer name (e.g., "F.Cu" or "B.Cu")
    - points: List of (x, y) coordinate tuples for polygon
    - tstamp: UUID for the zone
    """
    # Format polygon points
    pts_str = "\n".join([f"        (xy {x} {y})" for x, y in points])

    zone = f"""  (zone
    (net {net_number})
    (net_name "{net_name}")
    (layer "{layer}")
    (uuid "{tstamp}")
    (hatch edge 0.5)
    (priority 0)
    (connect_pads
      (clearance 0.2)
    )
    (min_thickness 0.2)
    (filled_areas_thickness no)
    (fill yes
      (thermal_gap 0.254)
      (thermal_bridge_width 0.4)
      (smoothing fillet)
      (radius 0.5)
      (hatch_thickness 0.5)
      (hatch_gap 0.5)
      (hatch_orientation 45)
      (hatch_smoothing_level 1)
      (hatch_smoothing_value 0.1)
      (hatch_border_algorithm hatch_thickness)
      (hatch_min_hole_area 0.3)
    )
    (polygon
      (pts
{pts_str}
      )
    )
  )
"""
    return zone


def find_highest_net_number(content):
    """Find the highest net number in the PCB file."""
    net_pattern = re.compile(r'\(net\s+(\d+)\s+"[^"]*"\)')
    net_numbers = [int(match.group(1)) for match in net_pattern.finditer(content)]
    return max(net_numbers) if net_numbers else 0


def find_gnd_net(content):
    """
    Find the GND net number from the PCB file.
    Returns tuple of (net_number, net_name) or None if not found.
    """
    # Pattern: (net 3 "GND")
    net_pattern = re.compile(r'\(net\s+(\d+)\s+"GND"\)', re.IGNORECASE)
    match = net_pattern.search(content)

    if match:
        return (int(match.group(1)), "GND")

    return None


def create_gnd_net(content):
    """
    Create a GND net in the PCB file if it doesn't exist.
    Returns tuple of (modified_content, net_number).
    """
    # Find the highest existing net number
    next_net_number = find_highest_net_number(content) + 1

    # Find the nets section and add GND net after the last net definition
    # Look for pattern like: (net 0 "") or (net 1 "some_net")
    nets_pattern = re.compile(r'(\(net\s+\d+\s+"[^"]*"\)\s*\n)', re.MULTILINE)
    matches = list(nets_pattern.finditer(content))

    if not matches:
        print(f"  ⚠ Could not find nets section in PCB file")
        return content, None

    # Insert after the last net definition
    last_match = matches[-1]
    insert_pos = last_match.end()

    gnd_net_definition = f'  (net {next_net_number} "GND")\n'

    modified_content = (
        content[:insert_pos] +
        gnd_net_definition +
        content[insert_pos:]
    )

    return modified_content, next_net_number


def zones_already_exist(content):
    """Check if GND zones already exist in the file."""
    zone_pattern = re.compile(r'\(zone.*?\(net_name\s+"GND"\)', re.DOTALL)
    return bool(zone_pattern.search(content))


def process_pcb_file(filepath):
    """Add GND zones to a KiCad PCB file."""
    print(f"Processing {filepath}...")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if zones already exist
    if zones_already_exist(content):
        print(f"  ⚠ GND zones already exist, skipping")
        return False

    # Find or create GND net
    gnd_net = find_gnd_net(content)
    if not gnd_net:
        print(f"  GND net not found, creating one...")
        content, net_number = create_gnd_net(content)
        if net_number is None:
            return False
        net_name = "GND"
        print(f"  Created GND net: net {net_number}")
    else:
        net_number, net_name = gnd_net
        print(f"  Found GND net: net {net_number}")

    # Calculate bounding box around board
    points = calculate_bounding_box(content, margin=2.0)
    if not points:
        print(f"  ⚠ No Edge.Cuts found, skipping")
        return False

    print(f"  Calculated bounding box: {len(points)} corners")

    # Generate zones for F.Cu and B.Cu
    front_zone = create_zone_definition(
        net_number, net_name, "F.Cu", points, generate_uuid()
    )
    back_zone = create_zone_definition(
        net_number, net_name, "B.Cu", points, generate_uuid()
    )

    # Find the insertion point (before the closing parenthesis)
    # We'll insert zones just before the final closing paren
    last_paren = content.rfind(')')
    if last_paren == -1:
        print(f"  ⚠ Malformed PCB file, skipping")
        return False

    # Insert zones
    modified_content = (
        content[:last_paren] +
        f"\n{front_zone}\n{back_zone}\n" +
        content[last_paren:]
    )

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(modified_content)

    print(f"  ✓ Added GND zones to F.Cu and B.Cu")
    print(f"     Clearance: 0.2mm, Thermal gap: 0.254mm, Bridge: 0.4mm")
    return True


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

    processed = 0
    for pcb_file in pcb_files:
        if process_pcb_file(pcb_file):
            processed += 1

    print(f"\n✓ Added GND zones to {processed}/{len(pcb_files)} PCB files")
    print("Note: Zones will be filled when you first open the PCB in KiCad")


if __name__ == "__main__":
    main()
