function mcu_cover_extrude_1_2_outline_fn(){
    return new CSG.Path2D([[168.7922031,-100.0730814],[168.7922031,-44.0306663]]).appendArc([167.7922031,-43.0306663],{"radius":1,"clockwise":false,"large":false}).appendPoint([149.2922031,-43.0306663]).appendArc([148.2922031,-44.0306663],{"radius":1,"clockwise":false,"large":false}).appendPoint([148.2922031,-90.6468606]).appendArc([148.8382126,-91.5378671],{"radius":1,"clockwise":false,"large":false}).appendPoint([167.3382126,-100.9640879]).appendArc([168.7922031,-100.0730814],{"radius":1,"clockwise":false,"large":false}).close().innerToCAG()
.subtract(
    CAG.circle({"center":[165.2922031,-96.0306663],"radius":1})
.union(
    CAG.circle({"center":[151.2922031,-89.5306663],"radius":1})
).union(
    new CSG.Path2D([[153.1922031,-76.9306663],[162.9922031,-76.9306663]]).appendArc([163.4922031,-76.4306663],{"radius":0.5,"clockwise":false,"large":false}).appendPoint([163.4922031,-52.1306663]).appendArc([162.9922031,-51.6306663],{"radius":0.5,"clockwise":false,"large":false}).appendPoint([153.1922031,-51.6306663]).appendArc([152.6922031,-52.1306663],{"radius":0.5,"clockwise":false,"large":false}).appendPoint([152.6922031,-76.4306663]).appendArc([153.1922031,-76.9306663],{"radius":0.5,"clockwise":false,"large":false}).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.2] });
}




                function mcu_cover_case_fn() {
                    

                // creating part 0 of case mcu_cover
                let mcu_cover__part_0 = mcu_cover_extrude_1_2_outline_fn();

                // make sure that rotations are relative
                let mcu_cover__part_0_bounds = mcu_cover__part_0.getBounds();
                let mcu_cover__part_0_x = mcu_cover__part_0_bounds[0].x + (mcu_cover__part_0_bounds[1].x - mcu_cover__part_0_bounds[0].x) / 2
                let mcu_cover__part_0_y = mcu_cover__part_0_bounds[0].y + (mcu_cover__part_0_bounds[1].y - mcu_cover__part_0_bounds[0].y) / 2
                mcu_cover__part_0 = translate([-mcu_cover__part_0_x, -mcu_cover__part_0_y, 0], mcu_cover__part_0);
                mcu_cover__part_0 = rotate([0,0,0], mcu_cover__part_0);
                mcu_cover__part_0 = translate([mcu_cover__part_0_x, mcu_cover__part_0_y, 0], mcu_cover__part_0);

                mcu_cover__part_0 = translate([0,0,0], mcu_cover__part_0);
                let result = mcu_cover__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return mcu_cover_case_fn();
            }

        