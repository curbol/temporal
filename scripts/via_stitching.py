#!/usr/bin/env python3
"""
Add via stitching to KiCad PCB files using the ViaStitching plugin.

Usage:
    python3 via_stitching.py <pcb_file> <net_name> <step_mm> <size_mm> <drill_mm> <clearance_mm>

Arguments:
    pcb_file: Path to the .kicad_pcb file
    net_name: Net name to add vias to (e.g., "GND")
    step_mm: Spacing between vias in mm (grid size)
    size_mm: Via copper diameter in mm
    drill_mm: Via drill hole diameter in mm
    clearance_mm: Clearance around vias in mm

Exit codes:
    0 - Success
    1 - Error
"""

import sys
import os

# Suppress wxWidgets debug messages
os.environ["WXSUPPRESS_SIZER_FLAGS_CHECK"] = "1"

try:
    import pcbnew
    import wx
except ImportError:
    print("Error: pcbnew or wx module not available", file=sys.stderr)
    print(
        "This script must be run with KiCad's bundled Python interpreter",
        file=sys.stderr,
    )
    sys.exit(1)

# Initialize wxPython application (required for pcbnew API)
app = wx.App()


# Custom log target to capture via count from FillArea
class ViaCountLogTarget(wx.Log):
    def __init__(self):
        super().__init__()
        self.via_count = None

    def DoLogText(self, msg):
        # Look for "Done. X vias placed" message
        if "vias placed" in msg:
            import re

            match = re.search(r"(\d+) vias placed", msg)
            if match:
                self.via_count = int(match.group(1))


log_target = ViaCountLogTarget()
wx.Log.SetActiveTarget(log_target)

# Import FillArea directly (avoiding plugin registration issues)
try:
    via_stitching_dir = os.path.expanduser(
        "~/Documents/KiCad/9.0/scripting/plugins/ViaStitching"
    )
    if via_stitching_dir not in sys.path:
        sys.path.insert(0, via_stitching_dir)
    # Import FillArea module directly, not through the plugin __init__.py
    from FillArea import FillArea
except ImportError as e:
    print(f"Error: Could not import ViaStitching FillArea: {e}", file=sys.stderr)
    print(
        "Make sure the ViaStitching plugin is installed at ~/Documents/KiCad/9.0/scripting/plugins/ViaStitching",
        file=sys.stderr,
    )
    sys.exit(1)


def add_via_stitching(pcb_path, net_name, step_mm, size_mm, drill_mm, clearance_mm):
    """
    Add via stitching to a KiCad PCB file.

    Args:
        pcb_path: Path to the .kicad_pcb file
        net_name: Net name to add vias to
        step_mm: Spacing between vias in mm
        size_mm: Via copper diameter in mm
        drill_mm: Via drill hole diameter in mm
        clearance_mm: Clearance around vias in mm

    Returns:
        Number of vias placed on success, -1 on error
    """
    if not os.path.exists(pcb_path):
        print(f"Error: PCB file not found: {pcb_path}", file=sys.stderr)
        return -1

    try:
        # Reset the via count
        log_target.via_count = None

        # Create FillArea instance and configure it
        filler = FillArea(pcb_path)
        filler.SetNetname(net_name)
        filler.SetStepMM(step_mm)
        filler.SetSizeMM(size_mm)
        filler.SetDrillMM(drill_mm)
        filler.SetClearanceMM(clearance_mm)

        # Run via stitching
        filler.Run()

        # Return the captured via count
        return log_target.via_count if log_target.via_count is not None else 0

    except Exception as e:
        print(f"Error adding via stitching to {pcb_path}: {str(e)}", file=sys.stderr)
        return -1


def main():
    if len(sys.argv) != 7:
        print(
            "Usage: via_stitching.py <pcb_file> <net_name> <step_mm> <size_mm> <drill_mm> <clearance_mm>",
            file=sys.stderr,
        )
        sys.exit(1)

    pcb_path = sys.argv[1]
    net_name = sys.argv[2]
    step_mm = float(sys.argv[3])
    size_mm = float(sys.argv[4])
    drill_mm = float(sys.argv[5])
    clearance_mm = float(sys.argv[6])

    via_count = add_via_stitching(
        pcb_path, net_name, step_mm, size_mm, drill_mm, clearance_mm
    )
    if via_count >= 0:
        # Output the via count for the JS wrapper to parse
        print(f"{via_count} vias placed")
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
