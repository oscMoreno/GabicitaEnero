let hearts = [];
let particles = [];
let pulse = 0;
const colors = ["#ff1493", "#ff69b4", "#ff0000", "#800080", "#4b0082", "#ff007f"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 70; i++) {
    hearts.push(new FloatingHeart());
  }
}

function draw() {
  background(10, 10, 20);

  for (let h of hearts) {
    h.update();
    h.display();
  }

  if (mouseIsPressed || (mouseX !== 0 && mouseY !== 0)) {
    particles.push(new Particle(mouseX, mouseY));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].finished()) particles.splice(i, 1);
  }

  let baseSize = Math.min(width, height) / 6;
  push();
  translate(width / 2, height / 2);
  let pulseSize = baseSize + sin(pulse) * (baseSize / 15);
  pulse += 0.05;

  fill("#ff1493");
  stroke(255, 150);
  strokeWeight(3);
  drawHeartShape(0, 0, pulseSize);
  pop();

  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(width < 500 ? 35 : Math.max(35, width / 26));
  textFont('Georgia');
  text("Te amo Gaby", width / 2, height / 2 + baseSize + 20);
}

class FloatingHeart {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 15);
    this.color = color(random(colors));
    this.color.setAlpha(100);
    this.speed = random(0.5, 1.5);
  }
  update() {
    this.y -= this.speed;
    if (this.y < -20) this.y = height + 20;
  }
  display() {
    fill(this.color);
    noStroke();
    drawHeartShape(this.x, this.y, this.size);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
  }
  finished() { return this.alpha < 0; }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }
  display() {
    noStroke();
    fill(255, 100, 150, this.alpha);
    drawHeartShape(this.x, this.y, 8);
  }
}

function drawHeartShape(x, y, size) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let dx = size * 16 * pow(sin(a), 3) / 10;
    let dy = -size * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)) / 10;
    vertex(x + dx, y + dy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }