// inspiration: https://threejs.org/examples/#webgl_modifier_tessellation
import * as THREE from 'three'

import TessellateModifier from './three_modifiers/tessellate_modifier'

import fontSrc from '../assets/22/Fira_Code_Regular.json'
import vertexShaderSource from '../shaders/22.vert'
import fragmentShaderSource from '../shaders/22.frag'

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

  scene = new THREE.Scene()

  var loader = new THREE.FontLoader();

  loader.load(fontSrc, (font) => {

    geometry = new THREE.TextGeometry('Pas envie.', {
      font: font,
      size: 80,
      height: 10
    });

    var tessellateModifier = new TessellateModifier( 8 );
    for ( var i = 0; i < 6; i ++ ) {
      tessellateModifier.modify( geometry );
    }

    var numFaces = geometry.faces.length;
    geometry = new THREE.BufferGeometry().fromGeometry( geometry );
    var colors = new Float32Array( numFaces * 3 * 3 );
    var displacement = new Float32Array( numFaces * 3 * 3 );
    var color = new THREE.Color();

    for ( var f = 0; f < numFaces; f ++ ) {
      var index = 9 * f;
      var h = 0.2 * Math.random();
      var s = 0.5 + 0.5 * Math.random();
      var l = 0.5 + 0.5 * Math.random();
      color.setHSL( h, s, l );
      var d = 10 * ( 0.5 - Math.random() );
      for ( var i = 0; i < 3; i ++ ) {
        colors[ index + ( 3 * i )     ] = color.r;
        colors[ index + ( 3 * i ) + 1 ] = color.g;
        colors[ index + ( 3 * i ) + 2 ] = color.b;
        displacement[ index + ( 3 * i )     ] = d;
        displacement[ index + ( 3 * i ) + 1 ] = d;
        displacement[ index + ( 3 * i ) + 2 ] = d;
      }
    }

    geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

    uniforms = {
      amplitude: { value: 0.0 }
    };

    var material = new THREE.ShaderMaterial( {
      uniforms:       uniforms,
      vertexShader:   vertexShaderSource,
      fragmentShader: fragmentShaderSource
    });

    // Create mesh
    mesh = new THREE.Mesh(geometry, material)

    // Bounding box
    var bb = new THREE.Box3()
    bb.setFromObject(mesh);

    var dist = bb.size().x / (2 * Math.tan( camera.fov * Math.PI / 360))

    camera.position.set(bb.getCenter().x, bb.getCenter().y, 10 + dist)

    scene.add(mesh)

    ready = true
  });

  var light = new THREE.AmbientLight

  scene.add(light);

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
}

function animate() {
  if (ready){
    var time = Date.now() * 0.001;
    uniforms.amplitude.value = 1.0 + Math.sin( time * 0.5 );
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
