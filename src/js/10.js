import * as THREE    from 'three'
import * as GSAP     from 'gsap'
import OrbitControls from 'orbit-controls-es6';

var canvas;
var camera, scene, renderer, controls;
var cube, geometry;

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera            =  new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 100

  // Add mouse/wheel control
  controls = new OrbitControls(camera, canvas);
  controls.enabled = true;
  controls.maxDistance = 1500;
  controls.minDistance = 0;

  scene = new THREE.Scene();

  // Create a cube
  geometry = new THREE.BoxGeometry(40, 40, 40);

  var material = new THREE.MeshNormalMaterial();

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Set a light
  var light = new THREE.PointLight("#FFFF00");
  light.position.set(10, 0, 25);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setPixelRatio( window.devicePixelRatio );
}

function tween() {
  for (var i = 0, l = geometry.vertices.length; i<l; i++) {
    GSAP.TweenMax.to(cube.geometry.vertices[i], 2, {
      x: cube.geometry.vertices[i].x + -10 + Math.random()*20, 
      y: cube.geometry.vertices[i].y + -10 + Math.random()*20, 
      yoyo: true, repeat: 1, onComplete: tween
    }, 0)
  }
}

function animate() {
  // From Three.js documentation: The following flags control updating of various geometry attributes. 
  // Set flags only for attributes that you need to update, updates are costly. 
  // Once buffers change, these flags reset automatically back to false. You need to keep setting them to true if you want to keep updating buffers
  geometry.verticesNeedUpdate = true

  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
}

init();
tween()
fitCanvas();
animate();
