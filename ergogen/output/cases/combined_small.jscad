function case_outer_small_extrude_5_75_outline_fn(){
    return new CSG.Path2D([[168.0316205,-95.8757258],[168.0316205,-40.6845974]]).appendArc([165.5316205,-38.1845974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([150.3571205,-38.1845974]).appendArc([147.8571205,-35.6845974],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([147.8571205,-29.4590974]).appendArc([145.3571205,-26.9590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([114.3571205,-26.9590974]).appendArc([111.8571205,-24.4590974],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([111.8571205,-20.9590974]).appendArc([109.3571205,-18.4590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([91.6061205,-18.4590974]).appendArc([89.1061205,-20.9590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([89.1061205,-25.7604746]).appendArc([86.7805117,-28.2543847],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([70.6650255,-29.3812892]).appendArc([68.3455067,-32.0495905],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([68.9149263,-40.1926709]).appendArc([66.8551368,-42.8290816],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([49.7173201,-45.850941]).appendArc([47.6894211,-48.7470809],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([56.5022397,-98.7270591]).appendArc([59.3983796,-100.7549581],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([81.236004,-96.9043957]).appendArc([84.1321439,-98.9322946],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([85.2788799,-105.4357573]).appendPoint([85.5042087,-106.7165981]).appendPoint([104.0378828,-103.4486112]).appendArc([106.416863,-103.2404774],{"radius":13.7,"clockwise":true,"large":false}).appendPoint([120.7440586,-103.2404774]).appendArc([124.289879,-103.7072934],{"radius":13.7,"clockwise":true,"large":false}).appendPoint([137.4426311,-107.2315627]).appendArc([140.7473033,-108.6003307],{"radius":13.7,"clockwise":true,"large":false}).appendPoint([152.5397386,-115.4086962]).appendArc([155.377543,-117.5861363],{"radius":13.7,"clockwise":true,"large":false}).appendPoint([166.5209235,-128.7295168]).appendArc([170.0564575,-128.7295168],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([181.9019733,-116.8840009]).appendArc([181.9035779,-113.3500729],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([170.2761861,-101.7015438]).appendArc([170.1560161,-101.5723413],{"radius":2.5,"clockwise":true,"large":false}).appendArc([168.0316205,-95.8757258],{"radius":8.7,"clockwise":true,"large":false}).close().innerToCAG()
.extrude({ offset: [0, 0, 5.75] });
}


function _socket_cutouts_small_extrude_3_7_outline_fn(){
    return new CSG.Path2D([[139.2619336,-33.7853366],[138.908677,-33.3930054]]).appendArc([138.8316205,-33.1922662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.8316205,-32.1345974]).appendArc([138.5316205,-31.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.4316205,-31.8345974]).appendArc([134.1316205,-32.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.1316205,-32.5345974]).appendArc([133.8316205,-32.8345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([131.8816205,-32.8345974]).appendArc([131.5816205,-33.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([131.5816205,-35.7345974]).appendArc([131.8816205,-36.0345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([133.8316205,-36.0345974]).appendArc([134.1316205,-36.3345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.1316205,-36.7345974]).appendArc([134.4316205,-37.0345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([137.6134245,-37.0345974]).appendArc([137.8363679,-37.1338582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.554564,-37.9314957]).appendArc([138.6316205,-38.1322349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.6316205,-38.8845974]).appendArc([138.9316205,-39.1845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([143.5316205,-39.1845974]).appendArc([143.8316205,-38.8845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([143.8316205,-38.5495974]).appendArc([144.1316205,-38.2495974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([146.0816205,-38.2495974]).appendArc([146.3816205,-37.9495974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([146.3816205,-35.3495974]).appendArc([146.0816205,-35.0495974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([144.1316205,-35.0495974]).appendArc([143.8316205,-34.7495974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([143.8316205,-34.1845974]).appendArc([143.5316205,-33.8845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([139.4848771,-33.8845974]).appendArc([139.2619337,-33.7853366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
.union(
    new CSG.Path2D([[139.2619336,-50.7853366],[138.908677,-50.3930054]]).appendArc([138.8316205,-50.1922662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.8316205,-49.1345974]).appendArc([138.5316205,-48.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.4316205,-48.8345974]).appendArc([134.1316205,-49.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.1316205,-49.5345974]).appendArc([133.8316205,-49.8345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([131.8816205,-49.8345974]).appendArc([131.5816205,-50.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([131.5816205,-52.7345974]).appendArc([131.8816205,-53.0345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([133.8316205,-53.0345974]).appendArc([134.1316205,-53.3345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.1316205,-53.7345974]).appendArc([134.4316205,-54.0345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([137.6134245,-54.0345974]).appendArc([137.8363679,-54.1338582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.554564,-54.9314957]).appendArc([138.6316205,-55.1322349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.6316205,-55.8845974]).appendArc([138.9316205,-56.1845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([143.5316205,-56.1845974]).appendArc([143.8316205,-55.8845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([143.8316205,-55.5495974]).appendArc([144.1316205,-55.2495974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([146.0816205,-55.2495974]).appendArc([146.3816205,-54.9495974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([146.3816205,-52.3495974]).appendArc([146.0816205,-52.0495974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([144.1316205,-52.0495974]).appendArc([143.8316205,-51.7495974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([143.8316205,-51.1845974]).appendArc([143.5316205,-50.8845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([139.4848771,-50.8845974]).appendArc([139.2619337,-50.7853366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[139.2619336,-67.7853366],[138.908677,-67.3930054]]).appendArc([138.8316205,-67.1922662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.8316205,-66.1345974]).appendArc([138.5316205,-65.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.4316205,-65.8345974]).appendArc([134.1316205,-66.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.1316205,-66.5345974]).appendArc([133.8316205,-66.8345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([131.8816205,-66.8345974]).appendArc([131.5816205,-67.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([131.5816205,-69.7345974]).appendArc([131.8816205,-70.0345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([133.8316205,-70.0345974]).appendArc([134.1316205,-70.3345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.1316205,-70.7345974]).appendArc([134.4316205,-71.0345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([137.6134245,-71.0345974]).appendArc([137.8363679,-71.1338582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.554564,-71.9314957]).appendArc([138.6316205,-72.1322349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.6316205,-72.8845974]).appendArc([138.9316205,-73.1845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([143.5316205,-73.1845974]).appendArc([143.8316205,-72.8845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([143.8316205,-72.5495974]).appendArc([144.1316205,-72.2495974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([146.0816205,-72.2495974]).appendArc([146.3816205,-71.9495974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([146.3816205,-69.3495974]).appendArc([146.0816205,-69.0495974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([144.1316205,-69.0495974]).appendArc([143.8316205,-68.7495974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([143.8316205,-68.1845974]).appendArc([143.5316205,-67.8845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([139.4848771,-67.8845974]).appendArc([139.2619337,-67.7853366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[116.790752,-85.7657166],[116.4374954,-85.3733854]]).appendArc([116.3604389,-85.1726462],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.3604389,-84.1149774]).appendArc([116.0604389,-83.8149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([111.9604389,-83.8149774]).appendArc([111.6604389,-84.1149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([111.6604389,-84.5149774]).appendArc([111.3604389,-84.8149774],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([109.4104389,-84.8149774]).appendArc([109.1104389,-85.1149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([109.1104389,-87.7149774]).appendArc([109.4104389,-88.0149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([111.3604389,-88.0149774]).appendArc([111.6604389,-88.3149774],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([111.6604389,-88.7149774]).appendArc([111.9604389,-89.0149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([115.1422429,-89.0149774]).appendArc([115.3651863,-89.1142382],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.0833824,-89.9118757]).appendArc([116.1604389,-90.1126149],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.1604389,-90.8649774]).appendArc([116.4604389,-91.1649774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([121.0604389,-91.1649774]).appendArc([121.3604389,-90.8649774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([121.3604389,-90.5299774]).appendArc([121.6604389,-90.2299774],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([123.6104389,-90.2299774]).appendArc([123.9104389,-89.9299774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([123.9104389,-87.3299774]).appendArc([123.6104389,-87.0299774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([121.6604389,-87.0299774]).appendArc([121.3604389,-86.7299774],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([121.3604389,-86.1649774]).appendArc([121.0604389,-85.8649774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([117.0136955,-85.8649774]).appendArc([116.7907521,-85.7657166],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[121.2619336,-31.2353366],[120.908677,-30.8430054]]).appendArc([120.8316205,-30.6422662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.8316205,-29.5845974]).appendArc([120.5316205,-29.2845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.4316205,-29.2845974]).appendArc([116.1316205,-29.5845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.1316205,-29.9845974]).appendArc([115.8316205,-30.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([113.8816205,-30.2845974]).appendArc([113.5816205,-30.5845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([113.5816205,-33.1845974]).appendArc([113.8816205,-33.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([115.8316205,-33.4845974]).appendArc([116.1316205,-33.7845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.1316205,-34.1845974]).appendArc([116.4316205,-34.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([119.6134245,-34.4845974]).appendArc([119.8363679,-34.5838582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.554564,-35.3814957]).appendArc([120.6316205,-35.5822349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.6316205,-36.3345974]).appendArc([120.9316205,-36.6345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([125.5316205,-36.6345974]).appendArc([125.8316205,-36.3345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([125.8316205,-35.9995974]).appendArc([126.1316205,-35.6995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([128.0816205,-35.6995974]).appendArc([128.3816205,-35.3995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([128.3816205,-32.7995974]).appendArc([128.0816205,-32.4995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([126.1316205,-32.4995974]).appendArc([125.8316205,-32.1995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([125.8316205,-31.6345974]).appendArc([125.5316205,-31.3345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([121.4848771,-31.3345974]).appendArc([121.2619337,-31.2353366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[103.2619336,-22.7353366],[102.908677,-22.3430054]]).appendArc([102.8316205,-22.1422662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.8316205,-21.0845974]).appendArc([102.5316205,-20.7845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.4316205,-20.7845974]).appendArc([98.1316205,-21.0845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.1316205,-21.4845974]).appendArc([97.8316205,-21.7845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([95.8816205,-21.7845974]).appendArc([95.5816205,-22.0845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([95.5816205,-24.6845974]).appendArc([95.8816205,-24.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([97.8316205,-24.9845974]).appendArc([98.1316205,-25.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([98.1316205,-25.6845974]).appendArc([98.4316205,-25.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.6134245,-25.9845974]).appendArc([101.8363679,-26.0838582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.554564,-26.8814957]).appendArc([102.6316205,-27.0822349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.6316205,-27.8345974]).appendArc([102.9316205,-28.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([107.5316205,-28.1345974]).appendArc([107.8316205,-27.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([107.8316205,-27.4995974]).appendArc([108.1316205,-27.1995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([110.0816205,-27.1995974]).appendArc([110.3816205,-26.8995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([110.3816205,-24.2995974]).appendArc([110.0816205,-23.9995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([108.1316205,-23.9995974]).appendArc([107.8316205,-23.6995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([107.8316205,-23.1345974]).appendArc([107.5316205,-22.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([103.4848771,-22.8345974]).appendArc([103.2619337,-22.7353366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[121.2619336,-65.2353366],[120.908677,-64.8430054]]).appendArc([120.8316205,-64.6422662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.8316205,-63.5845974]).appendArc([120.5316205,-63.2845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.4316205,-63.2845974]).appendArc([116.1316205,-63.5845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.1316205,-63.9845974]).appendArc([115.8316205,-64.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([113.8816205,-64.2845974]).appendArc([113.5816205,-64.5845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([113.5816205,-67.1845974]).appendArc([113.8816205,-67.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([115.8316205,-67.4845974]).appendArc([116.1316205,-67.7845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.1316205,-68.1845974]).appendArc([116.4316205,-68.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([119.6134245,-68.4845974]).appendArc([119.8363679,-68.5838582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.554564,-69.3814957]).appendArc([120.6316205,-69.5822349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.6316205,-70.3345974]).appendArc([120.9316205,-70.6345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([125.5316205,-70.6345974]).appendArc([125.8316205,-70.3345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([125.8316205,-69.9995974]).appendArc([126.1316205,-69.6995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([128.0816205,-69.6995974]).appendArc([128.3816205,-69.3995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([128.3816205,-66.7995974]).appendArc([128.0816205,-66.4995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([126.1316205,-66.4995974]).appendArc([125.8316205,-66.1995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([125.8316205,-65.6345974]).appendArc([125.5316205,-65.3345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([121.4848771,-65.3345974]).appendArc([121.2619337,-65.2353366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[121.2619336,-48.2353366],[120.908677,-47.8430054]]).appendArc([120.8316205,-47.6422662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.8316205,-46.5845974]).appendArc([120.5316205,-46.2845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.4316205,-46.2845974]).appendArc([116.1316205,-46.5845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.1316205,-46.9845974]).appendArc([115.8316205,-47.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([113.8816205,-47.2845974]).appendArc([113.5816205,-47.5845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([113.5816205,-50.1845974]).appendArc([113.8816205,-50.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([115.8316205,-50.4845974]).appendArc([116.1316205,-50.7845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.1316205,-51.1845974]).appendArc([116.4316205,-51.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([119.6134245,-51.4845974]).appendArc([119.8363679,-51.5838582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.554564,-52.3814957]).appendArc([120.6316205,-52.5822349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.6316205,-53.3345974]).appendArc([120.9316205,-53.6345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([125.5316205,-53.6345974]).appendArc([125.8316205,-53.3345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([125.8316205,-52.9995974]).appendArc([126.1316205,-52.6995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([128.0816205,-52.6995974]).appendArc([128.3816205,-52.3995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([128.3816205,-49.7995974]).appendArc([128.0816205,-49.4995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([126.1316205,-49.4995974]).appendArc([125.8316205,-49.1995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([125.8316205,-48.6345974]).appendArc([125.5316205,-48.3345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([121.4848771,-48.3345974]).appendArc([121.2619337,-48.2353366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[103.2619336,-56.7353366],[102.908677,-56.3430054]]).appendArc([102.8316205,-56.1422662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.8316205,-55.0845974]).appendArc([102.5316205,-54.7845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.4316205,-54.7845974]).appendArc([98.1316205,-55.0845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.1316205,-55.4845974]).appendArc([97.8316205,-55.7845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([95.8816205,-55.7845974]).appendArc([95.5816205,-56.0845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([95.5816205,-58.6845974]).appendArc([95.8816205,-58.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([97.8316205,-58.9845974]).appendArc([98.1316205,-59.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([98.1316205,-59.6845974]).appendArc([98.4316205,-59.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.6134245,-59.9845974]).appendArc([101.8363679,-60.0838582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.554564,-60.8814957]).appendArc([102.6316205,-61.0822349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.6316205,-61.8345974]).appendArc([102.9316205,-62.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([107.5316205,-62.1345974]).appendArc([107.8316205,-61.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([107.8316205,-61.4995974]).appendArc([108.1316205,-61.1995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([110.0816205,-61.1995974]).appendArc([110.3816205,-60.8995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([110.3816205,-58.2995974]).appendArc([110.0816205,-57.9995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([108.1316205,-57.9995974]).appendArc([107.8316205,-57.6995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([107.8316205,-57.1345974]).appendArc([107.5316205,-56.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([103.4848771,-56.8345974]).appendArc([103.2619337,-56.7353366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[103.2619336,-39.7353366],[102.908677,-39.3430054]]).appendArc([102.8316205,-39.1422662],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.8316205,-38.0845974]).appendArc([102.5316205,-37.7845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.4316205,-37.7845974]).appendArc([98.1316205,-38.0845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.1316205,-38.4845974]).appendArc([97.8316205,-38.7845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([95.8816205,-38.7845974]).appendArc([95.5816205,-39.0845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([95.5816205,-41.6845974]).appendArc([95.8816205,-41.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([97.8316205,-41.9845974]).appendArc([98.1316205,-42.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([98.1316205,-42.6845974]).appendArc([98.4316205,-42.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.6134245,-42.9845974]).appendArc([101.8363679,-43.0838582],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.554564,-43.8814957]).appendArc([102.6316205,-44.0822349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.6316205,-44.8345974]).appendArc([102.9316205,-45.1345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([107.5316205,-45.1345974]).appendArc([107.8316205,-44.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([107.8316205,-44.4995974]).appendArc([108.1316205,-44.1995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([110.0816205,-44.1995974]).appendArc([110.3816205,-43.8995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([110.3816205,-41.2995974]).appendArc([110.0816205,-40.9995974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([108.1316205,-40.9995974]).appendArc([107.8316205,-40.6995974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([107.8316205,-40.1345974]).appendArc([107.5316205,-39.8345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([103.4848771,-39.8345974]).appendArc([103.2619337,-39.7353366],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[82.5907411,-32.8340433],[82.2109775,-32.4673098]]).appendArc([82.1201058,-32.2724349],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([82.0463265,-31.2173423]).appendArc([81.7261304,-30.9390001],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([77.6361177,-31.2250016]).appendArc([77.3577755,-31.5451978],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([77.3856781,-31.9442234]).appendArc([77.1073359,-32.2644195],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([75.1620859,-32.4004447]).appendArc([74.8837436,-32.7206408],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([75.0651105,-35.3143074]).appendArc([75.3853066,-35.5926496],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([77.3305565,-35.4566245]).appendArc([77.6507527,-35.7349667],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([77.6786553,-36.1339924]).appendArc([77.9988514,-36.4123347],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([81.1729048,-36.1903833]).appendArc([81.4022292,-36.2738506],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([82.174316,-37.0194462]).appendArc([82.2651877,-37.2143211],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([82.3176699,-37.964851]).appendArc([82.637866,-38.2431933],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([87.2266607,-37.9223135]).appendArc([87.5050029,-37.6021174],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([87.4816346,-37.2679334]).appendArc([87.7599768,-36.9477372],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([89.7052267,-36.8117121]).appendArc([89.983569,-36.491516],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([89.8022022,-33.8978494]).appendArc([89.482006,-33.6195072],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([87.5367561,-33.7555323]).appendArc([87.2165599,-33.4771901],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([87.1771475,-32.9135663]).appendArc([86.8569514,-32.635224],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([82.8200655,-32.9175106]).appendArc([82.5907411,-32.8340433],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[84.9624613,-66.7512211],[84.5826977,-66.3844876]]).appendArc([84.491826,-66.1896127],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([84.4180467,-65.1345201]).appendArc([84.0978506,-64.8561779],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([80.0078379,-65.1421794]).appendArc([79.7294957,-65.4623756],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([79.7573983,-65.8614012]).appendArc([79.4790561,-66.1815973],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([77.5338061,-66.3176225]).appendArc([77.2554638,-66.6378186],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([77.4368307,-69.2314852]).appendArc([77.7570268,-69.5098274],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([79.7022767,-69.3738023]).appendArc([80.0224729,-69.6521445],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([80.0503755,-70.0511702]).appendArc([80.3705716,-70.3295125],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([83.544625,-70.1075611]).appendArc([83.7739494,-70.1910284],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([84.5460362,-70.936624]).appendArc([84.6369079,-71.1314989],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([84.6893901,-71.8820288]).appendArc([85.0095862,-72.1603711],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([89.5983809,-71.8394913]).appendArc([89.8767231,-71.5192952],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([89.8533548,-71.1851112]).appendArc([90.131697,-70.864915],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([92.0769469,-70.7288899]).appendArc([92.3552892,-70.4086938],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([92.1739224,-67.8150272]).appendArc([91.8537262,-67.536685],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([89.9084763,-67.6727101]).appendArc([89.5882801,-67.3943679],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([89.5488677,-66.8307441]).appendArc([89.2286716,-66.5524018],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([85.1917857,-66.8346884]).appendArc([84.9624613,-66.7512211],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[83.7766012,-49.7926322],[83.3968376,-49.4258987]]).appendArc([83.3059659,-49.2310238],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([83.2321866,-48.1759312]).appendArc([82.9119905,-47.897589],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([78.8219778,-48.1835905]).appendArc([78.5436356,-48.5037867],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([78.5715382,-48.9028123]).appendArc([78.293196,-49.2230084],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([76.347946,-49.3590336]).appendArc([76.0696037,-49.6792297],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([76.2509706,-52.2728963]).appendArc([76.5711667,-52.5512385],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([78.5164166,-52.4152134]).appendArc([78.8366128,-52.6935556],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([78.8645154,-53.0925813]).appendArc([79.1847115,-53.3709236],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([82.3587649,-53.1489722]).appendArc([82.5880893,-53.2324395],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([83.3601761,-53.9780351]).appendArc([83.4510478,-54.17291],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([83.50353,-54.9234399]).appendArc([83.8237261,-55.2017822],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([88.4125208,-54.8809024]).appendArc([88.690863,-54.5607063],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([88.6674947,-54.2265223]).appendArc([88.9458369,-53.9063261],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([90.8910868,-53.770301]).appendArc([91.1694291,-53.4501049],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([90.9880623,-50.8564383]).appendArc([90.6678661,-50.5780961],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([88.7226162,-50.7141212]).appendArc([88.40242,-50.435779],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([88.3630076,-49.8721552]).appendArc([88.0428115,-49.5938129],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([84.0059256,-49.8760995]).appendArc([83.7766012,-49.7926322],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[67.8426543,-81.5216674],[67.4266369,-81.196639]]).appendArc([67.315893,-81.0123303],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([67.1322307,-79.9707297]).appendArc([66.7846939,-79.7273818],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.7469822,-80.4393394]).appendArc([62.5036343,-80.7868762],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.5730936,-81.1807993]).appendArc([62.3297458,-81.528336],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([60.4093706,-81.86695]).appendArc([60.1660227,-82.2144868],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([60.617508,-84.7749869]).appendArc([60.9650448,-85.0183348],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.8854199,-84.6797209]).appendArc([63.2329567,-84.9230687],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([63.3024159,-85.3169918]).appendArc([63.6499528,-85.5603397],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([66.783418,-85.0078252]).appendArc([67.0202109,-85.0668643],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([67.8660041,-85.7276704]).appendArc([67.976748,-85.9119791],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([68.1073944,-86.6529117]).appendArc([68.4549312,-86.8962595],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([72.9850468,-86.0974779]).appendArc([73.2283947,-85.7499411],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([73.1702225,-85.4200305]).appendArc([73.4135704,-85.0724938],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([75.3339456,-84.7338798]).appendArc([75.5772934,-84.386343],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([75.1258082,-81.8258429]).appendArc([74.7782714,-81.5824951],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([72.8578963,-81.9211089]).appendArc([72.5103595,-81.6777611],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([72.4122483,-81.1213447]).appendArc([72.0647115,-80.8779969],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([68.0794472,-81.5807065]).appendArc([67.8426543,-81.5216674],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[61.9386163,-48.0382038],[61.5225989,-47.7131754]]).appendArc([61.411855,-47.5288667],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([61.2281927,-46.4872661]).appendArc([60.8806559,-46.2439182],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([56.8429442,-46.9558758]).appendArc([56.5995963,-47.3034126],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([56.6690556,-47.6973357]).appendArc([56.4257078,-48.0448724],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([54.5053326,-48.3834864]).appendArc([54.2619847,-48.7310232],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([54.71347,-51.2915233]).appendArc([55.0610068,-51.5348712],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([56.9813819,-51.1962573]).appendArc([57.3289187,-51.4396051],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([57.3983779,-51.8335282]).appendArc([57.7459148,-52.0768761],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([60.87938,-51.5243616]).appendArc([61.1161729,-51.5834007],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([61.9619661,-52.2442068]).appendArc([62.07271,-52.4285155],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([62.2033564,-53.1694481]).appendArc([62.5508932,-53.4127959],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([67.0810088,-52.6140143]).appendArc([67.3243567,-52.2664775],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([67.2661845,-51.9365669]).appendArc([67.5095324,-51.5890302],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([69.4299076,-51.2504162]).appendArc([69.6732554,-50.9028794],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([69.2217702,-48.3423793]).appendArc([68.8742334,-48.0990315],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([66.9538583,-48.4376453]).appendArc([66.6063215,-48.1942975],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([66.5082103,-47.6378811]).appendArc([66.1606735,-47.3945333],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.1754092,-48.0972429]).appendArc([61.9386163,-48.0382038],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[96.4110051,-87.0490984],[95.9949877,-86.72407]]).appendArc([95.8842438,-86.5397613],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([95.7005815,-85.4981607]).appendArc([95.3530447,-85.2548128],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([91.315333,-85.9667704]).appendArc([91.0719851,-86.3143072],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([91.1414444,-86.7082303]).appendArc([90.8980966,-87.055767],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([88.9777214,-87.394381]).appendArc([88.7343735,-87.7419178],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([89.1858588,-90.3024179]).appendArc([89.5333956,-90.5457658],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([91.4537707,-90.2071519]).appendArc([91.8013075,-90.4504997],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([91.8707667,-90.8444228]).appendArc([92.2183036,-91.0877707],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([95.3517688,-90.5352562]).appendArc([95.5885617,-90.5942953],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([96.4343549,-91.2551014]).appendArc([96.5450988,-91.4394101],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([96.6757452,-92.1803427]).appendArc([97.023282,-92.4236905],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.5533976,-91.6249089]).appendArc([101.7967455,-91.2773721],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.7385733,-90.9474615]).appendArc([101.9819212,-90.5999248],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([103.9022964,-90.2613108]).appendArc([104.1456442,-89.913774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([103.694159,-87.3532739]).appendArc([103.3466222,-87.1099261],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.4262471,-87.4485399]).appendArc([101.0787103,-87.2051921],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([100.9805991,-86.6487757]).appendArc([100.6330623,-86.4054279],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([96.647798,-87.1081375]).appendArc([96.4110051,-87.0490984],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[64.8906353,-64.7799356],[64.4746179,-64.4549072]]).appendArc([64.363874,-64.2705985],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([64.1802117,-63.2289979]).appendArc([63.8326749,-62.98565],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([59.7949632,-63.6976076]).appendArc([59.5516153,-64.0451444],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([59.6210746,-64.4390675]).appendArc([59.3777268,-64.7866042],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([57.4573516,-65.1252182]).appendArc([57.2140037,-65.472755],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([57.665489,-68.0332551]).appendArc([58.0130258,-68.276603],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([59.9334009,-67.9379891]).appendArc([60.2809377,-68.1813369],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([60.3503969,-68.57526]).appendArc([60.6979338,-68.8186079],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([63.831399,-68.2660934]).appendArc([64.0681919,-68.3251325],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([64.9139851,-68.9859386]).appendArc([65.024729,-69.1702473],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([65.1553754,-69.9111799]).appendArc([65.5029122,-70.1545277],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([70.0330278,-69.3557461]).appendArc([70.2763757,-69.0082093],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([70.2182035,-68.6782987]).appendArc([70.4615514,-68.330762],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([72.3819266,-67.992148]).appendArc([72.6252744,-67.6446112],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([72.1737892,-65.0841111]).appendArc([71.8262524,-64.8407633],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([69.9058773,-65.1793771]).appendArc([69.5583405,-64.9360293],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([69.4602293,-64.3796129]).appendArc([69.1126925,-64.1362651],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([65.1274282,-64.8389747]).appendArc([64.8906353,-64.7799356],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[174.5674973,-112.063047],[174.5951272,-111.5358367]]).appendArc([174.6825841,-111.3394055],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([175.4304689,-110.5915207]).appendArc([175.4304689,-110.1672566],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([172.5313311,-107.2681188]).appendArc([172.107067,-107.2681189],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([171.8242243,-107.5509615]).appendArc([171.3999602,-107.5509615],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([170.021102,-106.1721033]).appendArc([169.596838,-106.1721033],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([167.7583603,-108.0105809]).appendArc([167.7583603,-108.434845],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([169.1372185,-109.8137032]).appendArc([169.1372185,-110.2379673],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([168.8543758,-110.52081]).appendArc([168.8543758,-110.945074],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([171.104251,-113.1949493]).appendArc([171.1917079,-113.4227821],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([171.1355343,-114.4946383]).appendArc([171.0480774,-114.6910695],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([170.5160768,-115.2230701]).appendArc([170.5160768,-115.6473341],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([173.7687679,-118.9000254]).appendArc([174.193032,-118.9000253],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([174.4299128,-118.6631446]).appendArc([174.8541768,-118.6631446],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([176.2330351,-120.0420028]).appendArc([176.6572991,-120.0420028],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([178.4957768,-118.2035252]).appendArc([178.4957767,-117.7792612],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([177.1169185,-116.4004029]).appendArc([177.1169185,-115.9761389],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([177.5164339,-115.5766235]).appendArc([177.5164339,-115.1523595],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([174.6549542,-112.2908797]).appendArc([174.5674973,-112.0630469],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[138.1473238,-89.329181],[137.9076469,-88.8587887]]).appendArc([137.8851711,-88.6449458],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.1589159,-87.6233161]).appendArc([137.9467839,-87.2558926],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([133.986488,-86.1947345]).appendArc([133.6190646,-86.4068666],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([133.5155369,-86.793237]).appendArc([133.1481134,-87.005369],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([131.2645581,-86.5006718]).appendArc([130.8971347,-86.7128039],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([130.2242051,-89.224211]).appendArc([130.4363372,-89.5916344],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([132.3198926,-90.0963316]).appendArc([132.5320246,-90.463755],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([132.4284969,-90.8501254]).appendArc([132.640629,-91.2175488],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([135.7140157,-92.0410603]).appendArc([135.903672,-92.1946408],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([136.3909523,-93.1509824]).appendArc([136.413428,-93.3648252],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([136.2187022,-94.0915516]).appendArc([136.4308342,-94.458975],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([140.874093,-95.6495427]).appendArc([141.2415164,-95.4374106],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([141.3282209,-95.1138254]).appendArc([141.6956443,-94.9016934],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([143.5791997,-95.4063906]).appendArc([143.9466231,-95.1942585],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([144.6195527,-92.6828514]).appendArc([144.4074206,-92.315428],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([142.5238652,-91.8107308]).appendArc([142.3117332,-91.4433074],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([142.457966,-90.8975593]).appendArc([142.245834,-90.5301358],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.33698,-89.4827615]).appendArc([138.1473237,-89.329181],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[157.8538955,-98.2987104],[157.744132,-97.7823133]]).appendArc([157.7777687,-97.5699399],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([158.3066031,-96.6539718]).appendArc([158.1967955,-96.2441642],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([154.6460913,-94.1941642]).appendArc([154.2362837,-94.3039718],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([154.0362837,-94.650382]).appendArc([153.6264761,-94.7601896],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([151.9377265,-93.7851896]).appendArc([151.5279189,-93.8949972],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([150.2279189,-96.1466633]).appendArc([150.3377265,-96.5564709],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([152.0264761,-97.5314709]).appendArc([152.1362837,-97.9412785],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([151.9362837,-98.2876887]).appendArc([152.0460913,-98.6974963],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([154.8016145,-100.2883983]).appendArc([154.9450588,-100.4858324],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([155.168216,-101.5357048]).appendArc([155.1345793,-101.7480782],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([154.758398,-102.3996433]).appendArc([154.8682056,-102.8094509],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([158.8519225,-105.1094509]).appendArc([159.2617301,-104.9996433],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([159.4292301,-104.7095248]).appendArc([159.8390377,-104.5997172],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([161.5277873,-105.5747172]).appendArc([161.9375949,-105.4649095],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([163.2375949,-103.2132435]).appendArc([163.1277873,-102.8034359],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([161.4390377,-101.8284359]).appendArc([161.3292301,-101.4186283],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([161.6117301,-100.9293239]).appendArc([161.5019225,-100.5195163],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([157.9973399,-98.4961445]).appendArc([157.8538955,-98.2987104],{"radius":0.3,"clockwise":true,"large":false}).close().innerToCAG()
).extrude({ offset: [0, 0, 3.7] });
}


function _mcu_cover_nut_cutout_extrude_3_7_outline_fn(){
    return new CSG.Path2D([[162.4316205,-96.2831974],[164.5316205,-96.2831974]]).appendPoint([165.5816205,-94.4645974]).appendPoint([164.5316205,-92.6459974]).appendPoint([162.4316205,-92.6459974]).appendPoint([161.3816205,-94.4645974]).appendPoint([162.4316205,-96.2831974]).close().innerToCAG()
.union(
    new CSG.Path2D([[148.4316205,-88.2031974],[150.5316205,-88.2031974]]).appendPoint([151.5816205,-86.3845974]).appendPoint([150.5316205,-84.5659974]).appendPoint([148.4316205,-84.5659974]).appendPoint([147.3816205,-86.3845974]).appendPoint([148.4316205,-88.2031974]).close().innerToCAG()
).extrude({ offset: [0, 0, 3.7] });
}


function _diode_cutouts_extrude_3_7_outline_fn(){
    return new CSG.Path2D([[162.2782828,-117.4504565],[162.4286562,-117.6008299]]).appendArc([162.5125685,-117.8615189],{"radius":0.3,"clockwise":true,"large":false}).appendArc([162.5964808,-118.1222079],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([164.5763798,-120.1021069]).appendArc([164.8370688,-120.1860192],{"radius":0.3,"clockwise":false,"large":false}).appendArc([165.0977578,-120.2699315],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([165.2481312,-120.4203049]).appendArc([165.6723953,-120.4203049],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([166.5209234,-119.5717768]).appendArc([166.5209234,-119.1475128],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([166.37055,-118.9971393]).appendArc([166.2866377,-118.7364503],{"radius":0.3,"clockwise":true,"large":false}).appendArc([166.2027254,-118.4757613],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([164.2228264,-116.4958623]).appendArc([163.9621374,-116.41195],{"radius":0.3,"clockwise":false,"large":false}).appendArc([163.7014484,-116.3280377],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([163.551075,-116.1776643]).appendArc([163.1268109,-116.1776643],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([162.2782828,-117.0261924]).appendArc([162.2782828,-117.4504564],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
.union(
    new CSG.Path2D([[147.3777901,-106.6832313],[147.5619592,-106.7895614]]).appendArc([147.7104835,-107.0196495],{"radius":0.3,"clockwise":true,"large":false}).appendArc([147.8590078,-107.2497376],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([150.283879,-108.6497376]).appendArc([150.5574033,-108.6633194],{"radius":0.3,"clockwise":false,"large":false}).appendArc([150.8309276,-108.6769012],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([151.0150967,-108.7832313]).appendArc([151.4249043,-108.6734237],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([152.0249044,-107.6341932]).appendArc([151.9150967,-107.2243856],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([151.7309276,-107.1180555]).appendArc([151.5824033,-106.8879673],{"radius":0.3,"clockwise":true,"large":false}).appendArc([151.433879,-106.6578792],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([149.0090078,-105.2578792]).appendArc([148.7354835,-105.2442974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([148.4619592,-105.2307156],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([148.2777901,-105.1243856]).appendArc([147.8679825,-105.2341932],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([147.2679824,-106.2734237]).appendArc([147.3777901,-106.6832313],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[65.206958,-94.6784938],[65.4163874,-94.6415657]]).appendArc([65.6780614,-94.7223539],{"radius":0.3,"clockwise":true,"large":false}).appendArc([65.9397355,-94.803142],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([68.6971971,-94.3169271]).appendArc([68.9154591,-94.1515133],{"radius":0.3,"clockwise":false,"large":false}).appendArc([69.133721,-93.9860995],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([69.3431505,-93.9491715]).appendArc([69.5864984,-93.6016346],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([69.3781206,-92.4198654]).appendArc([69.0305838,-92.1765175],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([68.8211544,-92.2134456]).appendArc([68.5594804,-92.1326574],{"radius":0.3,"clockwise":true,"large":false}).appendArc([68.2978063,-92.0518693],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([65.5403446,-92.5380842]).appendArc([65.3220827,-92.703498],{"radius":0.3,"clockwise":false,"large":false}).appendArc([65.1038208,-92.8689118],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([64.8943912,-92.9058399]).appendArc([64.6510434,-93.2533767],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([64.8594212,-94.4351459]).appendArc([65.206958,-94.6784938],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[59.30292,-61.1950302],[59.5123494,-61.1581021]]).appendArc([59.7740234,-61.2388903],{"radius":0.3,"clockwise":true,"large":false}).appendArc([60.0356975,-61.3196784],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.7931591,-60.8334635]).appendArc([63.0114211,-60.6680497],{"radius":0.3,"clockwise":false,"large":false}).appendArc([63.229683,-60.5026359],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([63.4391125,-60.4657079]).appendArc([63.6824604,-60.118171],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([63.4740826,-58.9364018]).appendArc([63.1265458,-58.6930539],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.9171164,-58.729982]).appendArc([62.6554424,-58.6491938],{"radius":0.3,"clockwise":true,"large":false}).appendArc([62.3937683,-58.5684057],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([59.6363066,-59.0546206]).appendArc([59.4180447,-59.2200344],{"radius":0.3,"clockwise":false,"large":false}).appendArc([59.1997828,-59.3854482],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([58.9903532,-59.4223763]).appendArc([58.7470054,-59.7699131],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([58.9553832,-60.9516823]).appendArc([59.30292,-61.1950302],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[43.05239,-72.6915633],[43.2618194,-72.6546352]]).appendArc([43.5234934,-72.7354234],{"radius":0.3,"clockwise":true,"large":false}).appendArc([43.7851675,-72.8162115],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([46.5426291,-72.3299966]).appendArc([46.7608911,-72.1645828],{"radius":0.3,"clockwise":false,"large":false}).appendArc([46.979153,-71.999169],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([47.1885825,-71.962241]).appendArc([47.4319304,-71.6147041],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([47.2235526,-70.4329349]).appendArc([46.8760158,-70.189587],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([46.6665864,-70.2265151]).appendArc([46.4049124,-70.1457269],{"radius":0.3,"clockwise":true,"large":false}).appendArc([46.1432383,-70.0649388],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([43.3857766,-70.5511537]).appendArc([43.1675147,-70.7165675],{"radius":0.3,"clockwise":false,"large":false}).appendArc([42.9492528,-70.8819813],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([42.7398232,-70.9189094]).appendArc([42.4964754,-71.2664462],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([42.7048532,-72.4482154]).appendArc([43.05239,-72.6915633],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[93.7753088,-100.2059248],[93.9847382,-100.1689967]]).appendArc([94.2464122,-100.2497849],{"radius":0.3,"clockwise":true,"large":false}).appendArc([94.5080863,-100.330573],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([97.2655479,-99.8443581]).appendArc([97.4838099,-99.6789443],{"radius":0.3,"clockwise":false,"large":false}).appendArc([97.7020718,-99.5135305],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([97.9115013,-99.4766025]).appendArc([98.1548492,-99.1290656],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([97.9464714,-97.9472964]).appendArc([97.5989346,-97.7039485],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([97.3895052,-97.7408766]).appendArc([97.1278312,-97.6600884],{"radius":0.3,"clockwise":true,"large":false}).appendArc([96.8661571,-97.5793003],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([94.1086954,-98.0655152]).appendArc([93.8904335,-98.230929],{"radius":0.3,"clockwise":false,"large":false}).appendArc([93.6721716,-98.3963428],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([93.462742,-98.4332709]).appendArc([93.2193942,-98.7808077],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([93.427772,-99.9625769]).appendArc([93.7753088,-100.2059248],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[46.004409,-89.4332951],[46.2138384,-89.396367]]).appendArc([46.4755124,-89.4771552],{"radius":0.3,"clockwise":true,"large":false}).appendArc([46.7371865,-89.5579433],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([49.4946481,-89.0717284]).appendArc([49.7129101,-88.9063146],{"radius":0.3,"clockwise":false,"large":false}).appendArc([49.931172,-88.7409008],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([50.1406015,-88.7039728]).appendArc([50.3839494,-88.3564359],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([50.1755716,-87.1746667]).appendArc([49.8280348,-86.9313188],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([49.6186054,-86.9682469]).appendArc([49.3569314,-86.8874587],{"radius":0.3,"clockwise":true,"large":false}).appendArc([49.0952573,-86.8066706],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([46.3377956,-87.2928855]).appendArc([46.1195337,-87.4582993],{"radius":0.3,"clockwise":false,"large":false}).appendArc([45.9012718,-87.6237131],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([45.6918422,-87.6606412]).appendArc([45.4484944,-88.008178],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([45.6568722,-89.1899472]).appendArc([46.004409,-89.4332951],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[62.254939,-77.936762],[62.4643684,-77.8998339]]).appendArc([62.7260424,-77.9806221],{"radius":0.3,"clockwise":true,"large":false}).appendArc([62.9877165,-78.0614102],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([65.7451781,-77.5751953]).appendArc([65.9634401,-77.4097815],{"radius":0.3,"clockwise":false,"large":false}).appendArc([66.181702,-77.2443677],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([66.3911315,-77.2074397]).appendArc([66.6344794,-76.8599028],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([66.4261016,-75.6781336]).appendArc([66.0785648,-75.4347857],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([65.8691354,-75.4717138]).appendArc([65.6074614,-75.3909256],{"radius":0.3,"clockwise":true,"large":false}).appendArc([65.3457873,-75.3101375],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([62.5883256,-75.7963524]).appendArc([62.3700637,-75.9617662],{"radius":0.3,"clockwise":false,"large":false}).appendArc([62.1518018,-76.12718],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([61.9423722,-76.1641081]).appendArc([61.6990244,-76.5116449],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([61.9074022,-77.6934141]).appendArc([62.254939,-77.936762],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[111.9104389,-98.2649774],[112.1230992,-98.2649774]]).appendArc([112.3667691,-98.3899774],{"radius":0.3,"clockwise":true,"large":false}).appendArc([112.6104389,-98.5149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([115.4104389,-98.5149774]).appendArc([115.6541088,-98.3899774],{"radius":0.3,"clockwise":false,"large":false}).appendArc([115.8977786,-98.2649774],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.1104389,-98.2649774]).appendArc([116.4104389,-97.9649774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.4104389,-96.7649774]).appendArc([116.1104389,-96.4649774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([115.8977786,-96.4649774]).appendArc([115.6541087,-96.3399774],{"radius":0.3,"clockwise":true,"large":false}).appendArc([115.4104389,-96.2149774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([112.6104389,-96.2149774]).appendArc([112.366769,-96.3399774],{"radius":0.3,"clockwise":false,"large":false}).appendArc([112.1230992,-96.4649774],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([111.9104389,-96.4649774]).appendArc([111.6104389,-96.7649774],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([111.6104389,-97.9649774]).appendArc([111.9104389,-98.2649774],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[134.3816205,-80.2845974],[134.5942808,-80.2845974]]).appendArc([134.8379507,-80.4095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([135.0816205,-80.5345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([137.8816205,-80.5345974]).appendArc([138.1252904,-80.4095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([138.3689602,-80.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.5816205,-80.2845974]).appendArc([138.8816205,-79.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.8816205,-78.7845974]).appendArc([138.5816205,-78.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.3689602,-78.4845974]).appendArc([138.1252903,-78.3595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([137.8816205,-78.2345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([135.0816205,-78.2345974]).appendArc([134.8379506,-78.3595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([134.5942808,-78.4845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.3816205,-78.4845974]).appendArc([134.0816205,-78.7845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.0816205,-79.9845974]).appendArc([134.3816205,-80.2845974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[116.3816205,-77.7345974],[116.5942808,-77.7345974]]).appendArc([116.8379507,-77.8595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([117.0816205,-77.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([119.8816205,-77.9845974]).appendArc([120.1252904,-77.8595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([120.3689602,-77.7345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.5816205,-77.7345974]).appendArc([120.8816205,-77.4345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([120.8816205,-76.2345974]).appendArc([120.5816205,-75.9345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([120.3689602,-75.9345974]).appendArc([120.1252903,-75.8095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([119.8816205,-75.6845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([117.0816205,-75.6845974]).appendArc([116.8379506,-75.8095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([116.5942808,-75.9345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.3816205,-75.9345974]).appendArc([116.0816205,-76.2345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.0816205,-77.4345974]).appendArc([116.3816205,-77.7345974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[98.3816205,-69.2345974],[98.5942808,-69.2345974]]).appendArc([98.8379507,-69.3595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([99.0816205,-69.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.8816205,-69.4845974]).appendArc([102.1252904,-69.3595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([102.3689602,-69.2345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.5816205,-69.2345974]).appendArc([102.8816205,-68.9345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([102.8816205,-67.7345974]).appendArc([102.5816205,-67.4345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([102.3689602,-67.4345974]).appendArc([102.1252903,-67.3095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([101.8816205,-67.1845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([99.0816205,-67.1845974]).appendArc([98.8379506,-67.3095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([98.5942808,-67.4345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([98.3816205,-67.4345974]).appendArc([98.0816205,-67.7345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.0816205,-68.9345974]).appendArc([98.3816205,-69.2345974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[134.3816205,-46.2845974],[134.5942808,-46.2845974]]).appendArc([134.8379507,-46.4095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([135.0816205,-46.5345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([137.8816205,-46.5345974]).appendArc([138.1252904,-46.4095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([138.3689602,-46.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.5816205,-46.2845974]).appendArc([138.8816205,-45.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.8816205,-44.7845974]).appendArc([138.5816205,-44.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.3689602,-44.4845974]).appendArc([138.1252903,-44.3595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([137.8816205,-44.2345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([135.0816205,-44.2345974]).appendArc([134.8379506,-44.3595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([134.5942808,-44.4845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.3816205,-44.4845974]).appendArc([134.0816205,-44.7845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.0816205,-45.9845974]).appendArc([134.3816205,-46.2845974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[134.3816205,-63.2845974],[134.5942808,-63.2845974]]).appendArc([134.8379507,-63.4095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([135.0816205,-63.5345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([137.8816205,-63.5345974]).appendArc([138.1252904,-63.4095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([138.3689602,-63.2845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([138.5816205,-63.2845974]).appendArc([138.8816205,-62.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.8816205,-61.7845974]).appendArc([138.5816205,-61.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([138.3689602,-61.4845974]).appendArc([138.1252903,-61.3595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([137.8816205,-61.2345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([135.0816205,-61.2345974]).appendArc([134.8379506,-61.3595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([134.5942808,-61.4845974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.3816205,-61.4845974]).appendArc([134.0816205,-61.7845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.0816205,-62.9845974]).appendArc([134.3816205,-63.2845974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[116.3816205,-43.7345974],[116.5942808,-43.7345974]]).appendArc([116.8379507,-43.8595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([117.0816205,-43.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([119.8816205,-43.9845974]).appendArc([120.1252904,-43.8595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([120.3689602,-43.7345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.5816205,-43.7345974]).appendArc([120.8816205,-43.4345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([120.8816205,-42.2345974]).appendArc([120.5816205,-41.9345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([120.3689602,-41.9345974]).appendArc([120.1252903,-41.8095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([119.8816205,-41.6845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([117.0816205,-41.6845974]).appendArc([116.8379506,-41.8095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([116.5942808,-41.9345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.3816205,-41.9345974]).appendArc([116.0816205,-42.2345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.0816205,-43.4345974]).appendArc([116.3816205,-43.7345974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[116.3816205,-60.7345974],[116.5942808,-60.7345974]]).appendArc([116.8379507,-60.8595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([117.0816205,-60.9845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([119.8816205,-60.9845974]).appendArc([120.1252904,-60.8595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([120.3689602,-60.7345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([120.5816205,-60.7345974]).appendArc([120.8816205,-60.4345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([120.8816205,-59.2345974]).appendArc([120.5816205,-58.9345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([120.3689602,-58.9345974]).appendArc([120.1252903,-58.8095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([119.8816205,-58.6845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([117.0816205,-58.6845974]).appendArc([116.8379506,-58.8095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([116.5942808,-58.9345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([116.3816205,-58.9345974]).appendArc([116.0816205,-59.2345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([116.0816205,-60.4345974]).appendArc([116.3816205,-60.7345974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[98.3816205,-35.2345974],[98.5942808,-35.2345974]]).appendArc([98.8379507,-35.3595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([99.0816205,-35.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.8816205,-35.4845974]).appendArc([102.1252904,-35.3595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([102.3689602,-35.2345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.5816205,-35.2345974]).appendArc([102.8816205,-34.9345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([102.8816205,-33.7345974]).appendArc([102.5816205,-33.4345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([102.3689602,-33.4345974]).appendArc([102.1252903,-33.3095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([101.8816205,-33.1845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([99.0816205,-33.1845974]).appendArc([98.8379506,-33.3095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([98.5942808,-33.4345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([98.3816205,-33.4345974]).appendArc([98.0816205,-33.7345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.0816205,-34.9345974]).appendArc([98.3816205,-35.2345974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[98.3816205,-52.2345974],[98.5942808,-52.2345974]]).appendArc([98.8379507,-52.3595974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([99.0816205,-52.4845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([101.8816205,-52.4845974]).appendArc([102.1252904,-52.3595974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([102.3689602,-52.2345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([102.5816205,-52.2345974]).appendArc([102.8816205,-51.9345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([102.8816205,-50.7345974]).appendArc([102.5816205,-50.4345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([102.3689602,-50.4345974]).appendArc([102.1252903,-50.3095974],{"radius":0.3,"clockwise":true,"large":false}).appendArc([101.8816205,-50.1845974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([99.0816205,-50.1845974]).appendArc([98.8379506,-50.3095974],{"radius":0.3,"clockwise":false,"large":false}).appendArc([98.5942808,-50.4345974],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([98.3816205,-50.4345974]).appendArc([98.0816205,-50.7345974],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([98.0816205,-51.9345974]).appendArc([98.3816205,-52.2345974],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[79.7800807,-62.6018789],[79.9922229,-62.5870445]]).appendArc([80.2440188,-62.6947424],{"radius":0.3,"clockwise":true,"large":false}).appendArc([80.4958146,-62.8024404],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([83.288994,-62.6071222]).appendArc([83.5233507,-62.4654291],{"radius":0.3,"clockwise":false,"large":false}).appendArc([83.7577074,-62.3237361],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([83.9698497,-62.3089017]).appendArc([84.248192,-61.9887056],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([84.1644842,-60.7916287]).appendArc([83.8442881,-60.5132864],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([83.6321458,-60.5281208]).appendArc([83.3803499,-60.4204229],{"radius":0.3,"clockwise":true,"large":false}).appendArc([83.1285541,-60.3127249],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([80.3353748,-60.5080431]).appendArc([80.101018,-60.6497362],{"radius":0.3,"clockwise":false,"large":false}).appendArc([79.8666613,-60.7914292],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([79.654519,-60.8062636]).appendArc([79.3761768,-61.1264597],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([79.4598845,-62.3235366]).appendArc([79.7800806,-62.6018789],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[78.5942206,-45.64329],[78.8063628,-45.6284556]]).appendArc([79.0581587,-45.7361535],{"radius":0.3,"clockwise":true,"large":false}).appendArc([79.3099545,-45.8438515],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([82.1031339,-45.6485333]).appendArc([82.3374906,-45.5068402],{"radius":0.3,"clockwise":false,"large":false}).appendArc([82.5718473,-45.3651472],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([82.7839896,-45.3503128]).appendArc([83.0623319,-45.0301167],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([82.9786241,-43.8330398]).appendArc([82.658428,-43.5546975],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([82.4462857,-43.5695319]).appendArc([82.1944898,-43.461834],{"radius":0.3,"clockwise":true,"large":false}).appendArc([81.942694,-43.354136],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([79.1495147,-43.5494542]).appendArc([78.9151579,-43.6911473],{"radius":0.3,"clockwise":false,"large":false}).appendArc([78.6808012,-43.8328403],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([78.4686589,-43.8476747]).appendArc([78.1903167,-44.1678708],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([78.2740244,-45.3649477]).appendArc([78.5942205,-45.64329],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[80.9659408,-79.5604678],[81.178083,-79.5456334]]).appendArc([81.4298789,-79.6533313],{"radius":0.3,"clockwise":true,"large":false}).appendArc([81.6816747,-79.7610293],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([84.4748541,-79.5657111]).appendArc([84.7092108,-79.424018],{"radius":0.3,"clockwise":false,"large":false}).appendArc([84.9435675,-79.282325],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([85.1557098,-79.2674906]).appendArc([85.4340521,-78.9472945],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([85.3503443,-77.7502176]).appendArc([85.0301482,-77.4718753],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([84.8180059,-77.4867097]).appendArc([84.56621,-77.3790118],{"radius":0.3,"clockwise":true,"large":false}).appendArc([84.3144142,-77.2713138],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([81.5212349,-77.466632]).appendArc([81.2868781,-77.6083251],{"radius":0.3,"clockwise":false,"large":false}).appendArc([81.0525214,-77.7500181],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([80.8403791,-77.7648525]).appendArc([80.5620369,-78.0850486],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([80.6457446,-79.2821255]).appendArc([80.9659407,-79.5604678],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[130.1982565,-100.1394218],[130.4036705,-100.1944623]]).appendArc([130.6066851,-100.3782695],{"radius":0.3,"clockwise":true,"large":false}).appendArc([130.8096998,-100.5620765],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([133.5142921,-101.2867699]).appendArc([133.7820115,-101.2290955],{"radius":0.3,"clockwise":false,"large":false}).appendArc([134.049731,-101.1714212],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([134.255145,-101.2264618]).appendArc([134.6225684,-101.0143297],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.9331513,-99.8552187]).appendArc([134.7210192,-99.4877953],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([134.5156052,-99.4327548]).appendArc([134.3125906,-99.2489476],{"radius":0.3,"clockwise":true,"large":false}).appendArc([134.1095759,-99.0651405],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([131.4049836,-98.3404472]).appendArc([131.1372642,-98.3981215],{"radius":0.3,"clockwise":false,"large":false}).appendArc([130.8695447,-98.4557959],{"radius":0.3,"clockwise":true,"large":false}).appendPoint([130.6641308,-98.4007553]).appendArc([130.2967074,-98.6128873],{"radius":0.3,"clockwise":false,"large":false}).appendPoint([129.9861245,-99.7719983]).appendArc([130.1982565,-100.1394217],{"radius":0.3,"clockwise":false,"large":false}).close().innerToCAG()
).extrude({ offset: [0, 0, 3.7] });
}


function _choc_posts_cutouts_extrude_3_7_outline_fn(){
    return CAG.circle({"center":[164.0460497,-110.8743634],"radius":1.25})
.union(
    CAG.circle({"center":[147.3833037,-99.8736814],"radius":1.25})
).union(
    CAG.circle({"center":[128.4411411,-93.5604747],"radius":1.25})
).union(
    CAG.circle({"center":[108.5104389,-92.3649774],"radius":1.25})
).union(
    CAG.circle({"center":[89.4024382,-94.9859629],"radius":1.25})
).union(
    CAG.circle({"center":[130.9816205,-40.3845974],"radius":1.25})
).union(
    CAG.circle({"center":[130.9816205,-57.3845974],"radius":1.25})
).union(
    CAG.circle({"center":[130.9816205,-74.3845974],"radius":1.25})
).union(
    CAG.circle({"center":[112.9816205,-37.8345974],"radius":1.25})
).union(
    CAG.circle({"center":[112.9816205,-54.8345974],"radius":1.25})
).union(
    CAG.circle({"center":[112.9816205,-71.8345974],"radius":1.25})
).union(
    CAG.circle({"center":[94.9816205,-29.3345974],"radius":1.25})
).union(
    CAG.circle({"center":[94.9816205,-46.3345974],"radius":1.25})
).union(
    CAG.circle({"center":[94.9816205,-63.3345974],"radius":1.25})
).union(
    CAG.circle({"center":[74.7909396,-39.9948341],"radius":1.25})
).union(
    CAG.circle({"center":[75.9767997,-56.953423],"radius":1.25})
).union(
    CAG.circle({"center":[77.1626598,-73.9120119],"radius":1.25})
).union(
    CAG.circle({"center":[54.9300494,-55.9750683],"radius":1.25})
).union(
    CAG.circle({"center":[57.8820684,-72.7168001],"radius":1.25})
).union(
    CAG.circle({"center":[60.8340874,-89.4585319],"radius":1.25})
).union(
    CAG.circle({"center":[38.6795194,-67.4716014],"radius":1.25})
).union(
    CAG.circle({"center":[41.6315384,-84.2133332],"radius":1.25})
).union(
    new CSG.Path2D.arc({"center":[139.0663251,-96.4074841],"radius":1.25,"startangle":165,"endangle":345}).appendPoint([140.92078,-94.3161934]).appendPoint([138.5059655,-93.6691458]).appendPoint([137.8589179,-96.0839603]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[171.8242243,-118.652538],"radius":1.25,"startangle":135,"endangle":315}).appendPoint([174.4758747,-117.7686545]).appendPoint([172.7081078,-116.0008876]).appendPoint([170.9403408,-117.7686545]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[68.7149536,-70.8066701],"radius":1.25,"startangle":190,"endangle":370}).appendPoint([69.5118429,-68.1275905]).appendPoint([67.0498235,-68.561711]).appendPoint([67.483944,-71.0237303]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[52.4644236,-82.3032032],"radius":1.25,"startangle":190,"endangle":370}).appendPoint([53.2613129,-79.6241236]).appendPoint([50.7992935,-80.0582441]).appendPoint([51.233414,-82.5202634]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[100.2353234,-93.0758329],"radius":1.25,"startangle":190,"endangle":370}).appendPoint([101.0322127,-90.3967533]).appendPoint([98.5701933,-90.8308738]).appendPoint([99.0043138,-93.2928931]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[71.6669726,-87.5484019],"radius":1.25,"startangle":190,"endangle":370}).appendPoint([72.4638619,-84.8693223]).appendPoint([70.0018425,-85.3034428]).appendPoint([70.435963,-87.7654621]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[65.7629346,-54.0649383],"radius":1.25,"startangle":190,"endangle":370}).appendPoint([66.5598239,-51.3858587]).appendPoint([64.0978045,-51.8199792]).appendPoint([64.531925,-54.2819985]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[49.5124046,-65.5614714],"radius":1.25,"startangle":190,"endangle":370}).appendPoint([50.3092939,-62.8823918]).appendPoint([47.8472745,-63.3165123]).appendPoint([48.281395,-65.7785316]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[156.9095831,-105.3736814],"radius":1.25,"startangle":150,"endangle":330}).appendPoint([159.2421149,-103.8336179]).appendPoint([157.0770514,-102.5836179]).appendPoint([155.8270514,-104.7486814]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[119.5104389,-92.3649774],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([120.7604389,-89.8649774]).appendPoint([118.2604389,-89.8649774]).appendPoint([118.2604389,-92.3649774]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[141.9816205,-40.3845974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([143.2316205,-37.8845974]).appendPoint([140.7316205,-37.8845974]).appendPoint([140.7316205,-40.3845974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[141.9816205,-57.3845974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([143.2316205,-54.8845974]).appendPoint([140.7316205,-54.8845974]).appendPoint([140.7316205,-57.3845974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[141.9816205,-74.3845974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([143.2316205,-71.8845974]).appendPoint([140.7316205,-71.8845974]).appendPoint([140.7316205,-74.3845974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[123.9816205,-37.8345974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([125.2316205,-35.3345974]).appendPoint([122.7316205,-35.3345974]).appendPoint([122.7316205,-37.8345974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[123.9816205,-54.8345974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([125.2316205,-52.3345974]).appendPoint([122.7316205,-52.3345974]).appendPoint([122.7316205,-54.8345974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[123.9816205,-71.8345974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([125.2316205,-69.3345974]).appendPoint([122.7316205,-69.3345974]).appendPoint([122.7316205,-71.8345974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[105.9816205,-29.3345974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([107.2316205,-26.8345974]).appendPoint([104.7316205,-26.8345974]).appendPoint([104.7316205,-29.3345974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[105.9816205,-46.3345974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([107.2316205,-43.8345974]).appendPoint([104.7316205,-43.8345974]).appendPoint([104.7316205,-46.3345974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[105.9816205,-63.3345974],"radius":1.25,"startangle":180,"endangle":360}).appendPoint([107.2316205,-60.8345974]).appendPoint([104.7316205,-60.8345974]).appendPoint([104.7316205,-63.3345974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[86.9500043,-56.1861018],"radius":1.25,"startangle":184,"endangle":364}).appendPoint([88.0225682,-53.6049961]).appendPoint([85.528658,-53.7793873]).appendPoint([85.7030492,-56.2732974]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[88.1358644,-73.1446907],"radius":1.25,"startangle":184,"endangle":364}).appendPoint([89.2084283,-70.563585]).appendPoint([86.7145181,-70.7379762]).appendPoint([86.8889093,-73.2318863]).close().innerToCAG()
).union(
    new CSG.Path2D.arc({"center":[85.7641442,-39.2275129],"radius":1.25,"startangle":184,"endangle":364}).appendPoint([86.8367081,-36.6464072]).appendPoint([84.3427979,-36.8207984]).appendPoint([84.5171891,-39.3147085]).close().innerToCAG()
).union(
    CAG.circle({"center":[167.935137,-114.7634507],"radius":2})
).union(
    CAG.circle({"center":[152.1464434,-102.6236814],"radius":2})
).union(
    CAG.circle({"center":[133.7537331,-94.9839794],"radius":2})
).union(
    CAG.circle({"center":[114.0104389,-92.3649774],"radius":2})
).union(
    CAG.circle({"center":[94.8188808,-94.0308979],"radius":2})
).union(
    CAG.circle({"center":[136.4816205,-40.3845974],"radius":2})
).union(
    CAG.circle({"center":[136.4816205,-57.3845974],"radius":2})
).union(
    CAG.circle({"center":[136.4816205,-74.3845974],"radius":2})
).union(
    CAG.circle({"center":[118.4816205,-37.8345974],"radius":2})
).union(
    CAG.circle({"center":[118.4816205,-54.8345974],"radius":2})
).union(
    CAG.circle({"center":[118.4816205,-71.8345974],"radius":2})
).union(
    CAG.circle({"center":[100.4816205,-29.3345974],"radius":2})
).union(
    CAG.circle({"center":[100.4816205,-46.3345974],"radius":2})
).union(
    CAG.circle({"center":[100.4816205,-63.3345974],"radius":2})
).union(
    CAG.circle({"center":[80.2775419,-39.6111735],"radius":2})
).union(
    CAG.circle({"center":[81.463402,-56.5697624],"radius":2})
).union(
    CAG.circle({"center":[82.6492621,-73.5283513],"radius":2})
).union(
    CAG.circle({"center":[60.346492,-55.0200033],"radius":2})
).union(
    CAG.circle({"center":[63.298511,-71.7617351],"radius":2})
).union(
    CAG.circle({"center":[66.25053,-88.5034669],"radius":2})
).union(
    CAG.circle({"center":[44.095962,-66.5165364],"radius":2})
).union(
    CAG.circle({"center":[47.047981,-83.2582682],"radius":2})
).extrude({ offset: [0, 0, 3.7] });
}


function _encoder_pins_cutouts_extrude_3_7_outline_fn(){
    return new CSG.Path2D.arc({"center":[93.4130208,-101.8944885],"radius":0.8,"startangle":100,"endangle":280}).appendPoint([98.968382,-101.7272698]).appendArc([98.690545,-100.1515774],{"radius":0.8,"clockwise":false,"large":false}).appendPoint([93.2741023,-101.1066423]).close().innerToCAG()
.extrude({ offset: [0, 0, 3.7] });
}


function _mcu_pins_cutouts_extrude_3_7_outline_fn(){
    return new CSG.Path2D.arc({"center":[163.9016205,-44.3345974],"radius":1.2,"startangle":359.0450261,"endangle":540.9549739}).appendPoint([162.7016205,-72.3545974]).appendArc([165.1014538,-72.3545974],{"radius":1.2,"clockwise":false,"large":false}).appendPoint([165.1016205,-44.3545974]).close().innerToCAG()
.union(
    new CSG.Path2D.arc({"center":[148.6616205,-44.3345974],"radius":1.2,"startangle":359.0450261,"endangle":540.9549739}).appendPoint([147.4616205,-72.3545974]).appendArc([149.8614538,-72.3545974],{"radius":1.2,"clockwise":false,"large":false}).appendPoint([149.8616205,-44.3545974]).close().innerToCAG()
).extrude({ offset: [0, 0, 3.7] });
}


function _display_pins_cutouts_extrude_3_7_outline_fn(){
    return new CSG.Path2D.arc({"center":[151.1816205,-77.0845974],"radius":1.2,"startangle":450,"endangle":630}).appendPoint([161.3816205,-78.2845974]).appendArc([161.3816205,-75.8845974],{"radius":1.2,"clockwise":false,"large":false}).appendPoint([151.1816205,-75.8845974]).close().innerToCAG()
.extrude({ offset: [0, 0, 3.7] });
}


function _battery_pins_cutouts_extrude_3_7_outline_fn(){
    return new CSG.Path2D([[156.6316205,-84.2845974],[160.3316205,-84.2845974]]).appendArc([161.1316205,-83.4845974],{"radius":0.8,"clockwise":false,"large":false}).appendPoint([161.1316205,-81.2845974]).appendArc([160.3316205,-80.4845974],{"radius":0.8,"clockwise":false,"large":false}).appendPoint([156.6316205,-80.4845974]).appendPoint([156.6316205,-84.2845974]).close().innerToCAG()
.extrude({ offset: [0, 0, 3.7] });
}


function case_inner_small_extrude_7_800000000000001_outline_fn(){
    return new CSG.Path2D([[166.8316205,-95.8757258],[166.8316205,-41.9845974]]).appendArc([164.2316205,-39.3845974],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([149.0571205,-39.3845974]).appendArc([146.6571205,-36.9845974],{"radius":2.4,"clockwise":true,"large":false}).appendPoint([146.6571205,-30.7590974]).appendArc([144.0571205,-28.1590974],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([113.0571205,-28.1590974]).appendArc([110.6571205,-25.7590974],{"radius":2.4,"clockwise":true,"large":false}).appendPoint([110.6571205,-22.2590974]).appendArc([108.0571205,-19.6590974],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([92.9061205,-19.6590974]).appendArc([90.3061205,-22.2590974],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([90.3061205,-26.9727442]).appendArc([88.0735361,-29.3668979],{"radius":2.4,"clockwise":true,"large":false}).appendPoint([72.0455667,-30.4876827]).appendArc([69.633267,-33.2627161],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([70.193655,-41.2766371]).appendArc([68.216257,-43.8075912],{"radius":2.4,"clockwise":true,"large":false}).appendPoint([51.205948,-46.8069677]).appendArc([49.096933,-49.8189531],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([57.4582663,-97.2384312]).appendArc([60.4702518,-99.3474462],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([82.3078762,-95.4968837]).appendArc([85.0881705,-97.4436666],{"radius":2.4,"clockwise":true,"large":false}).appendPoint([86.0266172,-102.7658622]).appendArc([89.0386026,-104.8748771],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([103.829505,-102.2668419]).appendArc([106.416863,-102.0404774],{"radius":14.9,"clockwise":true,"large":false}).appendPoint([120.7440586,-102.0404774]).appendArc([124.6004618,-102.5481824],{"radius":14.9,"clockwise":true,"large":false}).appendPoint([137.7537069,-106.0725838]).appendArc([141.3473033,-107.5611002],{"radius":14.9,"clockwise":true,"large":false}).appendPoint([153.1400577,-114.3696499]).appendArc([156.2260711,-116.7376082],{"radius":14.9,"clockwise":true,"large":false}).appendPoint([166.4502127,-126.9617498]).appendArc([170.127066,-126.9618517],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([180.1350407,-116.9538771]).appendArc([180.1368112,-113.2786942],{"radius":2.6,"clockwise":false,"large":false}).appendPoint([169.3960024,-102.5183595]).appendArc([169.2908434,-102.4060273],{"radius":2.4,"clockwise":true,"large":false}).appendArc([166.8316205,-95.8757258],{"radius":9.9,"clockwise":true,"large":false}).close().innerToCAG()
.extrude({ offset: [0, 0, 7.800000000000001] });
}


function _m2_insert_outer_posts_extrude_2_5_outline_fn(){
    return CAG.circle({"center":[73.5558933,-78.6000269],"radius":2.45})
.union(
    CAG.circle({"center":[124.0104389,-92.8649774],"radius":2.45})
).union(
    CAG.circle({"center":[160.5566974,-108.0566941],"radius":2.45})
).union(
    CAG.circle({"center":[127.1216205,-46.3345974],"radius":2.45})
).union(
    CAG.circle({"center":[90.4816205,-47.3345974],"radius":2.45})
).extrude({ offset: [0, 0, 2.5] });
}


function _m2_insert_inner_posts_extrude_4_95_outline_fn(){
    return CAG.circle({"center":[73.5558933,-78.6000269],"radius":1.35})
.union(
    CAG.circle({"center":[124.0104389,-92.8649774],"radius":1.35})
).union(
    CAG.circle({"center":[160.5566974,-108.0566941],"radius":1.35})
).union(
    CAG.circle({"center":[127.1216205,-46.3345974],"radius":1.35})
).union(
    CAG.circle({"center":[90.4816205,-47.3345974],"radius":1.35})
).extrude({ offset: [0, 0, 4.95] });
}


function _usbc_cutout_extrude_20_outline_fn(){
    return new CSG.Path2D.arc({"center":[150.2816205,-41.3845974],"radius":1.5,"startangle":540,"endangle":630}).appendPoint([162.2816205,-42.8845974]).appendArc([163.7816205,-41.3845974],{"radius":1.5,"clockwise":false,"large":false}).appendArc([165.2816205,-39.8845974],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([165.2816205,-38.3845974]).appendPoint([162.2816205,-38.3845974]).appendPoint([162.2816205,-36.8845974]).appendPoint([150.2816205,-36.8845974]).appendPoint([150.2816205,-38.3845974]).appendPoint([147.2816205,-38.3845974]).appendPoint([147.2816205,-39.8845974]).appendArc([148.7816205,-41.3845974],{"radius":1.5,"clockwise":true,"large":false}).close().innerToCAG()
.extrude({ offset: [0, 0, 20] });
}


function _power_reset_cutout_extrude_10_outline_fn(){
    return new CSG.Path2D.arc({"center":[168.4816205,-88.8345974],"radius":1.5,"startangle":270,"endangle":360}).appendPoint([169.9816205,-76.8345974]).appendArc([168.4816205,-75.3345974],{"radius":1.5,"clockwise":false,"large":false}).appendArc([166.9816205,-73.8345974],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([165.4816205,-73.8345974]).appendPoint([165.4816205,-76.8345974]).appendPoint([163.9816205,-76.8345974]).appendPoint([163.9816205,-88.8345974]).appendPoint([165.4816205,-88.8345974]).appendPoint([165.4816205,-91.8345974]).appendPoint([166.9816205,-91.8345974]).appendArc([168.4816205,-90.3345974],{"radius":1.5,"clockwise":true,"large":false}).close().innerToCAG()
.extrude({ offset: [0, 0, 10] });
}


function top_plate_small_extrude_1_3_outline_fn(){
    return new CSG.Path2D([[60.452887,-99.2489653],[82.2905114,-95.3984029]]).appendArc([85.1866513,-97.4263018],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([86.125098,-102.7484974]).appendArc([89.0212378,-104.7763963],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([103.8121403,-102.1683611]).appendArc([106.416863,-101.9404774],{"radius":15,"clockwise":true,"large":false}).appendPoint([120.7440586,-101.9404774]).appendArc([124.6263437,-102.4515899],{"radius":15,"clockwise":true,"large":false}).appendPoint([137.7795889,-105.9759912]).appendArc([141.3973033,-107.4744976],{"radius":15,"clockwise":true,"large":false}).appendPoint([153.1901801,-114.2831181]).appendArc([156.2967818,-116.6668975],{"radius":15,"clockwise":true,"large":false}).appendPoint([166.5209234,-126.8910391]).appendArc([170.0564574,-126.8910391],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([180.06433,-116.8831665]).appendArc([180.0659346,-113.3492387],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([166.9576956,-100.2171701]).appendArc([166.438324,-99.8182674],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([147.8071205,-89.0615371]).appendArc([146.5571205,-86.8964736],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([146.5571205,-30.7590974]).appendArc([144.0571205,-28.2590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([113.0571205,-28.2590974]).appendArc([110.5571205,-25.7590974],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([110.5571205,-22.2590974]).appendArc([108.0571205,-19.7590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([92.9061205,-19.7590974]).appendArc([90.4061205,-22.2590974],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([90.4061205,-26.9727442]).appendArc([88.0805117,-29.4666543],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([72.0525423,-30.5874391]).appendArc([69.7330234,-33.2557404],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([70.2934114,-41.2696614]).appendArc([68.2336218,-43.906072],{"radius":2.5,"clockwise":true,"large":false}).appendPoint([51.2233128,-46.9054485]).appendArc([49.1954138,-49.8015883],{"radius":2.5,"clockwise":false,"large":false}).appendPoint([57.5567472,-97.2210664]).appendArc([60.4528871,-99.2489654],{"radius":2.5,"clockwise":false,"large":false}).close().innerToCAG()
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
    new CSG.Path2D([[89.4680816,-101.9808318],[102.5660248,-99.671311]]).appendArc([102.7688147,-99.3816971],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([100.4592939,-86.2837539]).appendArc([100.16968,-86.080964],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([87.0717368,-88.3904848]).appendArc([86.8689469,-88.6800987],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([89.1784677,-101.7780419]).appendArc([89.4680816,-101.9808318],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[60.8997308,-96.4534008],[73.997674,-94.14388]]).appendArc([74.2004639,-93.8542661],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([71.8909431,-80.7563229]).appendArc([71.6013292,-80.553533],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([58.503386,-82.8630538]).appendArc([58.3005961,-83.1526677],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([60.6101169,-96.2506109]).appendArc([60.8997308,-96.4534008],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
).union(
    new CSG.Path2D([[54.9956928,-62.9699372],[68.093636,-60.6604164]]).appendArc([68.2964259,-60.3708025],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([65.9869051,-47.2728593]).appendArc([65.6972912,-47.0700694],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([52.599348,-49.3795902]).appendArc([52.3965581,-49.6692041],{"radius":0.25,"clockwise":false,"large":false}).appendPoint([54.7060789,-62.7671473]).appendArc([54.9956928,-62.9699372],{"radius":0.25,"clockwise":false,"large":false}).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.3] });
}


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




                function temporal_small_case_fn() {
                    

                // creating part 0 of case temporal_small
                let temporal_small__part_0 = case_outer_small_extrude_5_75_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_0_bounds = temporal_small__part_0.getBounds();
                let temporal_small__part_0_x = temporal_small__part_0_bounds[0].x + (temporal_small__part_0_bounds[1].x - temporal_small__part_0_bounds[0].x) / 2
                let temporal_small__part_0_y = temporal_small__part_0_bounds[0].y + (temporal_small__part_0_bounds[1].y - temporal_small__part_0_bounds[0].y) / 2
                temporal_small__part_0 = translate([-temporal_small__part_0_x, -temporal_small__part_0_y, 0], temporal_small__part_0);
                temporal_small__part_0 = rotate([0,0,0], temporal_small__part_0);
                temporal_small__part_0 = translate([temporal_small__part_0_x, temporal_small__part_0_y, 0], temporal_small__part_0);

                temporal_small__part_0 = translate([0,0,-1.85], temporal_small__part_0);
                let result = temporal_small__part_0;
                
            

                // creating part 1 of case temporal_small
                let temporal_small__part_1 = _socket_cutouts_small_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_1_bounds = temporal_small__part_1.getBounds();
                let temporal_small__part_1_x = temporal_small__part_1_bounds[0].x + (temporal_small__part_1_bounds[1].x - temporal_small__part_1_bounds[0].x) / 2
                let temporal_small__part_1_y = temporal_small__part_1_bounds[0].y + (temporal_small__part_1_bounds[1].y - temporal_small__part_1_bounds[0].y) / 2
                temporal_small__part_1 = translate([-temporal_small__part_1_x, -temporal_small__part_1_y, 0], temporal_small__part_1);
                temporal_small__part_1 = rotate([0,0,0], temporal_small__part_1);
                temporal_small__part_1 = translate([temporal_small__part_1_x, temporal_small__part_1_y, 0], temporal_small__part_1);

                temporal_small__part_1 = translate([0,0,-2.7750000000000004], temporal_small__part_1);
                result = result.subtract(temporal_small__part_1);
                
            

                // creating part 2 of case temporal_small
                let temporal_small__part_2 = _mcu_cover_nut_cutout_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_2_bounds = temporal_small__part_2.getBounds();
                let temporal_small__part_2_x = temporal_small__part_2_bounds[0].x + (temporal_small__part_2_bounds[1].x - temporal_small__part_2_bounds[0].x) / 2
                let temporal_small__part_2_y = temporal_small__part_2_bounds[0].y + (temporal_small__part_2_bounds[1].y - temporal_small__part_2_bounds[0].y) / 2
                temporal_small__part_2 = translate([-temporal_small__part_2_x, -temporal_small__part_2_y, 0], temporal_small__part_2);
                temporal_small__part_2 = rotate([0,0,0], temporal_small__part_2);
                temporal_small__part_2 = translate([temporal_small__part_2_x, temporal_small__part_2_y, 0], temporal_small__part_2);

                temporal_small__part_2 = translate([0,0,-2.7750000000000004], temporal_small__part_2);
                result = result.subtract(temporal_small__part_2);
                
            

                // creating part 3 of case temporal_small
                let temporal_small__part_3 = _diode_cutouts_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_3_bounds = temporal_small__part_3.getBounds();
                let temporal_small__part_3_x = temporal_small__part_3_bounds[0].x + (temporal_small__part_3_bounds[1].x - temporal_small__part_3_bounds[0].x) / 2
                let temporal_small__part_3_y = temporal_small__part_3_bounds[0].y + (temporal_small__part_3_bounds[1].y - temporal_small__part_3_bounds[0].y) / 2
                temporal_small__part_3 = translate([-temporal_small__part_3_x, -temporal_small__part_3_y, 0], temporal_small__part_3);
                temporal_small__part_3 = rotate([0,0,0], temporal_small__part_3);
                temporal_small__part_3 = translate([temporal_small__part_3_x, temporal_small__part_3_y, 0], temporal_small__part_3);

                temporal_small__part_3 = translate([0,0,-1.2], temporal_small__part_3);
                result = result.subtract(temporal_small__part_3);
                
            

                // creating part 4 of case temporal_small
                let temporal_small__part_4 = _choc_posts_cutouts_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_4_bounds = temporal_small__part_4.getBounds();
                let temporal_small__part_4_x = temporal_small__part_4_bounds[0].x + (temporal_small__part_4_bounds[1].x - temporal_small__part_4_bounds[0].x) / 2
                let temporal_small__part_4_y = temporal_small__part_4_bounds[0].y + (temporal_small__part_4_bounds[1].y - temporal_small__part_4_bounds[0].y) / 2
                temporal_small__part_4 = translate([-temporal_small__part_4_x, -temporal_small__part_4_y, 0], temporal_small__part_4);
                temporal_small__part_4 = rotate([0,0,0], temporal_small__part_4);
                temporal_small__part_4 = translate([temporal_small__part_4_x, temporal_small__part_4_y, 0], temporal_small__part_4);

                temporal_small__part_4 = translate([0,0,-1.3], temporal_small__part_4);
                result = result.subtract(temporal_small__part_4);
                
            

                // creating part 5 of case temporal_small
                let temporal_small__part_5 = _encoder_pins_cutouts_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_5_bounds = temporal_small__part_5.getBounds();
                let temporal_small__part_5_x = temporal_small__part_5_bounds[0].x + (temporal_small__part_5_bounds[1].x - temporal_small__part_5_bounds[0].x) / 2
                let temporal_small__part_5_y = temporal_small__part_5_bounds[0].y + (temporal_small__part_5_bounds[1].y - temporal_small__part_5_bounds[0].y) / 2
                temporal_small__part_5 = translate([-temporal_small__part_5_x, -temporal_small__part_5_y, 0], temporal_small__part_5);
                temporal_small__part_5 = rotate([0,0,0], temporal_small__part_5);
                temporal_small__part_5 = translate([temporal_small__part_5_x, temporal_small__part_5_y, 0], temporal_small__part_5);

                temporal_small__part_5 = translate([0,0,-1], temporal_small__part_5);
                result = result.subtract(temporal_small__part_5);
                
            

                // creating part 6 of case temporal_small
                let temporal_small__part_6 = _mcu_pins_cutouts_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_6_bounds = temporal_small__part_6.getBounds();
                let temporal_small__part_6_x = temporal_small__part_6_bounds[0].x + (temporal_small__part_6_bounds[1].x - temporal_small__part_6_bounds[0].x) / 2
                let temporal_small__part_6_y = temporal_small__part_6_bounds[0].y + (temporal_small__part_6_bounds[1].y - temporal_small__part_6_bounds[0].y) / 2
                temporal_small__part_6 = translate([-temporal_small__part_6_x, -temporal_small__part_6_y, 0], temporal_small__part_6);
                temporal_small__part_6 = rotate([0,0,0], temporal_small__part_6);
                temporal_small__part_6 = translate([temporal_small__part_6_x, temporal_small__part_6_y, 0], temporal_small__part_6);

                temporal_small__part_6 = translate([0,0,-1], temporal_small__part_6);
                result = result.subtract(temporal_small__part_6);
                
            

                // creating part 7 of case temporal_small
                let temporal_small__part_7 = _display_pins_cutouts_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_7_bounds = temporal_small__part_7.getBounds();
                let temporal_small__part_7_x = temporal_small__part_7_bounds[0].x + (temporal_small__part_7_bounds[1].x - temporal_small__part_7_bounds[0].x) / 2
                let temporal_small__part_7_y = temporal_small__part_7_bounds[0].y + (temporal_small__part_7_bounds[1].y - temporal_small__part_7_bounds[0].y) / 2
                temporal_small__part_7 = translate([-temporal_small__part_7_x, -temporal_small__part_7_y, 0], temporal_small__part_7);
                temporal_small__part_7 = rotate([0,0,0], temporal_small__part_7);
                temporal_small__part_7 = translate([temporal_small__part_7_x, temporal_small__part_7_y, 0], temporal_small__part_7);

                temporal_small__part_7 = translate([0,0,-1], temporal_small__part_7);
                result = result.subtract(temporal_small__part_7);
                
            

                // creating part 8 of case temporal_small
                let temporal_small__part_8 = _battery_pins_cutouts_extrude_3_7_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_8_bounds = temporal_small__part_8.getBounds();
                let temporal_small__part_8_x = temporal_small__part_8_bounds[0].x + (temporal_small__part_8_bounds[1].x - temporal_small__part_8_bounds[0].x) / 2
                let temporal_small__part_8_y = temporal_small__part_8_bounds[0].y + (temporal_small__part_8_bounds[1].y - temporal_small__part_8_bounds[0].y) / 2
                temporal_small__part_8 = translate([-temporal_small__part_8_x, -temporal_small__part_8_y, 0], temporal_small__part_8);
                temporal_small__part_8 = rotate([0,0,0], temporal_small__part_8);
                temporal_small__part_8 = translate([temporal_small__part_8_x, temporal_small__part_8_y, 0], temporal_small__part_8);

                temporal_small__part_8 = translate([0,0,-1], temporal_small__part_8);
                result = result.subtract(temporal_small__part_8);
                
            

                // creating part 9 of case temporal_small
                let temporal_small__part_9 = case_inner_small_extrude_7_800000000000001_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_9_bounds = temporal_small__part_9.getBounds();
                let temporal_small__part_9_x = temporal_small__part_9_bounds[0].x + (temporal_small__part_9_bounds[1].x - temporal_small__part_9_bounds[0].x) / 2
                let temporal_small__part_9_y = temporal_small__part_9_bounds[0].y + (temporal_small__part_9_bounds[1].y - temporal_small__part_9_bounds[0].y) / 2
                temporal_small__part_9 = translate([-temporal_small__part_9_x, -temporal_small__part_9_y, 0], temporal_small__part_9);
                temporal_small__part_9 = rotate([0,0,0], temporal_small__part_9);
                temporal_small__part_9 = translate([temporal_small__part_9_x, temporal_small__part_9_y, 0], temporal_small__part_9);

                temporal_small__part_9 = translate([0,0,0], temporal_small__part_9);
                result = result.subtract(temporal_small__part_9);
                
            

                // creating part 10 of case temporal_small
                let temporal_small__part_10 = _m2_insert_outer_posts_extrude_2_5_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_10_bounds = temporal_small__part_10.getBounds();
                let temporal_small__part_10_x = temporal_small__part_10_bounds[0].x + (temporal_small__part_10_bounds[1].x - temporal_small__part_10_bounds[0].x) / 2
                let temporal_small__part_10_y = temporal_small__part_10_bounds[0].y + (temporal_small__part_10_bounds[1].y - temporal_small__part_10_bounds[0].y) / 2
                temporal_small__part_10 = translate([-temporal_small__part_10_x, -temporal_small__part_10_y, 0], temporal_small__part_10);
                temporal_small__part_10 = rotate([0,0,0], temporal_small__part_10);
                temporal_small__part_10 = translate([temporal_small__part_10_x, temporal_small__part_10_y, 0], temporal_small__part_10);

                temporal_small__part_10 = translate([0,0,0], temporal_small__part_10);
                result = result.union(temporal_small__part_10);
                
            

                // creating part 11 of case temporal_small
                let temporal_small__part_11 = _m2_insert_inner_posts_extrude_4_95_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_11_bounds = temporal_small__part_11.getBounds();
                let temporal_small__part_11_x = temporal_small__part_11_bounds[0].x + (temporal_small__part_11_bounds[1].x - temporal_small__part_11_bounds[0].x) / 2
                let temporal_small__part_11_y = temporal_small__part_11_bounds[0].y + (temporal_small__part_11_bounds[1].y - temporal_small__part_11_bounds[0].y) / 2
                temporal_small__part_11 = translate([-temporal_small__part_11_x, -temporal_small__part_11_y, 0], temporal_small__part_11);
                temporal_small__part_11 = rotate([0,0,0], temporal_small__part_11);
                temporal_small__part_11 = translate([temporal_small__part_11_x, temporal_small__part_11_y, 0], temporal_small__part_11);

                temporal_small__part_11 = translate([0,0,-1.4500000000000002], temporal_small__part_11);
                result = result.subtract(temporal_small__part_11);
                
            

                // creating part 12 of case temporal_small
                let temporal_small__part_12 = _usbc_cutout_extrude_20_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_12_bounds = temporal_small__part_12.getBounds();
                let temporal_small__part_12_x = temporal_small__part_12_bounds[0].x + (temporal_small__part_12_bounds[1].x - temporal_small__part_12_bounds[0].x) / 2
                let temporal_small__part_12_y = temporal_small__part_12_bounds[0].y + (temporal_small__part_12_bounds[1].y - temporal_small__part_12_bounds[0].y) / 2
                temporal_small__part_12 = translate([-temporal_small__part_12_x, -temporal_small__part_12_y, 0], temporal_small__part_12);
                temporal_small__part_12 = rotate([90,0,0], temporal_small__part_12);
                temporal_small__part_12 = translate([temporal_small__part_12_x, temporal_small__part_12_y, 0], temporal_small__part_12);

                temporal_small__part_12 = translate([0,10,3.9000000000000004], temporal_small__part_12);
                result = result.subtract(temporal_small__part_12);
                
            

                // creating part 13 of case temporal_small
                let temporal_small__part_13 = _power_reset_cutout_extrude_10_outline_fn();

                // make sure that rotations are relative
                let temporal_small__part_13_bounds = temporal_small__part_13.getBounds();
                let temporal_small__part_13_x = temporal_small__part_13_bounds[0].x + (temporal_small__part_13_bounds[1].x - temporal_small__part_13_bounds[0].x) / 2
                let temporal_small__part_13_y = temporal_small__part_13_bounds[0].y + (temporal_small__part_13_bounds[1].y - temporal_small__part_13_bounds[0].y) / 2
                temporal_small__part_13 = translate([-temporal_small__part_13_x, -temporal_small__part_13_y, 0], temporal_small__part_13);
                temporal_small__part_13 = rotate([0,90,0], temporal_small__part_13);
                temporal_small__part_13 = translate([temporal_small__part_13_x, temporal_small__part_13_y, 0], temporal_small__part_13);

                temporal_small__part_13 = translate([-5,0,3.9000000000000004], temporal_small__part_13);
                result = result.subtract(temporal_small__part_13);
                
            
                    return result;
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
            
            

                function combined_small_case_fn() {
                    

                // creating part 0 of case combined_small
                let combined_small__part_0 = temporal_small_case_fn();

                // make sure that rotations are relative
                let combined_small__part_0_bounds = combined_small__part_0.getBounds();
                let combined_small__part_0_x = combined_small__part_0_bounds[0].x + (combined_small__part_0_bounds[1].x - combined_small__part_0_bounds[0].x) / 2
                let combined_small__part_0_y = combined_small__part_0_bounds[0].y + (combined_small__part_0_bounds[1].y - combined_small__part_0_bounds[0].y) / 2
                combined_small__part_0 = translate([-combined_small__part_0_x, -combined_small__part_0_y, 0], combined_small__part_0);
                combined_small__part_0 = rotate([0,0,0], combined_small__part_0);
                combined_small__part_0 = translate([combined_small__part_0_x, combined_small__part_0_y, 0], combined_small__part_0);

                combined_small__part_0 = translate([0,0,0], combined_small__part_0);
                let result = combined_small__part_0;
                
            

                // creating part 1 of case combined_small
                let combined_small__part_1 = top_plate_small_case_fn();

                // make sure that rotations are relative
                let combined_small__part_1_bounds = combined_small__part_1.getBounds();
                let combined_small__part_1_x = combined_small__part_1_bounds[0].x + (combined_small__part_1_bounds[1].x - combined_small__part_1_bounds[0].x) / 2
                let combined_small__part_1_y = combined_small__part_1_bounds[0].y + (combined_small__part_1_bounds[1].y - combined_small__part_1_bounds[0].y) / 2
                combined_small__part_1 = translate([-combined_small__part_1_x, -combined_small__part_1_y, 0], combined_small__part_1);
                combined_small__part_1 = rotate([0,0,0], combined_small__part_1);
                combined_small__part_1 = translate([combined_small__part_1_x, combined_small__part_1_y, 0], combined_small__part_1);

                combined_small__part_1 = translate([0,0,2.5], combined_small__part_1);
                result = result.union(combined_small__part_1);
                
            

                // creating part 2 of case combined_small
                let combined_small__part_2 = mcu_cover_case_fn();

                // make sure that rotations are relative
                let combined_small__part_2_bounds = combined_small__part_2.getBounds();
                let combined_small__part_2_x = combined_small__part_2_bounds[0].x + (combined_small__part_2_bounds[1].x - combined_small__part_2_bounds[0].x) / 2
                let combined_small__part_2_y = combined_small__part_2_bounds[0].y + (combined_small__part_2_bounds[1].y - combined_small__part_2_bounds[0].y) / 2
                combined_small__part_2 = translate([-combined_small__part_2_x, -combined_small__part_2_y, 0], combined_small__part_2);
                combined_small__part_2 = rotate([0,0,0], combined_small__part_2);
                combined_small__part_2 = translate([combined_small__part_2_x, combined_small__part_2_y, 0], combined_small__part_2);

                combined_small__part_2 = translate([0,0,11.6], combined_small__part_2);
                result = result.union(combined_small__part_2);
                
            
                    return result;
                }
            
            
        
            function main() {
                return combined_small_case_fn();
            }

        