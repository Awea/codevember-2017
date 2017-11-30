import * as PIXI from 'pixi.js'
import * as GSAP from 'gsap'

const RED = 0xef000e
const MSG = 'codevember 2017 c\'était bien mais un peu dur par moment'

var canvas = document.getElementById('c')
var app    = new PIXI.Application({ backgroundColor: RED, view: canvas });

var letters = []
var lettersPadding = 100;
var letterBounds = getBounds()
function getBounds() {
  return new PIXI.Rectangle(-lettersPadding,
                                    -lettersPadding,
                                    app.renderer.width + lettersPadding * 2,
                                    app.renderer.height + lettersPadding * 2);
}

function fitCanvas() {
  app.renderer.resize(window.innerWidth, window.innerHeight)

  letterBounds = getBounds()
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

function pickLetter(index){
  let splittedLetters = MSG.split("") 

  if (index > splittedLetters.length - 1){
    startLetter = 0

    return splittedLetters[0]
  }

  return splittedLetters[index]
}

var startLetter = 0

for (var i = 0; i < MSG.length * 5; i ++){
  let pickedLetter = pickLetter(startLetter)
  let letter       = new PIXI.Text(pickedLetter)

  startLetter += 1

  letter.anchor.set(0.5)

  let angle = 0.2 * i;
  let scalar = 120 + 10 * angle
  letter.x = app.renderer.width / 2 +  (1 + scalar)  * Math.cos(angle);
  letter.y = app.renderer.height / 2 + (1 + scalar) * Math.sin(angle);
  letter.alpha = 0

  letters.push(letter)

  app.stage.addChild(letter)
}

GSAP.TweenMax.staggerTo(letters, .15, {alpha: 1, style: {fill: "#ffaa00"}, repeat: -1, yoyo: true}, .05)
