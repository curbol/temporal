function top_plate_extrude_1_3_outline_fn(){
    return new CSG.Path2D([[41.250338,-94.0037666],[54.0528387,-91.7463403]]).appendArc([56.9489786,-93.7742392],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([57.5567472,-97.2210664]).appendArc([60.4528871,-99.2489654],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([82.2905114,-95.3984029]).appendArc([85.1866513,-97.4263018],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([86.125098,-102.7484974]).appendArc([89.0212378,-104.7763963],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([103.8121403,-102.1683611]).appendArc([106.416863,-101.9404774],{"radius":15,"clockwise":true,"large":false}).appendPoint([120.7440586,-101.9404774]).appendArc([124.6263437,-102.4515899],{"radius":15,"clockwise":true,"large":false}).appendPoint([137.7795889,-105.9759912]).appendArc([141.3973033,-107.4744976],{"radius":15,"clockwise":true,"large":false}).appendPoint([153.1901801,-114.2831181]).appendArc([156.2967818,-116.6668975],{"radius":15,"clockwise":true,"large":false}).appendPoint([166.5209234,-126.8910391]).appendArc([170.0564574,-126.8910391],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([180.06433,-116.8831665]).appendArc([180.0659346,-113.3492387],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([166.9576956,-100.2171701]).appendArc([166.438324,-99.8182674],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([147.8071205,-89.0615371]).appendArc([146.5571205,-86.8964736],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([146.5571205,-30.7590974]).appendArc([144.0571205,-28.2590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([113.0571205,-28.2590974]).appendArc([110.5571205,-25.7590974],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([110.5571205,-22.2590974]).appendArc([108.0571205,-19.7590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([92.9061205,-19.7590974]).appendArc([90.4061205,-22.2590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([90.4061205,-26.9727442]).appendArc([88.0805117,-29.4666543],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([72.0525423,-30.5874391]).appendArc([69.7330234,-33.2557404],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([70.2934114,-41.2696614]).appendArc([68.2336218,-43.906072],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([51.2233128,-46.9054485]).appendArc([49.1954138,-49.8015883],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([49.8031824,-53.2484153]).appendArc([47.7752835,-56.1445552],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([34.9727828,-58.4019816]).appendArc([32.9448838,-61.2981215],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([38.3541982,-91.9758677]).appendArc([41.250338,-94.0037666],{"radius":2.5,"clockwise":false,"large":false}).close().innerToCAG()
.subtract(
    CAG.circle({"center":[73.5558933,-78.6000269],"radius":1.1})
.union(
    CAG.circle({"center":[124.0104389,-92.8649774],"radius":1.1})
).union(
    CAG.circle({"center":[160.5566974,-108.0566941],"radius":1.1})
).union(
    CAG.circle({"center":[127.1216205,-46.3345974],"radius":1.1})
).union(
    CAG.circle({"center":[90.4816205,-47.3345974],"radius":1.1})
).union(
    new CSG.Path2D([[125.544475,-99.927721],[138.3912884,-103.3700142]]).appendArc([138.6974747,-103.1932375],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([142.1397679,-90.3464241]).appendArc([141.9629912,-90.0402378],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.1161778,-86.5979446]).appendArc([128.8099915,-86.7747213],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([125.3676983,-99.6215347]).appendArc([125.544475,-99.927721],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[142.9373745,-105.2742567],[154.4555123,-111.9242567]]).appendArc([154.7970187,-111.8327503],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([161.4470187,-100.3146125]).appendArc([161.3555123,-99.9731061],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([149.8373745,-93.3231061]).appendArc([149.4958681,-93.4146125],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([142.8458681,-104.9327503]).appendArc([142.9373745,-105.2742567],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[107.3604389,-99.2649774],[120.6604389,-99.2649774]]).appendArc([120.9104389,-99.0149774],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([120.9104389,-85.7149774]).appendArc([120.6604389,-85.4649774],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([107.3604389,-85.4649774]).appendArc([107.1104389,-85.7149774],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([107.1104389,-99.0149774]).appendArc([107.3604389,-99.2649774],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[111.8316205,-78.7345974],[125.1316205,-78.7345974]]).appendArc([125.3816205,-78.4845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([125.3816205,-65.1845974]).appendArc([125.1316205,-64.9345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([111.8316205,-64.9345974]).appendArc([111.5816205,-65.1845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([111.5816205,-78.4845974]).appendArc([111.8316205,-78.7345974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[93.8316205,-70.2345974],[107.1316205,-70.2345974]]).appendArc([107.3816205,-69.9845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([107.3816205,-56.6845974]).appendArc([107.1316205,-56.4345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([93.8316205,-56.4345974]).appendArc([93.5816205,-56.6845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([93.5816205,-69.9845974]).appendArc([93.8316205,-70.2345974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[111.8316205,-44.7345974],[125.1316205,-44.7345974]]).appendArc([125.3816205,-44.4845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([125.3816205,-31.1845974]).appendArc([125.1316205,-30.9345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([111.8316205,-30.9345974]).appendArc([111.5816205,-31.1845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([111.5816205,-44.4845974]).appendArc([111.8316205,-44.7345974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[111.8316205,-61.7345974],[125.1316205,-61.7345974]]).appendArc([125.3816205,-61.4845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([125.3816205,-48.1845974]).appendArc([125.1316205,-47.9345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([111.8316205,-47.9345974]).appendArc([111.5816205,-48.1845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([111.5816205,-61.4845974]).appendArc([111.8316205,-61.7345974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[93.8316205,-36.2345974],[107.1316205,-36.2345974]]).appendArc([107.3816205,-35.9845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([107.3816205,-22.6845974]).appendArc([107.1316205,-22.4345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([93.8316205,-22.4345974]).appendArc([93.5816205,-22.6845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([93.5816205,-35.9845974]).appendArc([93.8316205,-36.2345974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[93.8316205,-53.2345974],[107.1316205,-53.2345974]]).appendArc([107.3816205,-52.9845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([107.3816205,-39.6845974]).appendArc([107.1316205,-39.4345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([93.8316205,-39.4345974]).appendArc([93.5816205,-39.6845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([93.5816205,-52.9845974]).appendArc([93.8316205,-53.2345974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[129.8316205,-64.2845974],[143.1316205,-64.2845974]]).appendArc([143.3816205,-64.0345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([143.3816205,-50.7345974]).appendArc([143.1316205,-50.4845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.8316205,-50.4845974]).appendArc([129.5816205,-50.7345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.5816205,-64.0345974]).appendArc([129.8316205,-64.2845974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[129.8316205,-81.2845974],[143.1316205,-81.2845974]]).appendArc([143.3816205,-81.0345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([143.3816205,-67.7345974]).appendArc([143.1316205,-67.4845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.8316205,-67.4845974]).appendArc([129.5816205,-67.7345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.5816205,-81.0345974]).appendArc([129.8316205,-81.2845974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[129.8316205,-47.2845974],[143.1316205,-47.2845974]]).appendArc([143.3816205,-47.0345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([143.3816205,-33.7345974]).appendArc([143.1316205,-33.4845974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.8316205,-33.4845974]).appendArc([129.5816205,-33.7345974],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([129.5816205,-47.0345974]).appendArc([129.8316205,-47.2845974],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[158.3538401,-114.9402274],[167.7583603,-124.3447476]]).appendArc([168.1119137,-124.3447476],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([177.5164339,-114.9402274]).appendArc([177.5164339,-114.586674],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([168.1119137,-105.1821538]).appendArc([167.7583603,-105.1821538],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([158.3538401,-114.586674]).appendArc([158.3538401,-114.9402274],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[76.4967808,-80.8754238],[89.7643827,-79.9476627]]).appendArc([89.9963346,-79.6808326],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([89.0685735,-66.4132307]).appendArc([88.8017434,-66.1812788],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([75.5341415,-67.1090399]).appendArc([75.3021896,-67.37587],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([76.2299507,-80.6434719]).appendArc([76.4967808,-80.8754238],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[74.1250606,-46.958246],[87.3926625,-46.0304849]]).appendArc([87.6246144,-45.7636548],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([86.6968533,-32.4960529]).appendArc([86.4300232,-32.264101],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([73.1624213,-33.1918621]).appendArc([72.9304694,-33.4586922],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([73.8582305,-46.7262941]).appendArc([74.1250606,-46.958246],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[75.3109207,-63.9168349],[88.5785226,-62.9890738]]).appendArc([88.8104745,-62.7222437],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([87.8827134,-49.4546418]).appendArc([87.6158833,-49.2226899],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([74.3482814,-50.150451]).appendArc([74.1163295,-50.4172811],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([75.0440906,-63.684883]).appendArc([75.3109207,-63.9168349],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[57.9477118,-79.711669],[71.045655,-77.4021482]]).appendArc([71.2484449,-77.1125343],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([68.9389241,-64.0145911]).appendArc([68.6493102,-63.8118012],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([55.551367,-66.121322]).appendArc([55.3485771,-66.4109359],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([57.6580979,-79.5088791]).appendArc([57.9477118,-79.711669],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[38.7451628,-74.4664703],[51.843106,-72.1569495]]).appendArc([52.0458959,-71.8673356],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([49.7363751,-58.7693924]).appendArc([49.4467612,-58.5666025],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([36.348818,-60.8761233]).appendArc([36.1460281,-61.1657372],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([38.4555489,-74.2636804]).appendArc([38.7451628,-74.4664703],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[89.4680816,-101.9808318],[102.5660248,-99.671311]]).appendArc([102.7688147,-99.3816971],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([100.4592939,-86.2837539]).appendArc([100.16968,-86.080964],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([87.0717368,-88.3904848]).appendArc([86.8689469,-88.6800987],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([89.1784677,-101.7780419]).appendArc([89.4680816,-101.9808318],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[60.8997308,-96.4534008],[73.997674,-94.14388]]).appendArc([74.2004639,-93.8542661],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([71.8909431,-80.7563229]).appendArc([71.6013292,-80.553533],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([58.503386,-82.8630538]).appendArc([58.3005961,-83.1526677],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([60.6101169,-96.2506109]).appendArc([60.8997308,-96.4534008],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[41.6971818,-91.2082021],[54.795125,-88.8986813]]).appendArc([54.9979149,-88.6090674],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([52.6883941,-75.5111242]).appendArc([52.3987802,-75.3083343],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([39.300837,-77.6178551]).appendArc([39.0980471,-77.907469],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([41.4075679,-91.0054122]).appendArc([41.6971818,-91.2082021],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[54.9956928,-62.9699372],[68.093636,-60.6604164]]).appendArc([68.2964259,-60.3708025],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([65.9869051,-47.2728593]).appendArc([65.6972912,-47.0700694],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([52.599348,-49.3795902]).appendArc([52.3965581,-49.6692041],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([54.7060789,-62.7671473]).appendArc([54.9956928,-62.9699372],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.3] });
}




                function top_plate_case_fn() {
                    

                // creating part 0 of case top_plate
                let top_plate__part_0 = top_plate_extrude_1_3_outline_fn();

                // make sure that rotations are relative
                let top_plate__part_0_bounds = top_plate__part_0.getBounds();
                let top_plate__part_0_x = top_plate__part_0_bounds[0].x + (top_plate__part_0_bounds[1].x - top_plate__part_0_bounds[0].x) / 2
                let top_plate__part_0_y = top_plate__part_0_bounds[0].y + (top_plate__part_0_bounds[1].y - top_plate__part_0_bounds[0].y) / 2
                top_plate__part_0 = translate([-top_plate__part_0_x, -top_plate__part_0_y, 0], top_plate__part_0);
                top_plate__part_0 = rotate([0,0,0], top_plate__part_0);
                top_plate__part_0 = translate([top_plate__part_0_x, top_plate__part_0_y, 0], top_plate__part_0);

                top_plate__part_0 = translate([0,0,0], top_plate__part_0);
                let result = top_plate__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return top_plate_case_fn();
            }

        