/* * * * * * * * * * * * * * * * * * D A T A * * * * * * * * * * * * * * * * * * * * * * * *
 THE DATA IN THIS SKETCH COMES
 THE GOVERNMENT OFFICIAL WEBSITE
 SEE THE DATA:
 https://ukhsa-dashboard.data.gov.uk
* * * * * * * * * * * * * * * * * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * */

let data;

function preload() {
  // Load the CSV data
  data = loadTable('linegraph.csv', 'csv', 'header');
}

function setup() {
  createCanvas(10010, 600);
  drawLineGraph();
}

function drawLineGraph() {
  background(0, 94, 184);
  
  // Set up some variables for the graph
  let xPadding = 50;
  let yPadding = 50;
  let graphWidth = width - 2 * xPadding;
  let graphHeight = height - 2 * yPadding;
  
  // Find the minimum and maximum values in the data
  let minDeaths = Infinity;
  let maxDeaths = -Infinity;
  for (let i = 0; i < data.getRowCount(); i++) {
    let deaths = data.getNum(i, 'deaths');
    minDeaths = min(minDeaths, deaths);
    maxDeaths = max(maxDeaths, deaths);
  }
  
  // Draw the x and y axes
  stroke(0);
  line(xPadding, height - yPadding, width - xPadding, height - yPadding);
  line(xPadding, height - yPadding, xPadding, yPadding);
  
  // Draw the labels for the x and y axes
  textAlign(CENTER);
  textSize(15);
  fill(255);
  text('Time', width / 20, height -10);
  text('Number of Deaths', -70, 300, height / 2);
  
  // Draw the data points and connect them with lines
  fill(10, 124, 84);
  beginShape();
  for (let i = 0; i < data.getRowCount(); i++) {
    let x = map(i, 0, data.getRowCount() - 1, xPadding, width - xPadding);
    let y = map(data.getNum(i, 'deaths'), minDeaths, maxDeaths, height - yPadding, yPadding);
    vertex(x, y);
    // Draw circles at data points for better visibility
    ellipse(x, y, 5, 9);
  }
  endShape();
}
