import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6';

var canvas;
var camera, scene, renderer, controls;
var movingParticles = [];

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function randomPick(array){
  return array[Math.floor(Math.random() * array.length)];
}

function randomParticles() {
  var geometry = new THREE.Geometry();

  for ( var i = 0; i < 1000; i ++ ) {
    var x = (Math.random() * 800) - 400;
    var y = (Math.random() * 800) - 400;
    var z = (Math.random() * 800) - 400;

    geometry.vertices.push(new THREE.Vector3(x, y, z));
  }

  var material = new THREE.PointsMaterial({
    size: 5
  });

  var particles = new THREE.Points(geometry, material);

  particles.startH = randomPick([0.80, 0.85, ,0.90, 0.95, 1])

  return particles
}

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 1000)

  scene = new THREE.Scene();

  // Add mouse/wheel control
  controls = new OrbitControls(camera, canvas);
  controls.enabled = true;
  controls.maxDistance = 1500;
  controls.minDistance = 0;
  controls.autoRotate = true

  // Moving particles
  for (var i = 0; i < 10; i ++) {
    movingParticles.push(randomParticles())
  }
  movingParticles.forEach((particles) => scene.add(particles))

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor("#000000")
}

function animate() {
  var time = Date.now() * 0.00005

  movingParticles.forEach((particles, i) => {
    if (i < 3){
      particles.rotation.x = time * i + 1
    }

    particles.rotation.y = time * (i < 2 ? i + 1 : - (i + 1))

    var h = (360 * (particles.startH + time) % 360) / 360;
    particles.material.color.setHSL(h, 1, 0.5)
  })

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init()
fitCanvas();
animate();
