function top_plate_small_extrude_1_3_outline_fn(){
    return new CSG.Path2D([[59.0655031,-99.836737],[76.8903282,-97.3316211]]).appendArc([77.8265327,-96.0892358],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([77.2073779,-91.6837202]).appendArc([78.0358384,-90.6606568],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([98.4292812,-89.2346084]).appendArc([99.3922031,-90.1324062],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([99.3922031,-105.6806663]).appendArc([100.4922031,-106.7806663],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([118.3347998,-106.7806663]).appendArc([118.4755909,-106.7917468],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([135.9430492,-109.5583205]).appendArc([136.0803735,-109.591289],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([152.0451791,-114.7785688]).appendArc([152.1699314,-114.829723],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([168.9321111,-123.2205878]).appendArc([170.4046121,-122.736337],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([178.1256737,-107.5829002]).appendArc([177.6449562,-106.1034034],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([148.8836116,-91.4487664]).appendArc([148.3922031,-90.6468606],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([148.3922031,-38.5306663]).appendArc([147.2922031,-37.4306663],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([131.2922032,-37.4306663]).appendArc([130.3922032,-36.5306663],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([130.3922032,-35.9806663]).appendArc([129.2922032,-34.8806663],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([113.2922031,-34.8806663]).appendArc([112.3922031,-33.9806663],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([112.3922031,-32.5806663]).appendArc([111.2922031,-31.4806663],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([93.2922031,-31.4806663]).appendArc([92.1922031,-32.5806663],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([92.1922031,-35.5015747]).appendArc([91.3549839,-36.3993823],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([72.1142745,-37.7448238]).appendArc([71.0936758,-38.9187285],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([71.416304,-43.5325287]).appendArc([70.643762,-44.4866919],{"radius":0.9,"clockwise":true,"large":false}).appendPoint([51.6614942,-47.1544757]).appendArc([50.7252897,-48.396861],{"radius":1.1,"clockwise":false,"large":false}).appendPoint([57.8231178,-98.9005325]).appendArc([59.0655031,-99.836737],{"radius":1.1,"clockwise":false,"large":false}).close().innerToCAG()
.subtract(
    CAG.circle({"center":[73.9781395,-73.0006887],"radius":1.1})
.union(
    CAG.circle({"center":[119.7922032,-88.6806663],"radius":1.1})
).union(
    CAG.circle({"center":[156.4323804,-106.6357507],"radius":1.1})
).union(
    CAG.circle({"center":[128.9322031,-52.9806663],"radius":1.1})
).union(
    CAG.circle({"center":[92.2922031,-49.0806663],"radius":1.1})
).union(
    new CSG.Path2D([[138.7622391,-107.623732],[151.886819,-111.8881665]]).appendPoint([156.1512535,-98.7635866]).appendPoint([143.0266736,-94.4991521]).appendPoint([138.7622391,-107.623732]).close().innerToCAG()
).union(
    new CSG.Path2D([[102.5922031,-104.0806663],[116.3922031,-104.0806663]]).appendPoint([116.3922031,-90.2806663]).appendPoint([102.5922031,-90.2806663]).appendPoint([102.5922031,-104.0806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[113.3922032,-68.3806663],[127.1922032,-68.3806663]]).appendPoint([127.1922032,-54.5806663]).appendPoint([113.3922032,-54.5806663]).appendPoint([113.3922032,-68.3806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[113.3922032,-85.3806663],[127.1922032,-85.3806663]]).appendPoint([127.1922032,-71.5806663]).appendPoint([113.3922032,-71.5806663]).appendPoint([113.3922032,-85.3806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[95.3922031,-64.9806663],[109.1922031,-64.9806663]]).appendPoint([109.1922031,-51.1806663]).appendPoint([95.3922031,-51.1806663]).appendPoint([95.3922031,-64.9806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[95.3922031,-81.9806663],[109.1922031,-81.9806663]]).appendPoint([109.1922031,-68.1806663]).appendPoint([95.3922031,-68.1806663]).appendPoint([95.3922031,-81.9806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[113.3922032,-51.3806663],[127.1922032,-51.3806663]]).appendPoint([127.1922032,-37.5806663]).appendPoint([113.3922032,-37.5806663]).appendPoint([113.3922032,-51.3806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[95.3922031,-47.9806663],[109.1922031,-47.9806663]]).appendPoint([109.1922031,-34.1806663]).appendPoint([95.3922031,-34.1806663]).appendPoint([95.3922031,-47.9806663]).close().innerToCAG()
).union(
    new CSG.Path2D([[131.3922031,-70.9306663],[145.1922031,-70.9306663]]).appendPoint([145.1922031,-57.1306663]).appendPoint([131.3922031,-57.1306663]).appendPoint([131.3922031,-70.9306663]).close().innerToCAG()
).union(
    new CSG.Path2D([[131.3922031,-87.9306663],[145.1922031,-87.9306663]]).appendPoint([145.1922031,-74.1306663]).appendPoint([131.3922031,-74.1306663]).appendPoint([131.3922031,-87.9306663]).close().innerToCAG()
).union(
    new CSG.Path2D([[131.3922031,-53.9306663],[145.1922031,-53.9306663]]).appendPoint([145.1922031,-40.1306663]).appendPoint([131.3922031,-40.1306663]).appendPoint([131.3922031,-53.9306663]).close().innerToCAG()
).union(
    new CSG.Path2D([[75.3601407,-54.058142],[89.1265246,-53.0955027]]).appendPoint([88.1638853,-39.3291188]).appendPoint([74.3975014,-40.2917581]).appendPoint([75.3601407,-54.058142]).close().innerToCAG()
).union(
    new CSG.Path2D([[76.5460008,-71.0167309],[90.3123847,-70.0540916]]).appendPoint([89.3497454,-56.2877077]).appendPoint([75.5833615,-57.250347]).appendPoint([76.5460008,-71.0167309]).close().innerToCAG()
).union(
    new CSG.Path2D([[77.7318609,-87.9753198],[91.4982448,-87.0126805]]).appendPoint([90.5356055,-73.2462966]).appendPoint([76.7692216,-74.2089359]).appendPoint([77.7318609,-87.9753198]).close().innerToCAG()
).union(
    new CSG.Path2D([[120.8166437,-104.4288773],[134.4467428,-106.587673]]).appendPoint([136.6055385,-92.9575739]).appendPoint([122.9754394,-90.7987782]).appendPoint([120.8166437,-104.4288773]).close().innerToCAG()
).union(
    new CSG.Path2D([[56.0374132,-63.2016353],[69.7031126,-61.2810465]]).appendPoint([67.7825238,-47.6153471]).appendPoint([54.1168244,-49.5359359]).appendPoint([56.0374132,-63.2016353]).close().innerToCAG()
).union(
    new CSG.Path2D([[58.4033559,-80.0361925],[72.0690553,-78.1156037]]).appendPoint([70.1484665,-64.4499043]).appendPoint([56.4827671,-66.3704931]).appendPoint([58.4033559,-80.0361925]).close().innerToCAG()
).union(
    new CSG.Path2D([[60.7692986,-96.8707497],[74.434998,-94.9501609]]).appendPoint([72.5144092,-81.2844615]).appendPoint([58.8487098,-83.2050503]).appendPoint([60.7692986,-96.8707497]).close().innerToCAG()
).union(
    new CSG.Path2D([[155.9871091,-113.5865622],[168.2829992,-119.8516311]]).appendPoint([174.5480681,-107.555741]).appendPoint([162.252178,-101.2906721]).appendPoint([155.9871091,-113.5865622]).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.3] });
}




                function top_plate_small_case_fn() {
                    

                // creating part 0 of case top_plate_small
                let top_plate_small__part_0 = top_plate_small_extrude_1_3_outline_fn();

                // make sure that rotations are relative
                let top_plate_small__part_0_bounds = top_plate_small__part_0.getBounds();
                let top_plate_small__part_0_x = top_plate_small__part_0_bounds[0].x + (top_plate_small__part_0_bounds[1].x - top_plate_small__part_0_bounds[0].x) / 2
                let top_plate_small__part_0_y = top_plate_small__part_0_bounds[0].y + (top_plate_small__part_0_bounds[1].y - top_plate_small__part_0_bounds[0].y) / 2
                top_plate_small__part_0 = translate([-top_plate_small__part_0_x, -top_plate_small__part_0_y, 0], top_plate_small__part_0);
                top_plate_small__part_0 = rotate([0,0,0], top_plate_small__part_0);
                top_plate_small__part_0 = translate([top_plate_small__part_0_x, top_plate_small__part_0_y, 0], top_plate_small__part_0);

                top_plate_small__part_0 = translate([0,0,0], top_plate_small__part_0);
                let result = top_plate_small__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return top_plate_small_case_fn();
            }

        