#!/usr/bin/env python3
"""
Embed the fonts a board's text uses into the board file itself.

Usage:
    python3 embed_fonts.py <board> [board ...]

KiCad resolves a text item's `face` against the fonts installed on the machine
doing the export, and silently falls back to a different typeface when it cannot
find one. Embedding the font makes the board render the same everywhere: on a
fresh checkout, in CI, and in whatever viewer the fab opens it with.

The board-level `embedded_fonts` flag lives only in the s-expression, so the file
is saved once to normalize it, the flag is flipped in the text, and the board is
then reloaded so EmbedFonts() has somewhere to put the files.

Prints a JSON map of board path to the number of embedded font files, or -1 for a
board that could not be read.
"""

import sys
import os
import re
import json

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

if hasattr(wx, "Log"):
    wx.Log.SetLogLevel(0)

# pcbnew needs a wx.App even when nothing is displayed
app = wx.App()

FLAG_OFF = "(embedded_fonts no)"
FLAG_ON = "(embedded_fonts yes)"


def enable_flag(board_path):
    """Turn on the board-level embedded_fonts flag. True if it is now on."""
    with open(board_path, encoding="utf-8") as handle:
        content = handle.read()

    if content.rstrip().endswith(FLAG_ON + "\n)") or f"\n\t{FLAG_ON}" in content:
        return True

    index = content.rfind("\n\t" + FLAG_OFF)
    if index == -1:
        return False

    content = content[:index] + "\n\t" + FLAG_ON + content[index + len(FLAG_OFF) + 2:]
    with open(board_path, "w", encoding="utf-8") as handle:
        handle.write(content)

    return True


def embed_fonts(board_path):
    """Embed every font the board's text references. Returns the file count."""
    try:
        # Save once so KiCad writes the board-level embedded_fonts flag, which
        # only exists in the file format and has no Python setter.
        pcbnew.SaveBoard(board_path, pcbnew.LoadBoard(board_path))

        if not enable_flag(board_path):
            print(f"Error: no embedded_fonts flag in {board_path}", file=sys.stderr)
            return -1

        board = pcbnew.LoadBoard(board_path)
        board.EmbedFonts()
        pcbnew.SaveBoard(board_path, board)

        with open(board_path, encoding="utf-8") as handle:
            content = handle.read()

        return len(re.findall(r'\(name "[^"]+\.(?:ttf|otf)"', content, re.IGNORECASE))

    except Exception as err:
        print(f"Error embedding fonts in {board_path}: {err}", file=sys.stderr)
        return -1


def main():
    if len(sys.argv) < 2:
        print("Usage: embed_fonts.py <board> [board ...]", file=sys.stderr)
        sys.exit(1)

    print(json.dumps({path: embed_fonts(path) for path in sys.argv[1:]}))


if __name__ == "__main__":
    main()
