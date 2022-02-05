const s_side = 1000; // The screen size.
const s_unit = 100; // Size of 1 unit.
const s_middle = s_side/2; 


function setup() {
  createCanvas(s_side, s_side);
}


function draw() {
  background(255);
  CartesianPlane();
  drawFunction( x => x**2*((mouseX-s_middle)/s_unit));
  //drawFunction(multiplyFunctions(x => x**2, x => x*2), color(0, 170, 0));
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
  
  
  // Start from the middle, draw until you hit the upper edge of the screen.
  strokeWeight(5);
  line(-s_middle, 0, s_middle, 0); // X axis line
  line(0, -s_middle, 0, s_middle); // Y axis line
}


const drawFunction = function(f, f_color = color(150, 0, 0)){
  
  stroke(f_color);
  
  // Distance between each point along the X axis.
  const point_distance = 0.01; //0.5/s_unit;
  
  for (let x = 0; x < s_middle; x += point_distance) {
    let py = f(x)*s_unit;
    let ny = f(-x)*s_unit;
    
    let sx = x*s_unit;
    
    if (py < -s_middle || py > s_middle) { break;}
    
    point(sx, py);
    point(-sx, ny);
  }
}