const options = {
  lat: 0, 
  lng: 0, 
  zoom: 3, 
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" 
};

const mappa = new Mappa("Leaflet");
let myMap;
let canvas;

let dataset;
let minMag;
let maxMag;

function preload() {
  dataset = loadTable("data graph.csv", "header");
}

function setup() {
  canvas = createCanvas(1280, 720);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  noStroke();
  minMag = min(dataset.getColumn("Magnitude"));
  maxMag = max(dataset.getColumn("Magnitude"));
}

function draw() {
  clear();

  let hoverRow = -1;
  let hoverPos;
  let hoverMag;
  let hoverMagSize;
  let hoverMagColor;
  let hoverDate;

  for (let row = 0; row < dataset.getRowCount(); row++) {
    let datetime = dataset.getString(row, 0);
    let date = split(datetime, " ")[0];
    let lat = dataset.getNum(row, 1);
    let lng = dataset.getNum(row, 2);
    let mag = dataset.getNum(row, 4);

    let pos = myMap.latLngToPixel(lat, lng);

    let magColor = map(mag, minMag, maxMag, 0, 255);
    let magSize = map(mag, minMag, maxMag, 5, 20);

    stroke(magColor, 0, 255 - magColor, 200);
    fill(magColor, 0, 255 - magColor, 55);

    let distance = dist(mouseX, mouseY, pos.x, pos.y);
  

    if (distance < magSize) {
      hoverRow = row;
      fill(magColor, 0, 255 - magColor);
      hoverPos = pos;
      hoverMag = mag;
      hoverMagColor = magColor;
      hoverMagSize = magSize;
      hoverDate = date;
    }

    ellipse(pos.x, pos.y, magSize, magSize);
  }

  if (hoverRow > -1) {
    textAlign(CENTER);
    noStroke();
    fill(hoverMagColor, 0, 255-hoverMagColor);
    text(hoverDate + ", " + hoverMag, hoverPos.x, hoverPos.y - hoverMagSize);
  }

  fill(0);
  noStroke();
  textAlign(RIGHT);
  textSize(25);
  text("Major Earthquakes since 1970", width - 20, 40);
  textSize(12);
  text(
    "Visualising " +
      dataset.getRowCount() +
      " earthquakes between " +
      minMag +
      " and " +
      maxMag +
      " on the Richter Scale",
    width - 20,
    60
  );
}

