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

# Suppress wxWidgets sizer flag assertions
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

# KiCad 10 made aInferOutlineIfNecessary a required positional argument, while the
# ViaStitching plugin calls this with the outline alone.
_orig_get_outlines = pcbnew.BOARD.GetBoardPolygonOutlines


def _get_outlines_compat(self, aOutlines, *args, **kwargs):
    if not args and not kwargs:
        return _orig_get_outlines(self, aOutlines, True)
    return _orig_get_outlines(self, aOutlines, *args, **kwargs)


pcbnew.BOARD.GetBoardPolygonOutlines = _get_outlines_compat

# ViaStitching gates four code paths on `Version() < "7"`, comparing pcbnew's version
# string lexicographically. That makes "10.0.5" sort below "7", so KiCad 10 takes the
# pre-7 branches, which hit-test against filled zone polygons instead of zone outlines.
_orig_version = pcbnew.Version


def _version_parts(value):
    parts = []
    for chunk in str(value).split("."):
        digits = ""
        for char in chunk:
            if not char.isdigit():
                break
            digits += char
        parts.append(int(digits) if digits else 0)
    return parts


class _ComparableVersion(str):
    def __lt__(self, other):
        return _version_parts(self) < _version_parts(other)

    def __le__(self, other):
        return _version_parts(self) <= _version_parts(other)

    def __gt__(self, other):
        return _version_parts(self) > _version_parts(other)

    def __ge__(self, other):
        return _version_parts(self) >= _version_parts(other)


def _version_compat():
    return _ComparableVersion(_orig_version())


pcbnew.Version = _version_compat

# pcbnew needs a wx.App even when nothing is displayed
app = wx.App()


# FillArea reports its via count only through the wx log.
class ViaCountLogTarget(wx.Log):
    def __init__(self):
        super().__init__()
        self.via_count = None

    def DoLogText(self, msg):
        if "vias placed" in msg:
            import re

            match = re.search(r"(\d+) vias placed", msg)
            if match:
                self.via_count = int(match.group(1))


log_target = ViaCountLogTarget()
wx.Log.SetActiveTarget(log_target)

# Import FillArea directly (avoiding plugin registration issues)
try:
    import glob
    import platform

    search_patterns = []

    if platform.system() == "Darwin":  # macOS
        search_patterns = [
            os.path.expanduser("~/Documents/KiCad/*/scripting/plugins/ViaStitching"),
            os.path.expanduser(
                "~/Library/Application Support/kicad/*/scripting/plugins/ViaStitching"
            ),
        ]
    elif platform.system() == "Windows":
        search_patterns = [
            os.path.expanduser("~/Documents/KiCad/*/scripting/plugins/ViaStitching"),
            os.path.join(
                os.getenv("APPDATA", ""), "kicad/*/scripting/plugins/ViaStitching"
            ),
        ]
    else:  # Linux
        # KICAD_USER_DIR in the Makefile, which is where `make deps` applies the
        # KiCad 10 patches, comes first.
        search_patterns = [
            os.path.expanduser("~/.local/share/kicad/*/scripting/plugins/ViaStitching"),
            os.path.expanduser("~/.config/kicad/*/scripting/plugins/ViaStitching"),
        ]

    via_stitching_dir = None
    for pattern in search_patterns:
        matches = glob.glob(pattern)
        if matches:
            # Latest version when several are installed.
            via_stitching_dir = sorted(matches)[-1]
            break

    if not via_stitching_dir or not os.path.exists(via_stitching_dir):
        raise ImportError("ViaStitching plugin directory not found")

    if via_stitching_dir not in sys.path:
        sys.path.insert(0, via_stitching_dir)

    # Import FillArea module directly, not through the plugin __init__.py
    from FillArea import FillArea

    # `make deps` rewrites two clearance calculations for KiCad 10 padstack vias.
    # An unpatched copy still imports and still runs, but spaces the stitching
    # vias off the wrong width, so check rather than trust the install.
    import inspect

    _fill_area_source = inspect.getsource(FillArea)
    for _marker in ("via.GetFrontWidth()", "track.GetFrontWidth()"):
        if _marker not in _fill_area_source:
            raise ImportError(
                f"{via_stitching_dir}/FillArea.py is missing the KiCad 10 patch "
                f"({_marker}). Re-run 'make deps'."
            )
except ImportError as e:
    print(f"Error: could not import ViaStitching FillArea: {e}", file=sys.stderr)
    print(
        "Make sure the ViaStitching plugin is installed in KiCad's scripting/plugins directory",
        file=sys.stderr,
    )
    sys.exit(1)


def add_via_stitching(pcb_path, net_name, step_mm, size_mm, drill_mm, clearance_mm):
    """
    Number of vias placed, or -1 on error. size_mm is the copper diameter and
    drill_mm the hole; both are in millimetres, as is step_mm and clearance_mm.
    """
    if not os.path.exists(pcb_path):
        print(f"Error: PCB file not found: {pcb_path}", file=sys.stderr)
        return -1

    try:
        log_target.via_count = None

        filler = FillArea(pcb_path)
        filler.SetNetname(net_name)
        filler.SetStepMM(step_mm)
        filler.SetSizeMM(size_mm)
        filler.SetDrillMM(drill_mm)
        filler.SetClearanceMM(clearance_mm)

        filler.Run()

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
