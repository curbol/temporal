#!/usr/bin/env python3
"""Process STL mesh with optional mirroring."""
import sys
import pyvista as pv

if len(sys.argv) < 3:
    print("Usage: meshfix.py input.stl output.stl [--mirror]")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]
mirror = "--mirror" in sys.argv

# Load mesh with pyvista
mesh = pv.read(input_path)

if mirror:
    # Mirror on YZ plane (negate X coordinates)
    mesh.points[:, 0] *= -1
    # Flip face winding to maintain correct normals
    faces = mesh.faces.reshape(-1, 4)
    faces[:, 1:4] = faces[:, 3:0:-1]
    mesh.faces = faces.flatten()

# Save mesh
mesh.save(output_path)
