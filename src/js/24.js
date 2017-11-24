import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6';

import vertexShaderSource from '../shaders/24.vert'
import fragmentShaderSource from '../shaders/24.frag'

var canvas;
var camera, scene, renderer, controls;
var geometry, material, mesh, uniforms;
var ready = false

function fitCanvas(event) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Add mouse/wheel control
  controls = new OrbitControls(camera, canvas);
  controls.enabled = true;
  controls.maxDistance = 30;
  controls.minDistance = 0;
  controls.autoRotate = true

  scene = new THREE.Scene()

  uniforms = {
    pitch: {type: 'vec2', value: [50, 50]},
    time: {type: 'f', value: 0.0}
  };
  // geometry = new THREE.PlaneGeometry(25, 25 );
  geometry = new THREE.BoxGeometry(10, 10, 10 );
  material = new THREE.ShaderMaterial( {
    uniforms:       uniforms,
    vertexShader:   vertexShaderSource,
    fragmentShader: fragmentShaderSource
  });
  mesh = new THREE.Mesh(geometry, material)

  mesh.rotation.set(-25 * Math.PI / 180, 0, 0)

  scene.add(mesh)

  var bb = new THREE.Box3()
  bb.setFromObject(mesh);

  var dist = bb.getSize().x / (2 * Math.tan( camera.fov * Math.PI / 360))

  camera.position.set(bb.getCenter().x, bb.getCenter().y, 10 + dist)

  controls.update()

  ready = true

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
}

var start = Date.now()

function animate() {
  if (ready){
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
  }

  var time = Date.now() * 0.00005

  uniforms.time.value = 0.00025 * ( Date.now() - start );

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init()
fitCanvas();
animate();
