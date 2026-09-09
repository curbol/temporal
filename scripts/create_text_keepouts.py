#!/usr/bin/env python3
"""
Create rule areas (keepouts) around silkscreen text so zone fills do not
overlap it.

Usage:
    python3 create_text_keepouts.py <gap_mm> <layers> <patterns> <board> [board ...]

<layers> is comma-separated, <patterns> is pipe-separated. Prints a JSON map of
board path to the number of texts matched, the number that received at least one
keepout zone, and a per-pattern hit count, or -1 for a board that failed. The
per-pattern counts let the caller fail a pattern that stopped matching anything,
which would otherwise leave its lettering to be buried by the pour.
"""
import sys
import os

# Suppress wxWidgets sizer flag assertions
os.environ['WXSUPPRESS_SIZER_FLAGS_CHECK'] = '1'

import pcbnew

# pcbnew.py iterates its containers by calling next() on the SWIG iterator, which newer
# SWIG builds expose only as __next__. Without this, GetDrawings() raises AttributeError.
if not hasattr(pcbnew.SwigPyIterator, 'next'):
    pcbnew.SwigPyIterator.next = pcbnew.SwigPyIterator.__next__

try:
    import wx
    if not wx.App.Get():
        _ = wx.App()
except Exception:
    pass

def mm_to_iu(mm):
    return int(mm * 1000000)

def create_text_keepouts(board_path, gap_mm, layers, text_patterns):
    try:
        board = pcbnew.LoadBoard(board_path)

        gap_iu = mm_to_iu(gap_mm)
        created_count = 0
        created_groups = 0
        matched_texts = 0
        pattern_hits = {}

        layer_ids = []
        for layer_name in layers:
            layer_id = board.GetLayerID(layer_name)
            if layer_id != pcbnew.UNDEFINED_LAYER:
                layer_ids.append((layer_name, layer_id))

        # Board drawings and footprint graphics both carry silkscreen text.
        text_objects = []

        for drawing in board.GetDrawings():
            if drawing.GetClass() == 'PCB_TEXT':
                text_objects.append(drawing)

        for footprint in board.GetFootprints():
            for item in footprint.GraphicalItems():
                if item.GetClass() == 'PCB_TEXT':
                    text_objects.append(item)

        for drawing in text_objects:
            text_layer = drawing.GetLayer()

            matching_layer = None
            for layer_name, layer_id in layer_ids:
                if text_layer == layer_id:
                    matching_layer = (layer_name, layer_id)
                    break

            if not matching_layer:
                continue

            text_content = drawing.GetText()

            hit = [pattern for pattern in text_patterns if pattern in text_content]

            if text_patterns and not hit:
                continue

            for pattern in hit:
                pattern_hits[pattern] = pattern_hits.get(pattern, 0) + 1

            matched_texts += 1

            # GetEffectiveShape returns the stroked outline, so the keepout
            # follows the glyphs at their rendered pen width.
            max_error = 5000  # 0.005mm in internal units

            poly_set = pcbnew.SHAPE_POLY_SET()

            try:
                shape = drawing.GetEffectiveShape()
                shape.TransformToPolygon(poly_set, max_error, pcbnew.ERROR_INSIDE)
            except Exception:
                try:
                    drawing.TransformShapeToPolygon(poly_set, text_layer, 0, max_error, pcbnew.ERROR_INSIDE, False)
                except Exception as shape_err:
                    print(f"Error: could not outline {text_content!r} in {board_path}: {shape_err}",
                          file=sys.stderr)
                    continue

            if poly_set.OutlineCount() == 0:
                print(f"Error: {text_content!r} in {board_path} produced no outline", file=sys.stderr)
                continue

            if gap_iu != 0:
                poly_set.Inflate(gap_iu, pcbnew.CORNER_STRATEGY_ROUND_ALL_CORNERS, 5000)

            # Fracturing removes self-intersections.
            poly_set.Fracture()

            # Create a group for all zones of this text
            safe_text = ''.join(c if c.isalnum() or c in ' -_' else '_' for c in text_content)
            group = pcbnew.PCB_GROUP(board)
            group.SetName(f"TEXT_{safe_text[:20]}")
            board.Add(group)
            zones_before = created_count

            # Create a separate keepout zone for each outline segment (per character part)
            for outline_idx in range(poly_set.OutlineCount()):
                outline = poly_set.Outline(outline_idx)

                if outline.PointCount() < 3:
                    continue

                zone = pcbnew.ZONE(board)
                zone.SetIsRuleArea(True)
                # KiCad 10 renamed this setter
                if hasattr(zone, 'SetDoNotAllowZoneFills'):
                    zone.SetDoNotAllowZoneFills(True)
                else:
                    zone.SetDoNotAllowCopperPour(True)
                zone.SetDoNotAllowTracks(False)
                zone.SetDoNotAllowVias(False)
                zone.SetDoNotAllowPads(False)
                zone.SetDoNotAllowFootprints(False)

                # The keepout sits on the copper layer facing its silkscreen.
                if 'F.' in matching_layer[0]:
                    zone.SetLayer(board.GetLayerID('F.Cu'))
                else:
                    zone.SetLayer(board.GetLayerID('B.Cu'))

                zone.SetZoneName(f"TEXT_{safe_text[:20]}_{outline_idx}")

                for pt_idx in range(outline.PointCount()):
                    pt = outline.CPoint(pt_idx)
                    zone.AppendCorner(pt, -1)

                board.Add(zone)
                group.AddItem(zone)
                created_count += 1

            # Only a group that actually holds a zone protects its text. Counting
            # the group itself would report success for a text whose outlines all
            # collapsed below three points, leaving it to be buried by the pour.
            if created_count == zones_before:
                print(f"Error: {text_content!r} in {board_path} produced no keepout zone",
                      file=sys.stderr)
                board.Remove(group)
                continue

            created_groups += 1

        pcbnew.SaveBoard(board_path, board)

        return {"matched": matched_texts, "groups": created_groups, "patterns": pattern_hits}

    except Exception as err:
        import traceback
        print(f"Error: {err}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return {"matched": -1, "groups": -1, "patterns": {}}

def process_all_boards(board_paths, gap_mm, layers, patterns):
    """Process all boards in a single Python session to avoid wx.App issues."""
    results = {}
    for board_path in board_paths:
        results[board_path] = create_text_keepouts(board_path, gap_mm, layers, patterns)

    import json
    print(json.dumps(results))

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: create_text_keepouts.py <gap_mm> <layers> <patterns> <board> [board ...]")
        sys.exit(1)

    gap_mm = float(sys.argv[1])
    layers = sys.argv[2].split(',') if sys.argv[2] else []
    patterns = sys.argv[3].split('|') if sys.argv[3] else []
    board_paths = sys.argv[4:]

    process_all_boards(board_paths, gap_mm, layers, patterns)
