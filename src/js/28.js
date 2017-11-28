// inspiration: https://codepen.io/derossi_s/pen/KVKLKQ

import * as THREE from 'three'

var canvas;
var camera, scene, renderer;
var boxes, bb;
var pageX = window.innerWidth / 2, pageY = window.innerHeight / 2;
var ready = false

function fitCanvas(event) {
  renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', fitCanvas, false );

function mouseMove(event) {
  pageY = event.pageY
  pageX = event.pageX
}

window.addEventListener('mousemove', mouseMove, false)

function init() {
  canvas = document.getElementById('c');

  // Set Camera
  camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.set(0, 0, 5)

  scene = new THREE.Scene()

  boxes = new THREE.Group()

  for (var i = 0; i < 20; i++){
    var geometry = new THREE.BoxGeometry(1 + i * 1, 1  + i * 1, 1);
    var material = new THREE.MeshBasicMaterial( {color: `hsl(0, 80%, ${50 - i * 2}%)`} );
    var cube     = new THREE.Mesh( geometry, material );

    cube.position.set(0, 0, - i * 1)

    boxes.add(cube)
  }

  scene.add(boxes)

  bb = new THREE.Box3()
  bb.setFromObject(boxes);

  var dist = bb.getSize().x / (2 * Math.tan( camera.fov * Math.PI / 360))

  camera.position.set(bb.getCenter().x, bb.getCenter().y, 10 + dist)

  ready = true

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
}

function animate() {
  if (ready){
    // Get mose position in a 3D space 
    // https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
    var vector  = new THREE.Vector3()

    vector.set(
      ( pageX / window.innerWidth ) * 2 - 1,
      - ( pageY / window.innerHeight ) * 2 + 1,
    0.5 );

    vector.unproject(camera)
    var dir = vector.sub( camera.position ).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

    boxes.children.forEach((box, i) => {      
      box.rotation.z += (i + 1) * 0.005

      box.position.x += (pos.x - box.position.x) / ((boxes.children.length * 4) / ((boxes.children.length - i) * 0.5))
      box.position.y += (pos.y - box.position.y) / ((boxes.children.length * 2) / ((boxes.children.length - i) * 0.5))
    })
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
