var div = document.querySelector('div');

window.onresize = function(){
  var WIDTH  = window.innerWidth;
  var HEIGHT = window.innerHeight;

  div.style.width  = WIDTH+'px';
  div.style.height = HEIGHT/10+'px'
  
}
