const s_side = 500; // The screen size.
const s_unit = 50; // Size of 1 unit.
const s_middle = s_side/2; 


function setup() {
  createCanvas(s_side, s_side);
}


function draw() {
  background(255);
  CartesianPlane();
  drawFunction(x => -x, color(0, 170, 0));
  drawFunction(multiplyFunctions(x => x**2, x => x*2), color(0, 170, 0));
  drawFunction( x => x**2*((mouseX-s_middle)/s_unit));
}


const multiplyFunctions = function(f, g) {
  return x => f(x) * g(x);
}


const CartesianPlane = function(){
  stroke(170);
  strokeWeight(1.5);
  
  // Sets up the cartesian plane coordinates.
  translate(s_middle, s_middle);
  scale(1, -1);
  
  // Draws the grid.
  for (let y = s_unit; y < s_middle; y+= s_unit) {
    line(-s_middle, y, s_middle, y);
    line(-s_middle, -y, s_middle, -y);
  }
  for (let x = s_unit; x < s_middle; x+= s_unit) {
    line(x, -s_middle, x, s_middle);
    line(-x, -s_middle, -x, s_middle);
  }
  
  stroke(0);
  
  
  strokeWeight(5);
  line(-s_middle, 0, s_middle, 0); // X axis line
  line(0, -s_middle, 0, s_middle); // Y axis line
}


const drawFunction = function(f, c = color(150, 0, 0), spacing = 0.1){
  // Start from the middle, draw until you hit the upper edge of the screen.
  
  stroke(c);
  noFill();

  // positive side.
  beginShape();
  for (let x = 0; x < s_middle; x += spacing) {
    let y = f(x)*s_unit;
    if (y < -s_middle-s_unit || y > s_middle+s_unit) { break;}
    vertex(x*s_unit, y);
  }
  endShape();
  
  // negative side.
  beginShape();
  for (let x = 0; x > -s_middle; x -= spacing) {
    let y = f(x)*s_unit;
    if (y < -s_middle-s_unit || y > s_middle+s_unit) { break;}
    vertex(x*s_unit, y);
  }
  endShape();
}