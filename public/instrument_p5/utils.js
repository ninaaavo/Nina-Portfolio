function functionDrawDebugGrid(s) {
  stroke(10);
  strokeWeight(2);
  noFill();

  // Draw vertical and horizontal grid lines + coordinate labels
  print("width"+ width)
  for (let x = 0; x < 1920 ; x += s) {
    for (let y = 0; y < 1080; y += s) {
      rect(x, y, s, s);
      
      // Optional: tiny coordinate text for debugging
      fill(20);
      noStroke();
      textSize(9);
      text(`${x},${y}`, x + 3, y + 12);
      noFill();
      stroke(10);
    }
  }
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function motionSmoothing(){
  return 1 - Math.exp(-deltaTime / 150);
}

function drawBezierPoints(points) {
  // take a list of points and draw a Bezier shape from it

  beginShape();
  for (let i = 0; i < points.length; i++) {
    [x, y] = points[i];

    bezierVertex(x, y);
  }
  endShape();
  
}

function drawRect(arr) {
  beginShape();

  for (const point of arr) {
    vertex(...point);
  }

  endShape(CLOSE);
}

function drawCircle(arr){
  circle(arr[0], arr[1], arr[2])
}