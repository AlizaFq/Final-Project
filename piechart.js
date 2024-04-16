let dataset1 = []; //master array to load the dataset file in rows

let total = 0;
let scaling = 0;

function preload() {
  dataset = loadTable("pie.csv", "header"); //load the data file as a table
}

//run once when our index.html file is first loaded
function setup() {
  let cnv = createCanvas(900, 650); //width in pixels, height in pixels
  noStroke();
  colorMode(RGB);
  //canvas.parent('canvasForHTML');
  //cnv.position(400, 300, 'fixed');

  //NOTE!! pie charts represent values as a fraction of a total
  //each 'sector' of the chart must be displayed as a proportion of this total
  //we must get this 'total' value first so we know how to scale the size of each sector in our visualisation
  
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
    
    /*multiple by scaling to get current value as a percentage (100), 
    then multiple by 3.6 to get it as a proportion 
    of a circle (100 * 3.6 = 360 degrees)
     */
    let sectorAngle = radians(dataset.getNum(row, 1) * scaling * 3.6);

    //we will use translate and rotate below
    //use push() and pop() to help control position of each arc and text
    push();
    //move to correct position
    translate(x, y);
    //rotate to the current starting angle
   rotate(currentAngle);
    //set colours
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
  background(23, 110, 34);
  fill(255);
  textSize(25)
  text('Covid-19 impacted deaths by age range',20, 50)
  
  piechart(width/2, height/2, 400, 400);
}



