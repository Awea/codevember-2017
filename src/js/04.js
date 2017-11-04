var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');

var pageY, pageX;
var prevRotation = 3.12;
var prevColorStop = 0.5;

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}

fitCanvas()

window.addEventListener('resize', fitCanvas);
window.addEventListener('mousemove', (e) => {
  pageY = e.pageY
  pageX = e.pageX
})

function draw() {
  // Clear canvas 
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (pageY != undefined){
    var colorStop = pageY / canvas.height

    prevColorStop = colorStop < 0.9 ? colorStop : prevColorStop
  }

  var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);

  grd.addColorStop(prevColorStop, "#e5c420")
  grd.addColorStop(1, "#37c14f")

  var originX  = canvas.width / 2
  var rotation = Math.atan2(pageX - originX, - pageY)

  ctx.save()
  rotation = isNaN(rotation) ? 0 : rotation

  // Limit rotation triggering
  if (Math.abs(rotation) >= 2.9){
    prevRotation = rotation
  }

  // Rotate canvas arround it's center
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(prevRotation)
  ctx.translate(-canvas.width / 2, -canvas.height / 2)

  ctx.fillStyle = grd;  

  var maxViewPort = Math.max(canvas.width, canvas.height)

  ctx.fillRect(-maxViewPort / 2, -maxViewPort / 2, maxViewPort * 2 , maxViewPort * 2);
  ctx.restore()

  window.requestAnimationFrame(draw)
}

draw()