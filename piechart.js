/* * * * * * * * * * * * * * * * * * D A T A * * * * * * * * * * * * * * * * * * * * * * * *
 THE DATA IN THIS SKETCH COMES
 FROM THE NHS
 SEE THE DATA:
 https://www.england.nhs.uk/statistics/statistical-work-areas/covid-19-deaths/
* * * * * * * * * * * * * * * * * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * */

let dataset1 = []; 

let total = 0;
let scaling = 0;

function preload() {
  dataset = loadTable("pie.csv", "header"); 
}

function setup() {
  let cnv = createCanvas(1010, 650);
  noStroke();
  colorMode(RGB);
  
  //loop through each row
  for (let row = 0; row < dataset.getRowCount(); row++) {
    
    //get the value from column 1 of the current row
    let value = dataset.getNum(row, 1);
    print(value);
    //add up all the values so we can find out the total
  total += value;
  }

  //here we can update the 'scaling' variable so we can scale everything in proportion
 scaling = 100 / total;
}

function piechart(x, y, w, h) {
  let currentAngle = 0; //make a variable to keep track of what the starting angle of each sector arc should be


  //loop through each row in the dataset
 for (let row = 0; row < dataset.getRowCount(); row++) {
    //calculate the angle for this sector

    let sectorAngle = radians(dataset.getNum(row, 1) * scaling * 3.6);

    //use push() and pop() to help control position of each arc and text
    push();
    translate(x, y);
    //rotate to the current starting angle
   rotate(currentAngle);
    fill(0, 94, 184);
    stroke(0);
    strokeWeight(1);
    //draw the arc from 0 to sectorAngle
    arc(0, 0, w, h, 0, sectorAngle, PIE);
    
    //add text label for each sector
    fill(255);
    noStroke();
    rotate(sectorAngle / 2);
    text(dataset.getString(row, 0), w / 2 + 10, 0);
   pop();
    
    //update the currentAngle for the next sector
    currentAngle += sectorAngle;
  }
}

function draw() {
  background(0, 112, 60);
  fill(255);
  textSize(25)
  text('Covid-19 impacted deaths by age range',20, 50)
  
  piechart(width/2, height/2, 400, 400);
}



