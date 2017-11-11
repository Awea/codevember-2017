import * as THREE    from 'three'
import * as GSAP     from 'gsap'
import OrbitControls from 'orbit-controls-es6';

var canvas;
var camera, scene, renderer, controls;
var mesh, geometry, vectors;

// Colors
var yellow = new THREE.Color("#f5b200")
var blue   = new THREE.Color("#000099")
var red    = new THREE.Color("#e10915")
var green  = new THREE.Color("#339900")

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function addN(startZ, rotationY) {
  // Create a N
  geometry = new THREE.Geometry()

  var nHeight = 13
  var nMid    = nHeight / 2
  var endZ    = startZ + 5
  // var null  = new THREE.Vector3(0, 0, 0)

  vectors = [
    [0, 0, startZ],    // 0
    [5, 0, startZ],   // 1
    [5, nMid, startZ],   // 2
    [10, 0, startZ],   // 3
    [15, 0, startZ],   // 4
    [15, nHeight, startZ],  // 5
    [10, nHeight, startZ],  // 6
    [10, nMid, startZ],   // 7
    [5, nHeight, startZ],  // 8
    [0, nHeight, startZ],    // 9

    [0, 0, endZ],    // 10
    [5, 0, endZ],   // 11
    [5, nMid, endZ],   // 12
    [10, 0, endZ],   // 13
    [15, 0, endZ],   // 14
    [15, nHeight, endZ],  // 15
    [10, nHeight, endZ],  // 16
    [10, nMid, endZ],   // 17
    [5, nHeight, endZ],  // 18
    [0, nHeight, endZ],    // 19

    [15, nMid, startZ], // 20
    [10, 0, startZ - 5], // 21
    [15, 0, startZ - 5], // 22
    [10, nMid, startZ - 5], // 23
    [15, nMid, startZ - 5] // 24
  ].map((vector) => new THREE.Vector3(vector[0], vector[1], vector[2]))

  Array.prototype.push.apply(geometry.vertices, vectors)

  // Back green
  geometry.faces.push(new THREE.Face3( 0, 1, 8, null, green));
  geometry.faces.push(new THREE.Face3( 0, 8, 9, null, green));
  geometry.faces.push(new THREE.Face3( 2, 7, 8, null, green));
  geometry.faces.push(new THREE.Face3( 2, 3, 7, null, green));
  geometry.faces.push(new THREE.Face3( 3, 4, 5, null, green));
  geometry.faces.push(new THREE.Face3( 3, 5, 6, null, green));

  // Left Side yellow
  geometry.faces.push(new THREE.Face3( 9, 8, 18, null, yellow));
  geometry.faces.push(new THREE.Face3( 19, 18, 9, null, yellow));
  geometry.faces.push(new THREE.Face3( 0, 1, 11, null, yellow));
  geometry.faces.push(new THREE.Face3( 11, 10, 0, null, yellow));

  // Left Side left
  geometry.faces.push(new THREE.Face3( 9, 0, 10, null, blue));
  geometry.faces.push(new THREE.Face3( 10, 19, 9, null, blue));
  geometry.faces.push(new THREE.Face3( 8, 1, 11, null, blue));
  geometry.faces.push(new THREE.Face3( 11, 18, 8, null, blue));

  // Front green
  geometry.faces.push(new THREE.Face3( 10, 11, 18, null, green));
  geometry.faces.push(new THREE.Face3( 10, 18, 19, null, green));
  geometry.faces.push(new THREE.Face3( 12, 17, 18, null, green));
  geometry.faces.push(new THREE.Face3( 12, 13, 17, null, green));
  geometry.faces.push(new THREE.Face3( 13, 14, 15, null, green));
  geometry.faces.push(new THREE.Face3( 13, 15, 16, null, green));

  // Right Side yellow
  geometry.faces.push(new THREE.Face3( 6, 5, 15, null, yellow));
  geometry.faces.push(new THREE.Face3( 16, 15, 6, null, yellow));
  geometry.faces.push(new THREE.Face3( 3, 4, 14, null, yellow));
  geometry.faces.push(new THREE.Face3( 14, 13, 3, null, yellow));

  // Right Side blue
  geometry.faces.push(new THREE.Face3( 6, 3, 13, null, blue));
  geometry.faces.push(new THREE.Face3( 13, 16, 6, null, blue));
  geometry.faces.push(new THREE.Face3( 5, 4, 14, null, blue));
  geometry.faces.push(new THREE.Face3( 14, 15, 5, null, blue));

  // Red
  geometry.faces.push(new THREE.Face3( 8, 7, 17, null, red));
  geometry.faces.push(new THREE.Face3( 17, 18, 8, null, red));
  geometry.faces.push(new THREE.Face3( 2, 3, 13, null, red));
  geometry.faces.push(new THREE.Face3( 13, 12, 2, null, red));

  // Blue depth
  geometry.faces.push(new THREE.Face3( 5, 20, 24, null, blue));
  geometry.faces.push(new THREE.Face3( 20, 24, 22, null, blue));
  geometry.faces.push(new THREE.Face3( 6, 7, 23, null, blue));
  geometry.faces.push(new THREE.Face3( 23, 21, 7, null, blue));

  // Green/Red depth
  geometry.faces.push(new THREE.Face3( 6, 5, 24, null, green));
  geometry.faces.push(new THREE.Face3( 6, 23, 24, null, green));
  geometry.faces.push(new THREE.Face3( 7, 20, 21, null, red));
  geometry.faces.push(new THREE.Face3( 20, 21, 22, null, red));

  geometry.computeFaceNormals();

  var material = new THREE.MeshLambertMaterial({vertexColors: THREE.FaceColors})
  material.side = THREE.DoubleSide

  mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = -6.5
  mesh.position.y = -6.5
  mesh.position.z = -12

  if (rotationY != 0){
    mesh.position.x += 15
    mesh.position.z += 10
    mesh.rotation.y = rotationY * Math.PI / 180

    scene.add(mesh)
  } else {
    scene.add(mesh);
  }
}

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera            =  new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 50
  camera.position.x = 6.5
  camera.position.y = 6.5

  // Add mouse/wheel control
  controls = new OrbitControls(camera, canvas);
  controls.enabled = true;
  controls.maxDistance = 1500;
  controls.minDistance = 0;
  controls.autoRotate = true

  scene = new THREE.Scene();

  addN(0, 180)
  addN(15, 0)

  // Set a light
  var light = new THREE.AmbientLight("#FFFFFF");
  // light.position.set(10, 0, 25);
  scene.add(light);

  // var axesHelper = new THREE.AxesHelper( 100 );
  // scene.add( axesHelper );

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
