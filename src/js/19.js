// inspiration: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6';

var vertexShaderSource = require('../shaders/19.vert')
var fragmentShaderSource = require('../shaders/19.frag')

import texture from '../assets/19/pal.png'

var canvas;
var camera, scene, renderer, controls;
var uniforms, start = Date.now();

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false )

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function addSpheres(geometry, material){
  var group = new THREE.Group

  for (var j = 0; j < 360; j+= 10) {
    var mesh = new THREE.Mesh(geometry, material);
    var r    = getRandomInt(5, 20)

    mesh.position.set(r * Math.cos(j), r * Math.sin(j), 0)

    group.add(mesh);
  }

  return(group)
}

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 30)

  scene = new THREE.Scene();

  uniforms = {
    time: {type: 'f', value: 0.0},
    texture: {type: 't', value: new THREE.TextureLoader().load(texture)}
  }

  var geometry = new THREE.SphereGeometry(1, 10, 10);

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource
  });

  for (var i = 0; i < 10; i ++) {
    scene.add(addSpheres(geometry, material))
  }

  console.log(scene.children)

  // Add mouse/wheel control
  controls = new OrbitControls(camera, canvas);
  controls.enabled = true;
  controls.maxDistance = 1500;
  controls.minDistance = 0;
  controls.autoRotate = true

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio( window.devicePixelRatio )
}

function animate() {
  var time = Date.now() * 0.00005

  scene.children.forEach((group, i) => {
    if (i < 3){
      group.rotation.x = time * i + 1
    }

    group.rotation.z = time * i + 1
    group.rotation.y = time * (i < 2 ? i + 1 : - (i + 1))
  })

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
