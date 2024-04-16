 let data = {
    "Irish (White) = 1215" : 1215, 
    "Any other White background = 1279" : 1279,  
    "White and Black Caribbean (Mixed) = 156" : 156, 
    "White and Black African (Mixed) = 70" : 70, 
    "White and Asian (Mixed) = 147" : 147,
    "Any other Mixed background = 326" : 326,
    "Indian (Asian or Asian British) = 3157" : 3157,
    "Pakistani (Asian or Asian British) = 2530" : 2530,
    "Bangladeshi (Asian or Asian British) = 899" : 899,
    "Any other Asian background = 1575" : 1575,
    "Caribbean (Black or Black British) = 1983" : 1983,
    "African (Black or Black British) = 1207" : 1207,
    "Any other Black background = 623" : 623,
    "Chinese (other ethnic group) = 332" : 332,
    "Any other ethnic group = 2235" : 2235,
    "Not stated = 12322" : 12322,
    "No match = 1867": 1867,   
 }

 let img;
 function preload() {
  img = loadImage('assets/laDefense.jpg');
}
      
      function setup() {
        createCanvas(5000, 10000);
        drawBarGraph();

        image(img, 10, 10);
      }
      
      function drawBarGraph() {
        background(500);
        let barWidth = width / Object.keys(data).length;
        let maxValue = Math.max(...Object.values(data));
        
        // Draw bars for each ethnicity
        let index = 0;
        for (let ethnicity in data) {
          let barHeight = map(data[ethnicity], 0, maxValue, 0, height);
          let x = index * barWidth;
          let y = height - barHeight;
          let barColor = map(index, 0, Object.keys(data).length, 0, 255);
          
          fill(barColor, 100, 100);
          rect(x, y, barWidth, barHeight);
          
          
          textAlign(CENTER);
          textSize(15);
          text(ethnicity, x + barWidth / 2, y - 10);
          
          index++;
        }
      }
    