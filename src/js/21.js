import * as THREE from 'three'
import json from '../assets/21/thing.json'
import OrbitControls from 'orbit-controls-es6';

var canvas;
var camera, scene, renderer, controls;
var mesh, action = {}, mixer;

var clock = new THREE.Clock();
var ready = false

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5)

  scene = new THREE.Scene()

  // Add mouse/wheel control
  controls = new OrbitControls(camera, canvas);
  controls.enabled = true;
  controls.maxDistance = 1500;
  controls.minDistance = 0;
  controls.autoRotate = true

  var loader = new THREE.ObjectLoader();

  loader.load(json, function(obj) {   
    obj.rotation.set(-5, 0, 0)

    var mesh = obj.children[0]
    mixer = new THREE.AnimationMixer(mesh)

    window.mixer = mixer

    action.boring = mixer.clipAction(THREE.AnimationClip.findByName(mesh.geometry.animations, 'lazy'))
    action.boring.enabled = true

    action.boring.play()

    scene.add(obj);

    ready = true
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
  if (ready){
    var delta = clock.getDelta();
    mixer.update(delta);
  }

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init()
fitCanvas();
animate();
