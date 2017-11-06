import * as THREE from 'three'

var vertexShaderSource   = require('../shaders/06.vert')
var fragmentShaderSource = require('../shaders/06.frag')

var canvas;
var camera, scene, renderer;
var uniforms;

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );
window.addEventListener('mousemove', (e) => {
  uniforms.u_mouse.value.x = e.pageX
  uniforms.u_mouse.value.y = e.pageY

  var rect = canvas.getBoundingClientRect();
  if (e.pageX >= rect.left && e.pageX <= rect.right &&
    e.pageY >= rect.top && e.pageY <= rect.bottom) {

    uniforms.u_mouse.value.x = e.pageX - rect.left
    uniforms.u_mouse.value.y = canvas.height - e.pageY - rect.top
  }
})

function init() {
  canvas = document.getElementById('c');

  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.CircleBufferGeometry(5, 3);

  uniforms = {
    u_mouse:{type: "v2", value: new THREE.Vector2()}
  };

  var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource
  } );

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setPixelRatio( window.devicePixelRatio );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
}

init();
fitCanvas();
animate();
