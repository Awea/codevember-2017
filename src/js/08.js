// inspiration: Dreamcast startup

import * as GSAP from 'gsap'

// Assets
import startupSoundSrc from '../assets/08/dreamcast.mp3'

var audio   = new Audio(startupSoundSrc)
var canvas  = document.getElementById('c')
var ctx     = canvas.getContext('2d');
var tl      = new GSAP.TimelineLite({paused: true})

var fontSize    = 100
var wordWidth   = 430
var letterWidth = wordWidth / 8
var startY, startX, currentX;

var tweenables;

function addTl() {
  tl.clear()

  var ballTl = new GSAP.TimelineLite()

  tweenables = {
    ballY: 30,
    ballX: -30,
    ballAlpha: 1,
    spiral: 0
  }

  startY  = (canvas.height - fontSize) / 1.5
  startX  = (canvas.width  - wordWidth) / 2
  currentX = startX

  ballTl.addLabel("D-Down", "+=1")
  ballTl.to(tweenables, 1, {ballY: startY}, "D-Down")
  ballTl.to(tweenables, 1, {ballX: currentX, ease: Power3.easeOut}, "D-Down")

  // Bouncing ball
  for (var i=0; i < 8; i++) {
    ballTl.to(tweenables, .35, {
      bezier: {
        curviness: 2,
        values: [{
          ballX: currentX,
          ballY: startY
        }, {
          ballX: currentX + letterWidth / 2,
          ballY: startY - 40
        }, {
          ballX: currentX + letterWidth,
          ballY: startY - 40
        }, {
          ballX: currentX  + letterWidth,
          ballY: startY
        }],
        autoRotate: true
      },
      ease: Power1.easeInOut
    })

    currentX += letterWidth
  }

  // Ball to spiral center 
  ballTl.to(tweenables, 1, {
    bezier: {
      curviness: 2,
      values: [{
        ballX: currentX,
        ballY: startY
      }, {
        ballX: currentX - 30, 
        ballY: canvas.height / 2 - fontSize - 60
      }, {
        ballX: canvas.width / 2,
        ballY: canvas.height / 2 - fontSize + 12
      }],
      autoRotate: true
    },
    ease: Power1.easeInOut
  })

  // Spiral
  ballTl.to(tweenables, 2, {spiral: 190, ballAlpha: 0})

  // Add balTl to tl
  tl.add(ballTl)
}

function fitCanvas() {
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  
  audio.pause()
  audio.currentTime = 0
  audio.play()

  addTl()
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

function draw(){
  // Background
  ctx.fillStyle = "#ffffff";  
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ball
  var ballRadius = 25
  var grd    = ctx.createRadialGradient(tweenables.ballX, tweenables.ballY, ballRadius / 2, tweenables.ballX, tweenables.ballY, ballRadius);

  grd.addColorStop(0, "#4c87cf");
  grd.addColorStop(1, "#ffffff");

  ctx.save()
  ctx.globalAlpha = tweenables.ballAlpha
  ctx.beginPath()
  ctx.arc(tweenables.ballX, tweenables.ballY, ballRadius, 0, 2 * Math.PI)
  ctx.fillStyle = grd
  ctx.fill()
  ctx.restore()

  ctx.strokeStyle = '#4c87cf'
  ctx.lineCap = "round"
  ctx.lineWidth = ballRadius

  // Archimedean spiral ~= 190°
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2 - fontSize)
  ctx.beginPath()
  for (var i=17; i < tweenables.spiral; i++) {
    // scalar = optional innerDistance + (loop spacing * angle)
    var angle = 0.1 * i;
    var scalar = 10 * angle
    var x = (1 + scalar)  * Math.cos(angle);
    var y = (1 + scalar) * Math.sin(angle);

    tweenables.ballX = x + canvas.width / 2 
    tweenables.ballY = y + canvas.height /2 - fontSize

    ctx.lineTo(x, y);
  }
  ctx.stroke()
  ctx.restore()

  window.requestAnimationFrame(draw)
}
 
draw()

audio.addEventListener('play', () => {
  tl.restart()
})