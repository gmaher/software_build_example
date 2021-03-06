
var scene = new THREE.Scene();

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
var AR = WIDTH/HEIGHT;

var camera = new THREE.PerspectiveCamera(75,AR,0.1,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH,HEIGHT);
document.body.appendChild(renderer.domElement);

//cube
var cube;

var loader = new THREE.TextureLoader();

loader.load('firefox.png',function(texture){
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2,2);

  var geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
  var material = new THREE.MeshLambertMaterial({
    map: texture, shading: THREE.FlatShading
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  draw();
})

var light = new THREE.AmbientLight('rgb(255,255,255)');
scene.add(light);

var spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set(100,1000,1000);
spotLight.castShadow = true;
scene.add(spotLight);

function draw(){
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene,camera);
  requestAnimationFrame(draw);
}
