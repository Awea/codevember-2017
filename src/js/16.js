import * as THREE from 'three'
import json from '../assets/16/cube.json'

var canvas;
var camera, scene, renderer, controls;
var mesh;

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 10)

  scene = new THREE.Scene()

  var loader = new THREE.JSONLoader();

  loader.load(json, function(geometry, materials) {
    mesh = new THREE.Mesh(geometry, materials);
    
    scene.add(mesh);
  });

  var light = new THREE.AmbientLight

  scene.add(light);

  var lights = [];
  lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
  lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

  lights[0].position.set(0, 200, 0)
  lights[1].position.set(100, 200, 100)
  lights[2].position.set(-100, -200, -100)

  scene.add(lights[0])
  scene.add(lights[1])
  scene.add(lights[2])

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
}

function animate() {
  requestAnimationFrame(animate);
  render();

  mesh.rotation.x += 0.005
  mesh.rotation.y += 0.005
}

function render() {
  renderer.render(scene, camera);
}

init()
fitCanvas();
animate();
