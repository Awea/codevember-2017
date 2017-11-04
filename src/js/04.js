var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');

var pageY, pageX;
var prevRotation = 0;

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

  var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grd.addColorStop(0, "#37c14f");
  grd.addColorStop(1, "#e5c420");

  if (pageY != undefined){
    grd.addColorStop(pageY / canvas.height, "#e5c420")
  }

  var originX  = canvas.width / 2
  var originY  = canvas.height / 2
  var rotation = Math.atan2(pageX - originX, - (pageY - originY) )

  ctx.save()
  rotation = isNaN(rotation) ? 0 : rotation

  if (pageY >= originY){
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