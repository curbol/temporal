#!/usr/bin/env python3
"""
Fill zones in a KiCad PCB file using the pcbnew API.

Usage:
    python3 fill_zones.py <path_to_pcb_file>

This script:
1. Loads the specified PCB file
2. Fills all zones in the board
3. Saves the board back to the same file

Exit codes:
    0 - Success
    1 - Error (file not found, pcbnew import failed, etc.)
"""

import sys
import os

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

# Suppress wx debug messages
if hasattr(wx, "Log"):
    wx.Log.SetLogLevel(0)

# Initialize wxPython application (required for pcbnew API)
app = wx.App()


def fill_zones(pcb_path):
    """
    Fill all zones in a KiCad PCB file.

    Args:
        pcb_path: Path to the .kicad_pcb file

    Returns:
        True on success, False on error
    """
    if not os.path.exists(pcb_path):
        print(f"Error: PCB file not found: {pcb_path}", file=sys.stderr)
        return False

    try:
        # Load the board
        board = pcbnew.LoadBoard(pcb_path)

        # Create a zone filler
        filler = pcbnew.ZONE_FILLER(board)

        # Get all zones
        zones = board.Zones()

        if len(zones) == 0:
            # No zones to fill
            return True

        # Fill all zones
        filler.Fill(zones)

        # Save the board
        pcbnew.SaveBoard(pcb_path, board)

        return True

    except Exception as e:
        print(f"Error filling zones in {pcb_path}: {str(e)}", file=sys.stderr)
        return False


def main():
    if len(sys.argv) != 2:
        print("Usage: fill_zones.py <path_to_pcb_file>", file=sys.stderr)
        sys.exit(1)

    pcb_path = sys.argv[1]

    if fill_zones(pcb_path):
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
