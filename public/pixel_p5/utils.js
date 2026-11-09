function findIntersection(slope1, intercept1, slope2, intercept2) {
  // Parallel or identical lines have no unique crossing.
  if (slope1 === slope2) return { x: -10, y: -10 };

  const x = (intercept2 - intercept1) / (slope1 - slope2);
  const y = slope1 * x + intercept1;

  return { x, y };
}

function insideSketch(x, y) {
  return 0 <= x && x <= width && 0 <= y && y <= height;
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function sparkle(x, y, slope1, slope2, w, h, startFrame, clr) {
  fill(clr)
  push();
  noStroke();
  translate(x, y);

  // const h = random(10, 40);
  // const w = random(10, 40);

  //easing progress
  progress = constrain((frameCount - startFrame) / 30, 0, 1);
  eased = easeOutQuad(progress);
  // console.log("progress", progress);
  curW = lerp(0, w, eased);
  curH = lerp(0, h, eased);
  inner = 0.2;
  // const inner = lerp(0, 0.2, progress);
  const tips = [
    { x: curH, y: curH * slope1 },
    { x: -curH, y: -curH * slope1 },
    { x: curW, y: curW * slope2 },
    { x: -curW, y: -curW * slope2 },
  ];

  // Order the tips around the center so edges don't cross.
  tips.sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));

  beginShape();
  bezierVertex(tips[0].x, tips[0].y);

  for (let i = 0; i < tips.length; i++) {
    const a = tips[i];
    const b = tips[(i + 1) % tips.length];

    bezierVertex(a.x * inner, a.y * inner);
    bezierVertex(b.x * inner, b.y * inner);
    bezierVertex(b.x, b.y);
  }

  endShape(CLOSE);
  pop();
}

function myLine(slope, yIntercept, startFrame) {
  strokeWeight(0.5 * convertRatio);

  const progress = constrain((frameCount - startFrame) / 30, 0, 1);
  const eased = easeOutQuad(progress);

  const x = width * eased;
  const y = yIntercept + slope * x;

  line(0, yIntercept, x, y);
}

function drawLines(ind, clr) {
  stroke(clr)
  newLine = {
    slope: random(-2, 2),
    yIntercept: randomGaussian(height/2, height/2),
    startFrame: frameCount,
  };

  for (i in curLines[ind]) {
    // check if it cross each other on screen
    // if it does, draw a sparkle
    l = curLines[ind][i];
    intersect = findIntersection(
      l.slope,
      l.yIntercept,
      newLine.slope,
      newLine.yIntercept
    );

    let xInter = intersect.x;
    let yInter = intersect.y;

    if (insideSketch(xInter, yInter)) {
      sparkles[ind].push({
        x: xInter,
        y: yInter,
        slope1: l.slope,
        slope2: newLine.slope,
        w: random(10 * convertRatio, 35 * convertRatio),
        h: random(10 * convertRatio, 35 * convertRatio),
        startFrame: frameCount,
      });
    }
  }

  curLines[ind].push(newLine);
}

function pixel(x, y, val){
  strokeWeight(1)
  h = 20 * convertRatio
  space = val
  maxH = 20 * convertRatio
  if (space > maxH){
    return
  } 
  line(x, y - space, x, max(y - h - space, y - maxH))
  line(x, y + space, x, min(y + h + space, y + maxH))
  line(x - space, y, max(x - h - space, x - maxH), y)
  line(x + space, y, min(x + h + space, x + maxH), y)
}