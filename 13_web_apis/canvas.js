var canvas = document.querySelector(".myCanvas");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

//draw rectangle
// ctx.fillStyle = 'rgb(255,0,0)';
// ctx.fillRect(50,50,100,150);
//
// ctx.fillStyle = 'rgba(0,255,0,0.25)';
// ctx.fillRect(75,75,100,100);
//
// ctx.strokeStyle = 'rgb(255,255,255)'
// ctx.lineWidth = 5;
// ctx.strokeRect(25,25,175,200);

//draw path
// ctx.linewidth = 10;
// ctx.fillStyle = 'rgb(255,255,255)';
// ctx.beginPath();
// ctx.moveTo(500,500);
// ctx.fill();

function degToRad(degrees){
  return degrees * Math.PI/180;
}

ctx.fillStyle = 'rgb(255,0,0)';
ctx.beginPath();
ctx.moveTo(50,50);

ctx.lineTo(150,50);
var triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100,50+triHeight);
ctx.lineTo(50,50);
ctx.fill();

ctx.fillStyle = 'rgb(0,0,255)';
ctx.beginPath();
ctx.arc(150,106,50,degToRad(0),degToRad(360),false);
ctx.fill();

ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.arc(200,106,50,degToRad(-45),degToRad(45),true);
ctx.lineTo(200,106);
ctx.fill();

//text
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.font = '36px arial';
ctx.strokeText('Canvas text',50,50);

ctx.fillStyle = 'red';
ctx.font = '48px georgia';
ctx.fillText('Canvas text',50,150);

//image
var image = new Image();
image.src = 'firefox.png';

image.onload = function(){
  ctx.drawImage(image,200,200);
}
