// Mirror STL file across YZ plane (flip left/right)
// Usage: openscad -o output.stl -D "input=\"input.stl\"" mirror_case.scad

mirror([1, 0, 0])
    import(input);
