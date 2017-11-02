import img from '../assets/01/sun-face.svg'

var sunFace = new Image()
var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

function drawSunBeam(ctx, startX, startY, endX, endY) {
  ctx.beginPath()
  ctx.moveTo(startX, startY);
  ctx.lineWidth = 30
  ctx.lineCap = "round"
  ctx.strokeStyle = "#e5c420"
  ctx.lineTo(endX, endY)
  ctx.stroke()
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function draw() {
  ctx.fillStyle = "#37c14f";  
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var imageX = (canvas.width - 500) / 2
  var imageY = (canvas.height - 500) / 2

  ctx.drawImage(sunFace, imageX, imageY, 500, 500)

  // draw sun beams, equation:
  // https://en.wikipedia.org/wiki/Circle#Equations
  // x = cx + r * cos(a)
  // y = cy + r * sin(a)
  // Where r is the radius, cx,cy the origin, and a the angle.
  for (var j = 0; j < 20; j++) {
    var startX, startY, endX, endY, randEnd, centerX, centerY;

    centerX = canvas.width / 2
    centerY = canvas.height / 2

    startX = centerX + 290 * Math.cos(j * 18)
    startY = centerY + 290 * Math.sin(j * 18)

    randEnd = getRandomInt(370, 500)

    endX = centerX + randEnd * Math.cos(j * 18)
    endY = centerY + randEnd * Math.sin(j * 18)

    drawSunBeam(ctx, startX, startY, endX, endY)
  }
}

// Load sunFace then call draw()
sunFace.src    = img
sunFace.onload = () => {
  window.setInterval(draw, 200)
}
