import * as PIXI from 'pixi.js'

var canvas = document.getElementById('c')
var app    = new PIXI.Application({ backgroundColor: 0xef000e, view: canvas });

function fitCanvas() {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}

fitCanvas()

window.addEventListener('resize', fitCanvas);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var baseVelocity = .5
var disturbance = 0.03

function createBall(){
  // Initialize the pixi Graphics class
  var graphics = new PIXI.Graphics();

  // Set the fill color
  graphics.beginFill("#000000"); // Red

  // Draw a circle
  graphics.drawCircle(0, 0, getRandomInt(5, 10)); // drawCircle(x, y, radius)

  // Applies fill to lines and shapes since the last call to beginFill.
  graphics.endFill();

  // Set graphics position
  graphics.position.set(getRandomInt(0, window.innerWidth), getRandomInt(0, window.innerHeight))

  // Add velocity
  graphics.velocity = {}
  graphics.velocity.x = .5
  graphics.velocity.y = .5

  return graphics
}

// Create balls
var balls = Array.from(new Array(200).keys()).map(createBall)

// Add balls to stage
balls.forEach((ball) => app.stage.addChild(ball))

function floatLoop() {
  balls.forEach((ball) => {
    if (ball.position.x > app.renderer.width || ball.position.x < 0) {
      ball.velocity.x *= -1;
    }
    if (ball.position.y > app.renderer.height || ball.position.y < 0) {
      ball.velocity.y *= -1;
    }
    ball.position.x += Math.sin(ball.rotation) * ball.velocity.x;
    ball.position.y -= Math.cos(ball.rotation) * ball.velocity.y;

    if (Math.random() < disturbance) {
      ball.rotation += 1;
    }
  })
};

app.ticker.add(floatLoop);
