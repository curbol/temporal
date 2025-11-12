function mcu_cover_extrude_1_3_outline_fn(){
    return new CSG.Path2D([[166.7316205,-95.6574637],[166.7316205,-41.9845974]]).appendArc([164.2316205,-39.4845974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([149.0571205,-39.4845974]).appendArc([146.5571205,-41.9845974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([146.5571205,-86.8964736]).appendArc([147.8071205,-89.0615371],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([156.9341934,-94.3310551]).appendPoint([162.9816205,-97.8225272]).appendArc([166.7316205,-95.6574637],{"radius":2.5,"clockwise":false,"large":false}).close().innerToCAG()
.subtract(
    CAG.circle({"center":[163.4816205,-94.4645974],"radius":1})
.union(
    CAG.circle({"center":[149.4816205,-86.3845974],"radius":1})
).union(
    new CSG.Path2D([[151.1216205,-73.7845974],[161.4416205,-73.7845974]]).appendArc([161.6816205,-73.5445974],{"radius":0.24,"clockwise":false,"large":false}).appendPoint([161.6816205,-48.7245974]).appendArc([161.4416205,-48.4845974],{"radius":0.24,"clockwise":false,"large":false}).appendPoint([151.1216205,-48.4845974]).appendArc([150.8816205,-48.7245974],{"radius":0.24,"clockwise":false,"large":false}).appendPoint([150.8816205,-73.5445974]).appendArc([151.1216205,-73.7845974],{"radius":0.24,"clockwise":false,"large":false}).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.3] });
}




                function mcu_cover_case_fn() {
                    

                // creating part 0 of case mcu_cover
                let mcu_cover__part_0 = mcu_cover_extrude_1_3_outline_fn();

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

        