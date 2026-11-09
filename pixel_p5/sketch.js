function setup() {

  createCanvas(windowWidth, windowHeight);
  background(220);

  angleMode(DEGREES);
  frameRate(fRate);
  fill(0);
  convertRatio = width / 400;

}

let fRate = 30;
let curLines = [[], []];
let sparkles = [[], []];
let convertRatio = 0;


function draw(){
  drawSparkle(0, 0)
  // drawSparkle(160, 1)
}

function drawSparkle(clr, ind) {
  
  if (frameCount % (fRate * 30) === 0) {
    // reset every 30s
    background(220)
    curLines[ind] = [];
    sparkles[ind] = [];
  }

  if ((frameCount % fRate) / 2 === 0) {
    // draw a new line every other second, except for the first one 
    if (frameCount % (fRate * 30) !== 0)
      drawLines(ind);
  }


  stroke(0);
  for (const l of curLines[ind]) {
    myLine(l.slope, l.yIntercept, l.startFrame);
  }

  fill(0);
  for (const s of sparkles[ind]) {
    sparkle(s.x, s.y, s.slope1, s.slope2, s.w, s.h, s.startFrame, clr);
  }


  // sparkle(200, 200, 2, -4, 20, 20, 0)
}

