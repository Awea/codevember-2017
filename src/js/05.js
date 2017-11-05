var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');

var pageY, pageX, mouseInterval;
var interval = 50;
var mouseHold = 1;

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
}

fitCanvas()

window.addEventListener('resize', fitCanvas);
window.addEventListener('mousemove', (e) => {
  pageX = e.pageX
  pageY = e.pageY
})
window.addEventListener('mousedown', () => {
  window.clearInterval(mouseInterval)
  mouseInterval = window.setInterval(() => mouseHold += 0.1, interval)
})
window.addEventListener('mouseup', () => {
  window.clearInterval(mouseInterval)
  mouseInterval = window.setInterval(() => {
    if (mouseHold > 1){
      mouseHold -= 0.1
    }
  }, interval)
})

function draw() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (pageX != undefined){
    var grd=ctx.createRadialGradient(pageX, pageY, 1, pageX, pageY, 75 * mouseHold);
    grd.addColorStop(Math.abs(Math.sin(mouseHold)).toFixed(2), "#FF5500");

    grd.addColorStop(0, "#ffff00");
    grd.addColorStop(1, "#000000");

    // Fill with gradient
    ctx.beginPath()
    ctx.arc(pageX, pageY, 100 * mouseHold, 0, 2 * Math.PI);

    ctx.fillStyle = grd;
    ctx.fill();
  }

  window.requestAnimationFrame(draw)
}

draw()