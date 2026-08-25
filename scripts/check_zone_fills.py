#!/usr/bin/env python3
"""
Report whether each board's committed zone fills still match what the current
custom DRC rules produce.

Usage:
    python3 check_zone_fills.py <board> [board ...]

The pours in pcbs/ are filled once, when the board is first copied out of
ergogen/output. Nothing refills them afterwards, so a later edit to the zone or
custom-rule settings changes the generated boards while the copies keep the old
pour. This loads each board, refills it in memory, and compares the filled area
of every zone; nothing is written back, so the hand-routed board is untouched.

Areas are compared with a tolerance, because the same pour can serialize with a
different number of collinear vertices without covering different copper.

Prints a JSON map of board path to the number of zones whose filled area moved,
or -1 for a board that could not be read.
"""

import sys
import os
import json

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

if hasattr(wx, "Log"):
    wx.Log.SetLogLevel(0)

app = wx.App()

# Relative area change treated as the same pour
AREA_TOLERANCE = 1e-6


def stale_zone_count(pcb_path):
    """
    Number of zones whose filled area changes when the board is refilled.

    Returns -1 if the board could not be read.
    """
    try:
        board = pcbnew.LoadBoard(pcb_path)
        zones = board.Zones()

        if len(zones) == 0:
            return 0

        before = [zone.GetFilledArea() for zone in zones]
        pcbnew.ZONE_FILLER(board).Fill(zones)
        after = [zone.GetFilledArea() for zone in zones]

        stale = 0
        for old, new in zip(before, after):
            scale = max(abs(old), abs(new), 1.0)
            if abs(old - new) / scale > AREA_TOLERANCE:
                stale += 1

        return stale

    except Exception as err:
        print(f"Error checking zone fills in {pcb_path}: {err}", file=sys.stderr)
        return -1


def main():
    if len(sys.argv) < 2:
        print("Usage: check_zone_fills.py <board> [board ...]", file=sys.stderr)
        sys.exit(1)

    print(json.dumps({path: stale_zone_count(path) for path in sys.argv[1:]}))


if __name__ == "__main__":
    main()
