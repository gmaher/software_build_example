//create a canvas
var canvas = document.createElement('canvas')
var width  = canvas.width  = window.innerWidth;
var height = canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var ctx    = canvas.getContext('2d')

function random(min,max){
  var num = Math.floor(Math.random()*(max-min))+min;
  return num;
}

function Ball() {
  this.x = random(0,width);
  this.y = random(0,height);
  this.velx = random(-7,7);
  this.vely = random(-7,7);
  this.color = 'rgb('+random(0,255) + ',' + random(0,255) +','+random(0,255) +')';
  this.size = random(10,20);
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill()
}

var balls = [];

while(balls.length < 10){
  var ball = new Ball()
  ball.draw();
  balls.push(ball);
}
