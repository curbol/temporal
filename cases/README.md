# Cases

3D-printable parts. The STLs here are generated from
[`ergogen/config.yaml`](../ergogen/config.yaml) by `make gen`; edit the config, not
these files. This README is the one thing in the folder `make clean` keeps.

```
cases/
├── mcu_cover.stl
├── 38/
│   ├── top_plate.stl
│   ├── left.stl            right.stl
│   └── kickstand_left.stl  kickstand_right.stl
└── 42/                     (same layout)
```

## What to print

| part | quantity | notes |
|---|---|---|
| `NN/left.stl` and `NN/right.stl` | 1 each | the case halves, or the `kickstand_` pair instead |
| `NN/top_plate.stl` | 2 | one file, printed twice and flipped for the second hand |
| `mcu_cover.stl` | 2 | shared by both key counts |

`NN` is your key count: `42` if you keep the full pinky column, `38` if you snap it off.
A `42` case also fits the 41 and 40-key encoder configurations, and a `38` case the 37
and 36. Print the plain pair or the `kickstand_` pair, not both; the kickstand is a wedge
fused to the case for tenting.

[The build guide](../docs/build-guide.md#choose-your-build) walks through this alongside
the PCB and plate choices, and [docs/bom.md](../docs/bom.md) lists the hardware.

## One case, every build

There is no variant to choose. The case carries the clearances for all four switch and
mounting combinations at once:

- Choc v1 centre and side posts
- the Choc v2 centre boss and its corner stabilizer pin
- hotswap sockets, which stand 1.95mm off the back of the PCB
- the pins of switches soldered straight to the board

The floor is 2.35mm, which is the socket depth plus a 0.4mm skin. That makes every one
of those pockets blind, so the bottom face is solid and none of them shows through.

Print the halves bottom-down. Every pocket opens upward, so nothing needs support.

## FR-4 alternative

The top plate and MCU cover also exist as orderable PCBs
([`gerbers/`](../gerbers/)), and there is an FR-4 back plate that replaces the printed
case entirely, held off the board by 3mm standoffs. See
[the build guide](../docs/build-guide.md#fr-4-plate-alternative).
