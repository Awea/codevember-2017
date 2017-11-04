// inspiration: https://copiercreer.wearemd.com/en/2017/09/10/ce-poster-est-un-faux

import img from '../assets/02/20170910-ce-poster-est-un-faux-2880x3840.jpg'

var posterFaux = new Image()
var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function draw() {
  var posterWidth = canvas.height * 0.75
  var imageX      = (canvas.width - posterWidth) / 2

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(posterFaux, imageX, 0, posterWidth, canvas.height)

  for (var v=0; v <= canvas.height; v += 1){
    for (var h=imageX; h < posterWidth + imageX; h += 1){
      if (getRandomInt(0, 200) >= 190){
        ctx.fillRect(h, v, 1, 1);
      }
    }
  }

  window.requestAnimationFrame(draw)
}

// Load sunFace then call draw()
posterFaux.src    = img
// posterFaux.onload = () => {
//   requestAnimationFrame(draw)
// }

// window.setInterval(draw, 5)
draw()
// window.requestAnimationFrame(draw)
