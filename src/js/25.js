import * as THREE from 'three'

import vertexShaderSource from '../shaders/25.vert'
import fragmentShaderSource from '../shaders/25.frag'

var canvas;
var camera, scene, renderer, controls;
var staticStars, blinkingStars;
var ready = false

function fitCanvas(event) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function stars(count) {
  var geometry = new THREE.BufferGeometry()

  var vertices = []
  for ( var i = 0; i < count; i ++ ) {
    vertices.push(THREE.Math.randFloatSpread(2000))
    vertices.push(THREE.Math.randFloatSpread(2000))
    vertices.push(THREE.Math.randFloatSpread(2000))
  }

  geometry.addAttribute( 'position', 
    new THREE.BufferAttribute(
      new Float32Array(vertices), 
      3
    )
  );

  var material = new THREE.ShaderMaterial( {
    uniforms: {
      time: {type: 'f', value: 1.0}
    },
    vertexShader:   vertexShaderSource,
    fragmentShader: fragmentShaderSource
  });

  return new THREE.Points(geometry, material)
}

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  scene    = new THREE.Scene()

  staticStars   = stars(10000)
  blinkingStars = stars(5000)

  scene.add(staticStars)
  scene.add(blinkingStars)

  var bb = new THREE.Box3()
  bb.setFromObject(staticStars);

  var dist = bb.getSize().x / (2 * Math.tan( camera.fov * Math.PI / 360))

  camera.position.set(bb.getCenter().x, bb.getCenter().y, 10 + dist)

  ready = true

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
}

var start = Date.now()

function animate() {
  if (ready){
    blinkingStars.material.uniforms.time.value = Math.abs(
      Math.cos(
        0.0003 * ( Date.now() - start)
      )
    );
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
