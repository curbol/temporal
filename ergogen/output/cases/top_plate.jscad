function top_plate_extrude_1_3_outline_fn(){
    return new CSG.Path2D([[42.7275497,-93.7432944],[52.575627,-92.0068126]]).appendArc([57.2094508,-95.2514508],{"radius":4,"clockwise":true,"large":false}).appendPoint([57.2962749,-95.7438548]).appendArc([61.9300987,-98.9884931],{"radius":4,"clockwise":false,"large":false}).appendPoint([80.900586,-95.6434843]).appendArc([85.5344097,-98.8881225],{"radius":4,"clockwise":true,"large":false}).appendPoint([85.9546257,-101.2712858]).appendArc([90.5884495,-104.5159241],{"radius":4,"clockwise":false,"large":false}).appendPoint([103.9021402,-102.1683611]).appendArc([106.506863,-101.9404774],{"radius":15,"clockwise":true,"large":false}).appendPoint([120.8340586,-101.9404774]).appendArc([124.7163437,-102.4515899],{"radius":15,"clockwise":true,"large":false}).appendPoint([137.8695885,-105.9759911]).appendArc([141.4873033,-107.4744977],{"radius":15,"clockwise":true,"large":false}).appendPoint([153.2801801,-114.2831181]).appendArc([156.3867818,-116.6668975],{"radius":15,"clockwise":true,"large":false}).appendPoint([165.5502633,-125.830379]).appendArc([171.2071175,-125.830379],{"radius":4,"clockwise":false,"large":false}).appendPoint([179.0946327,-117.9428638]).appendArc([179.0972002,-112.2885793],{"radius":4,"clockwise":false,"large":false}).appendPoint([167.187697,-100.3574259]).appendArc([166.3567024,-99.7191817],{"radius":4,"clockwise":false,"large":false}).appendPoint([148.5571205,-89.4425883]).appendArc([146.5571205,-85.9784867],{"radius":4,"clockwise":true,"large":false}).appendPoint([146.5571205,-32.2590974]).appendArc([142.5571205,-28.2590974],{"radius":4,"clockwise":false,"large":false}).appendPoint([114.5571205,-28.2590974]).appendArc([110.5571205,-24.2590974],{"radius":4,"clockwise":true,"large":false}).appendPoint([110.5571205,-23.7590974]).appendArc([106.5571205,-19.7590974],{"radius":4,"clockwise":false,"large":false}).appendPoint([94.4061205,-19.7590974]).appendArc([90.4061205,-23.7590974],{"radius":4,"clockwise":false,"large":false}).appendPoint([90.4061205,-25.5739716]).appendArc([86.6851465,-29.5642278],{"radius":4,"clockwise":true,"large":false}).appendPoint([73.5488883,-30.4828044]).appendArc([69.8376581,-34.7520866],{"radius":4,"clockwise":false,"large":false}).appendPoint([70.1991978,-39.9223453]).appendArc([66.9035344,-44.1406023],{"radius":4,"clockwise":true,"large":false}).appendPoint([52.7005243,-46.6449762]).appendArc([49.4558861,-51.2788],{"radius":4,"clockwise":false,"large":false}).appendPoint([49.5427102,-51.7712037]).appendArc([46.298072,-56.4050275],{"radius":4,"clockwise":true,"large":false}).appendPoint([36.4499943,-58.1415093]).appendArc([33.2053561,-62.7753331],{"radius":4,"clockwise":false,"large":false}).appendPoint([38.0937259,-90.4986561]).appendArc([42.7275497,-93.7432944],{"radius":4,"clockwise":false,"large":false}).close().innerToCAG()
.subtract(
    CAG.circle({"center":[73.5558933,-78.6000269],"radius":1.1})
.union(
    CAG.circle({"center":[104.4990997,-92.8475969],"radius":1.1})
).union(
    CAG.circle({"center":[143.3735818,-98.0551328],"radius":1.1})
).union(
    CAG.circle({"center":[127.1216205,-46.3345974],"radius":1.1})
).union(
    CAG.circle({"center":[90.4816205,-47.3345974],"radius":1.1})
).union(
    new CSG.Path2D([[125.3929935,-99.8630162],[138.7227699,-103.434719]]).appendPoint([142.2944727,-90.1049426]).appendPoint([128.9646963,-86.5332398]).appendPoint([125.3929935,-99.8630162]).close().innerToCAG()
).union(
    new CSG.Path2D([[54.7494909,-63.0133492],[68.3398379,-60.6170044]]).appendPoint([65.9434931,-47.0266574]).appendPoint([52.3531461,-49.4230022]).appendPoint([54.7494909,-63.0133492]).close().innerToCAG()
).union(
    new CSG.Path2D([[38.4989609,-74.5098823],[52.0893079,-72.1135375]]).appendPoint([49.6929631,-58.5231905]).appendPoint([36.1026161,-60.9195353]).appendPoint([38.4989609,-74.5098823]).close().innerToCAG()
).union(
    new CSG.Path2D([[89.3118797,-102.0242438],[102.9022267,-99.627899]]).appendPoint([100.5058819,-86.037552]).appendPoint([86.9155349,-88.4338968]).appendPoint([89.3118797,-102.0242438]).close().innerToCAG()
).union(
    new CSG.Path2D([[60.6535289,-96.4968128],[74.2438759,-94.100468]]).appendPoint([71.8475311,-80.510121]).appendPoint([58.2571841,-82.9064658]).appendPoint([60.6535289,-96.4968128]).close().innerToCAG()
).union(
    new CSG.Path2D([[41.4509799,-91.2516141],[55.0413269,-88.8552693]]).appendPoint([52.6449821,-75.2649223]).appendPoint([39.0546351,-77.6612671]).appendPoint([41.4509799,-91.2516141]).close().innerToCAG()
).union(
    new CSG.Path2D([[57.7015099,-79.755081],[71.2918569,-77.3587362]]).appendPoint([68.8955121,-63.7683892]).appendPoint([55.3051651,-66.164734]).appendPoint([57.7015099,-79.755081]).close().innerToCAG()
).union(
    new CSG.Path2D([[107.2004389,-99.2649774],[121.0004389,-99.2649774]]).appendPoint([121.0004389,-85.4649774]).appendPoint([107.2004389,-85.4649774]).appendPoint([107.2004389,-99.2649774]).close().innerToCAG()
).union(
    new CSG.Path2D([[111.5816205,-44.7345974],[125.3816205,-44.7345974]]).appendPoint([125.3816205,-30.9345974]).appendPoint([111.5816205,-30.9345974]).appendPoint([111.5816205,-44.7345974]).close().innerToCAG()
).union(
    new CSG.Path2D([[111.5816205,-78.7345974],[125.3816205,-78.7345974]]).appendPoint([125.3816205,-64.9345974]).appendPoint([111.5816205,-64.9345974]).appendPoint([111.5816205,-78.7345974]).close().innerToCAG()
).union(
    new CSG.Path2D([[93.5816205,-36.2345974],[107.3816205,-36.2345974]]).appendPoint([107.3816205,-22.4345974]).appendPoint([93.5816205,-22.4345974]).appendPoint([93.5816205,-36.2345974]).close().innerToCAG()
).union(
    new CSG.Path2D([[93.5816205,-70.2345974],[107.3816205,-70.2345974]]).appendPoint([107.3816205,-56.4345974]).appendPoint([93.5816205,-56.4345974]).appendPoint([93.5816205,-70.2345974]).close().innerToCAG()
).union(
    new CSG.Path2D([[111.5816205,-61.7345974],[125.3816205,-61.7345974]]).appendPoint([125.3816205,-47.9345974]).appendPoint([111.5816205,-47.9345974]).appendPoint([111.5816205,-61.7345974]).close().innerToCAG()
).union(
    new CSG.Path2D([[93.5816205,-53.2345974],[107.3816205,-53.2345974]]).appendPoint([107.3816205,-39.4345974]).appendPoint([93.5816205,-39.4345974]).appendPoint([93.5816205,-53.2345974]).close().innerToCAG()
).union(
    new CSG.Path2D([[129.5816205,-64.2845974],[143.3816205,-64.2845974]]).appendPoint([143.3816205,-50.4845974]).appendPoint([129.5816205,-50.4845974]).appendPoint([129.5816205,-64.2845974]).close().innerToCAG()
).union(
    new CSG.Path2D([[129.5816205,-81.2845974],[143.3816205,-81.2845974]]).appendPoint([143.3816205,-67.4845974]).appendPoint([129.5816205,-67.4845974]).appendPoint([129.5816205,-81.2845974]).close().innerToCAG()
).union(
    new CSG.Path2D([[129.5816205,-47.2845974],[143.3816205,-47.2845974]]).appendPoint([143.3816205,-33.4845974]).appendPoint([129.5816205,-33.4845974]).appendPoint([129.5816205,-47.2845974]).close().innerToCAG()
).union(
    new CSG.Path2D([[73.8756696,-46.9756851],[87.6420535,-46.0130458]]).appendPoint([86.6794142,-32.2466619]).appendPoint([72.9130303,-33.2093012]).appendPoint([73.8756696,-46.9756851]).close().innerToCAG()
).union(
    new CSG.Path2D([[75.0615297,-63.934274],[88.8279136,-62.9716347]]).appendPoint([87.8652743,-49.2052508]).appendPoint([74.0988904,-50.1678901]).appendPoint([75.0615297,-63.934274]).close().innerToCAG()
).union(
    new CSG.Path2D([[76.2473898,-80.8928629],[90.0137737,-79.9302236]]).appendPoint([89.0511344,-66.1638397]).appendPoint([75.2847505,-67.126479]).appendPoint([76.2473898,-80.8928629]).close().innerToCAG()
).union(
    new CSG.Path2D([[142.8108681,-105.1492567],[154.7620187,-112.0492567]]).appendPoint([161.6620187,-100.0981061]).appendPoint([149.7108681,-93.1981061]).appendPoint([142.8108681,-105.1492567]).close().innerToCAG()
).union(
    new CSG.Path2D([[158.2670634,-114.7634507],[168.025137,-124.5215243]]).appendPoint([177.7832106,-114.7634507]).appendPoint([168.025137,-105.0053771]).appendPoint([158.2670634,-114.7634507]).close().innerToCAG()
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

        