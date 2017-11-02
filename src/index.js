import img from './sun-face.svg'

var sunFace = new Image()
sunFace.src = img

function drawSunBeam(ctx, startX, startY, endX, endY) {
  ctx.beginPath()
  ctx.moveTo(startX, startY);
  ctx.lineWidth = 10.0
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
  var ctx = document.getElementById('c').getContext('2d');
  ctx.fillStyle = "#37c14f";  
  ctx.fillRect(0, 0, 400, 400);

  ctx.drawImage(sunFace, 150, 150, 100, 100)

  // draw sun beams
  for (var j = 0; j < 20; j++) {
    var startX, startY, endX, endY;

    startX = 200 + 60 * Math.cos(j * 18)
    startY = 200 + 60 * Math.sin(j * 18)

    var randEnd = getRandomInt(80, 100)

    endX = 200 + randEnd * Math.cos(j * 18)
    endY = 200 + randEnd * Math.sin(j * 18)

    drawSunBeam(ctx, startX, startY, endX, endY)
  }
}

window.setInterval(draw, 200)
