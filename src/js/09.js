import * as PIXI from 'pixi.js'
import Howler    from 'howler'
import GSAP      from 'gsap'

// Assets
import clownSprite from '../assets/09/clown.png'
import clownSound  from '../assets/09/clown-horn.mp3'
import kinifedFont from '../assets/09/kinifed.woff'

var canvas    = document.getElementById('c')
var game      = new PIXI.Application({ backgroundColor: 0x000000, view: canvas });
var mainTitle = createHiddenContainer()
var gameBoard = createHiddenContainer()

// Add containers to the main stage
game.stage.addChild(mainTitle)
game.stage.addChild(gameBoard)

function createHiddenContainer(){
  var container     = new PIXI.Container()
  container.visible = false

  return container
}

// Load assets
PIXI.loaders.shared
  .add('clown-sprite', clownSprite)
  .add('clown-horn', clownSound)
  .add('kinifed-font', kinifedFont)

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

function fitCanvas() {
  game.renderer.resize(window.innerWidth, window.innerHeight)
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

var clown, sound, title, score, success;
var scoreValue    = 0;
var scoreTrigger  = [5, 20, 50, 100];
var successValues = {
  '5': 'Keep Clicking',
  '20': 'So much Fun',
  '50': 'Moreeeeee Click',
  '100': 'You are so Good at it'
}

function setup(){
  // Load clown sprite with:
  // * interactivity
  // * hand cursor
  // * click detection
  clown = PIXI.Sprite.fromImage('clown-sprite');
  clown.scale.x = 0.5
  clown.scale.y = 0.5
  clown.anchor.set(0.5);
  clown.interactive = true;
  clown.buttonMode = true;

  sound = new Howl({src: [clownSound]})

  title = new PIXI.Text('Click the Clown', {
    fontFamily: 'Kinifed',
    fontSize: 120,
    fill: 0xff1010,
    align: 'center'
  })

  title.anchor.set(0.5)
  title.x = game.renderer.width / 2;
  title.y = game.renderer.height / 2;
}

function renderIntro(){
  clown.x = game.renderer.width / 2;
  clown.y = game.renderer.height / 2 + 120;

  clown.tween = GSAP.TweenMax.to(clown.scale, .5, {x: 0.6, y: 0.6, yoyo: true, repeat: -1})

  // Pointers normalize touch and mouse
  clown.once('pointerdown', startGame);

  // Make container visible and add elements
  mainTitle.visible = true
  mainTitle.addChild(title)
  mainTitle.addChild(clown)
}

function startGame() {
  sound.play()
  GSAP.TweenLite.to(mainTitle, .5, {alpha: 0, onComplete: renderGame})
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomClown(){
  clown.x = getRandomInt(clown.width, game.renderer.width - clown.width)
  clown.y  = getRandomInt(clown.height, game.renderer.height - clown.height)
}

function clickClown(){
  sound.play()
  randomClown()
  updateScore()
}

function renderGame(){
  randomClown()

  score = new PIXI.Text('0', {
    fontFamily: 'Kinifed',
    fontSize: 40,
    fill: 0xff1010,
    align: 'right'
  })

  success = new PIXI.Text('-', {
    fontFamily: 'Kinifed',
    fontSize: 40,
    fill: 0xff1010,
    align: 'center'
  })
  success.alpha = 0
  success.anchor.set(0.5)
  success.y = game.renderer.height - success.height - 10
  success.x = game.renderer.width / 2

  game.renderer.width - (game.renderer.width - score.width)

  score.x = game.renderer.width - 20 - score.width;
  score.y = score.height;

  clown.on('pointerdown', clickClown)

  gameBoard.visible = true
  gameBoard.addChild(clown)
  gameBoard.addChild(score)
  gameBoard.addChild(success)
}

function showTrigger(){
  if (scoreTrigger.includes(scoreValue)){
    success.text = successValues[`${scoreValue}`]
    
    GSAP.TweenMax.to(success, 1, {alpha: 1, repeat: 1, yoyo: true, repeatDelay: 1})
  }
}

function updateScore(){
  scoreValue += 1

  showTrigger()

  score.text = `${scoreValue}`
  score.x    = game.renderer.width - 20 - score.width;
  score.y    = score.height;
}

window.updateScore = updateScore

PIXI.loaders.shared.load(() => {
  setup()
  renderIntro()
});