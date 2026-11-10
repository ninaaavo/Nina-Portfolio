let w = 46; // number of columns
let h = 41; // number of rows
let squareW = 10;
let circleW = 9;
let darkBlue = "#1d1f53";
let lightBlue = "#5487c9";
let redd = "#bb1b1b";
let yellow = "#d1c000";
let colorArr = [darkBlue, lightBlue, redd, yellow];
let dots = [];
let intruder = [];
let canvasWidth = 0
let canvasHeight = 0
let margin = 0
let randomPartValue
let multiplyRatio = 1 // allow scaling the sketch to any size

function changeIntruder() {
  // change place that the intruder spawn
  let rStart = multiplyRatio * 100
  let rEnd = multiplyRatio * 260
  intruder = [random(rStart, rEnd), random(rStart, rEnd)];
}

function setup() {
  // createCanvas(580, 530);
  canvasWidth = windowWidth
  canvasHeight = canvasWidth / 580 * 530
  createCanvas(canvasWidth, canvasHeight)
  multiplyRatio = canvasWidth / 580
  squareW = multiplyRatio * 10
  circleW = multiplyRatio * 9
  margin = multiplyRatio * 60
  randomPartValue = multiplyRatio * 10

  background(220);

  // Populate the dots array

  for (let i = 0; i < 4; i++) {
    curColor = colorArr[i];
    drawColorHori(i * 4 + 1, i * 4 + 1, w - i * 8 - 2, curColor);
    drawColorHori(i * 4 + 1, h - (i + 1) * 4, w - i * 8 - 2, curColor);
    drawColorVerti(i * 4 + 1, i * 4 + 1, h - i * 8 - 2, curColor);
    drawColorVerti(w - (i + 1) * 4, i * 4 + 1, h - i * 8 - 2, curColor);
  }
  changeIntruder();
}

function getPosSquare(xp) {
  // given row/column number xp, return the pixel position to draw the square
  return squareW * xp + margin ;
}

function getPosCircle(xp) {
  // given row/column number xp, return the pixel position to draw the circle
  return squareW * xp + margin + squareW / 2;
}

function drawColorHori(startX, startY, wid, clr) {
  for (a = startX; a < startX + wid; a++) {
    for (b = startY; b < startY + 3; b++) {
      if ((a + b) % 2 == 0) continue;
      pushDot(getPosCircle(a), getPosCircle(b), clr);
    }
  }
}

function drawColorVerti(startX, startY, hei, clr) {
  for (a = startY; a < startY + hei; a++) {
    for (b = startX; b < startX + 3; b++) {
      if ((a + b) % 2 == 0) continue;
      pushDot(getPosCircle(b), getPosCircle(a), clr);
    }
  }
}

function pushDot(px, py, clr) {
  dots.push({
    homeX: px,
    homeY: py,
    x: px,
    y: py,
    clr: clr,
    randomPart: 0,
  });
}

function fillText(xp) {
  fill(50);
  textAlign(CENTER, CENTER);
  textSize(multiplyRatio * 7);
  strokeWeight(0)

  // left to right
  for (let a = 0; a < w - xp * 2 - 1; a++) {
    text(a + 1, getPosCircle(a + xp), getPosCircle(xp));
  }

  // up to down
  for (let a = 0; a < h - xp * 2 - 1; a++) {
    text(a + 1, getPosCircle(w - xp - 1), getPosCircle(a + xp));
  }

  // right to left
  for (let a = 0; a < w - xp * 2 - 1; a++) {
    text(a + 1, getPosCircle(w - a - xp - 1), getPosCircle(h - xp - 1));
  }

  // down to up
  for (let a = 0; a < h - xp * 2 - 1; a++) {
    text(a + 1, getPosCircle(xp), getPosCircle(h - a - xp - 1));
  }
}

function drawIntruder(){
  // draw the current intruder
  let pulsating = 3 * sin(frameCount * 0.08)
  fill("#f1ffbd66");
  circle(intruder[0], intruder[1], multiplyRatio * (pulsating + 127));
  fill("#7eff75");
  circle(intruder[0], intruder[1], multiplyRatio * (pulsating + 27));
  fill("#fe58e0");
  circle(intruder[0], intruder[1], multiplyRatio * (pulsating + 17));
  fill("#ffc96b");
  circle(intruder[0], intruder[1], multiplyRatio * (pulsating + 12));
  fill("#ffffff");
  circle(intruder[0], intruder[1], multiplyRatio * (pulsating + 7));
}

function draw() {
  strokeWeight(multiplyRatio * 0.6);
  stroke(100)
  
  // Make the empty square grid
  for (x = 0; x < w; x++) {
    for (y = 0; y < h; y++) {
      noFill();
      square(getPosSquare(x), getPosSquare(y), squareW);
    }
  }

  stroke(multiplyRatio * 100);

  // Fill the grid with Number
  for (let i = 0; i < 5 * 4; i += 4) {
    fillText(i);
  }

  strokeWeight(0);
  // draw current intruder
  drawIntruder()
  

  // Move the intruder when the mouse hovers over it
  if (dist(mouseX, mouseY, intruder[0], intruder[1]) < 15) {
    fill(220);
    circle(intruder[0], intruder[1], multiplyRatio * 130);

    changeIntruder();
  }

  // render the dots
  for (d of dots) {
    fill(d.clr);
    hX = d.homeX;
    hY = d.homeY;
    targetX = d.homeX;
    targetY = d.homeY;
    distFromIntruder = dist(hX, hY, intruder[0], intruder[1]);

    // if the dot is close to the intruder, move it
    
    if (distFromIntruder < multiplyRatio * 70) {
      // Reason behind this formula: 
      // if hX > intruder[0] meaning x is to the right of intruder, then * 1 => move more right, similar reason for * -1
      // divided by dist: the closer the distance, ie., distance small => move more
      targetX += (multiplyRatio * 20  * (hX > intruder[0] ? 1 : -1)) / (distFromIntruder * 0.01);
      targetY += (multiplyRatio * 20 * (hY > intruder[1] ? 1 : -1)) / (distFromIntruder * 0.01);
      fill("#5efb09ee");
      d.randomPart = randomPartValue;
    } else {
      // if distance is far enough from intruder, move the target position back to home
      targetX = d.homeX;
      targetY = d.homeY;
      d.randomPart = 0;
    }

    // transition from current position to target position
    d.x = lerp(d.x, targetX + random(d.randomPart), 0.2);
    d.y = lerp(d.y, targetY + random(d.randomPart), 0.2);

    circle(d.x, d.y, circleW);
  }
  cursor('pin2.png');
}
