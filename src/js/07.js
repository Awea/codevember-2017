// inspiration: PlayStation 1 Startup

import * as GSAP from 'gsap'

// Assets
import startupSoundSrc from '../assets/07/playstation.mp3'

var audio   = new Audio(startupSoundSrc)
var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');
var tl      = new GSAP.TimelineLite({paused: true, delay: 0.3})

var tweenables = {
  coverAlpha: 1,
  sonyAlpha: 1,
  midRatio: 0,
  margin: 0,
  offset: 0
}

tl.to(tweenables, 1, {coverAlpha: 0})
tl.to(tweenables, 1.75, {margin: 0.10, midRatio: 0.5, offset: 0.06})
tl.to(tweenables, 1.5, {coverAlpha: 1}, 16)

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight

  audio.pause()
  audio.currentTime = 0
  audio.play()
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

function draw(){
  // Background
  ctx.fillStyle = "white";  
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sony logo
  ctx.save()
  // Logo coordinates
  var logoStop   = Math.max(canvas.width, canvas.height) / 3
  var xLogoStart = logoStop
  var yLogoStart = (canvas.height - logoStop) / 2
  var xLogoEnd   = xLogoStart + logoStop
  var yLogoEnd   = (canvas.height - logoStop) / 2 + logoStop

  // Logo gradient
  var grd = ctx.createLinearGradient(xLogoStart, yLogoStart, xLogoEnd, yLogoEnd);
  grd.addColorStop(0, "#f94b0f");
  grd.addColorStop(.5, "#eeb013");
  grd.addColorStop(1, "#f94b0f");

  // Rotate canvas from center
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((-45 * Math.PI / 180))
  ctx.translate(-canvas.width / 2, -canvas.height / 2)

  ctx.fillStyle = grd
  ctx.fillRect(xLogoStart, yLogoStart, logoStop, logoStop)

  // First moving part
  var xMidLogoStart = xLogoStart * (1 + tweenables.midRatio)
  var yMidLogoStart = yLogoStart + yLogoStart * tweenables.margin + tweenables.offset * logoStop
  var xMidLogoEnd   = xLogoEnd - logoStop * tweenables.margin 
  var yMidLogoEnd   = yMidLogoStart + (xMidLogoEnd - xMidLogoStart)

  grd = ctx.createLinearGradient(xMidLogoStart, yMidLogoStart, xMidLogoEnd, yMidLogoEnd)
  grd.addColorStop(0, "#f94b0f");
  grd.addColorStop(.5, "#eeb013");
  ctx.fillStyle = grd

  ctx.beginPath()
  ctx.moveTo(xMidLogoStart, yMidLogoStart)
  ctx.lineTo(xMidLogoEnd, yMidLogoStart)
  ctx.lineTo(xMidLogoStart, yMidLogoEnd)
  ctx.fill()

  // Second moving part
  xMidLogoStart = xLogoStart + logoStop * tweenables.margin
  xMidLogoEnd   = xLogoEnd - logoStop * tweenables.midRatio 
  yMidLogoEnd   = yLogoEnd - yLogoStart * tweenables.margin - tweenables.offset * logoStop
  yMidLogoStart = yMidLogoEnd - (xMidLogoEnd - xMidLogoStart)

  grd = ctx.createLinearGradient(xMidLogoEnd, yMidLogoEnd, xMidLogoStart, yMidLogoStart)
  grd.addColorStop(0, "#f94b0f");
  grd.addColorStop(.5, "#eeb013");
  ctx.fillStyle = grd

  ctx.beginPath()
  ctx.moveTo(xMidLogoStart, yMidLogoEnd)
  ctx.lineTo(xMidLogoEnd, yMidLogoEnd)
  ctx.lineTo(xMidLogoEnd, yMidLogoStart)
  ctx.fill()

  ctx.restore()  

  // Cover
  ctx.save()
  ctx.globalAlpha = tweenables.coverAlpha
  ctx.fillStyle = "black";  
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore()

  window.requestAnimationFrame(draw)
}
 
draw()

audio.addEventListener('play', () => {
  tl.restart()
})
