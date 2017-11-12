import * as THREE from 'three'
import * as GSAP  from 'gsap'

var canvas;
var camera, scene, renderer;
var group;
var tween;
var tweenable = {
  radius: 5
}

function fitCanvas( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function dotsCoordinates(radius, separation){
  var coordinates = []

  for ( var s = 0; s <= 180; s+= separation ) {
    // 0 <= s <= 180, and -1 <= Math.cos(radianS) <= 1
    // and -radius <= z <= radius
    var radianS = s * Math.PI / 180;
    var pZ = radius * Math.cos(radianS);

    // Draw a point along the circle
    for ( var t = 0; t < 360; t+= separation ) {
      var radianT = t * Math.PI / 180;
      // sin(radianS) Changes in the order of 0 → 1 → 0
      // radius * sin(radianS) Becomes 0 → 200 → 0
      var pX = radius * Math.sin(radianS) * Math.cos(radianT);
      var pY = radius * Math.sin(radianS) * Math.sin(radianT);

      coordinates.push({x: pX, y: pY, z: pZ})
    }
  }

  return coordinates
}

function createDot(coordinates){
  var geometory = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial({
    color: "#424242"
  });
  var mesh = new THREE.Mesh(geometory, material);
  mesh.position.x = coordinates.x;
  mesh.position.y = coordinates.y;
  mesh.position.z = coordinates.z;

  return mesh
}

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0, 0, 250)

  scene = new THREE.Scene();

  group = new THREE.Group();

  dotsCoordinates(5, 10).map(createDot).map((mesh) => {
    group.add(mesh)
  })

  scene.add(group)

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor("#f2f2f2")

  tween = GSAP.TweenMax.to(tweenable, 5, {radius: 200, yoyo: true, repeat: -1, ease: Bounce.easeOut})
}

function animate() {
  group.rotation.x += 0.002
  group.rotation.y += 0.005
  group.rotation.z += 0.01

  dotsCoordinates(tweenable.radius, 10).forEach((coordinates, index) => {
    group.children[index].position.x = coordinates.x
    group.children[index].position.y = coordinates.y
    group.children[index].position.z = coordinates.z
  })

  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
}

init();
fitCanvas();
animate();
