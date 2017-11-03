import img from '../assets/03/chain-saw-2.svg'

var chainSaw = new Image()
var canvas   = document.getElementById('c')
var ctx      = canvas.getContext('2d');

const chainSawWidth  = 404
const chainSawHeight = 177
const chainSawRadius = 26
const sawLeft     = 230
const sawRight    = 370
const sawTop = 92
const sawBottom = 150

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

// Create range of coordinates for line
function rangeLine(start, end, iteration) {
  var result = [];

  for (var j = start; j <= end; j += iteration) {
    result.push(j)
  }

  return result
}

// Create range of coordinates for circle
function rangeCircle(sawX, sawY, iteration) {
  var result = [];

  for (var j = 0; j <= 360; j += iteration) {
    result.push({
      startX: sawX + chainSawRadius * Math.cos(j), 
      startY: sawY + chainSawRadius * Math.sin(j),
      endX: sawX + (5 + chainSawRadius) * Math.cos(j),
      endY: sawY + (5 + chainSawRadius) * Math.sin(j)
    })
  }

  return result
}

function addTeeths(sawX, sawY, iterationLine, iterationCircle) {
  var teethsTop = rangeLine(sawX + sawLeft, sawX + sawRight, iterationLine).map((x) => {
    return {x: x, y: sawY + sawTop}
  })

  var teethsRight = rangeCircle(sawX + 370, sawY + 124, iterationCircle)

  teethsRight.forEach(drawTeeth)

  // Try to hide teeths intersection
  ctx.fillStyle = "#ed3334"
  ctx.fillRect(sawX + sawLeft, sawY + sawTop, sawX + sawRight - (sawX + sawLeft), sawY + sawTop)

  var teethsBot = rangeLine(sawX + sawLeft, sawX + sawRight, iterationLine).map((x) => {
    return {x: x, y: sawY + sawBottom}
  })  

  teethsTop.concat(teethsBot).forEach(drawTeeth)
}

function drawTeeth(teeth) {
  if (teeth.hasOwnProperty("endX")) {
    ctx.beginPath()
    ctx.moveTo(teeth.startX, teeth.startY)
    ctx.lineWidth = 5
    ctx.strokeStyle = "#000000"
    ctx.lineTo(teeth.endX, teeth.endY)
    ctx.stroke()
  } else {
    ctx.fillStyle = "#000000"
    ctx.fillRect(teeth.x, teeth.y, 5, 5)    
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function draw() {
  let sawX = (canvas.width - chainSawWidth) / 2
  let sawY = (canvas.height - chainSawHeight) / 2

  ctx.fillStyle = "#ed3334"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add teeths
  addTeeths(sawX, sawY, getRandomInt(5, 10), getRandomInt(10, 18))

  // Add ChainSaw
  ctx.drawImage(chainSaw, sawX, sawY, chainSawWidth, chainSawHeight)

  window.requestAnimationFrame(draw)
}

// Load chainSaw then call draw()
chainSaw.src    = img
chainSaw.onload = draw