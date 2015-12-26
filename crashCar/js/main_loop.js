// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor : 0x33333333 });

// add the renderer view element to the DOM
document.getElementById('game').appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Container();

var PLAYING_STATE = 0;
var GAMEOVER_STATE = 1;
var gameState = PLAYING_STATE;

street = Street();
stage.addChild(street.container);

var currentRail = 2;

mainCar = MainCar();
mainCar.setPosition(positionForRail(currentRail));
stage.addChild(mainCar.sprite);

var rect = new PIXI.Graphics();
rect.interactive = true;
rect.hitArea = new PIXI.Rectangle(0,0, width, height);
var clickOrTap = function(ev) {
  if (gameState == PLAYING_STATE) {
    var numberOfRail = inRails(ev.data.global.x);

    if (numberOfRail < currentRail) {
      currentRail = currentRail - 1;
    }
    else if (numberOfRail > currentRail) {
      currentRail = currentRail + 1;
    }

    mainCar.setPosition(positionForRail(currentRail));
  }
};

rect.click = clickOrTap;
rect.tap = clickOrTap;

stage.addChild(rect);

requestAnimationFrame(animate);

var lastCurrentTime = 0;
var lastCurrentTime = 0;
var timeOnGame = 0;
var carLines = [];

var carLinesContainer = new PIXI.Container();
stage.addChild(carLinesContainer);

var score = Score('Score', 0);
stage.addChild(score.container);

var onMenu = function() { window.location.replace('../'); };
var onRetry = function() { window.location.reload(); };
var gameOver = GameOver(onMenu, onRetry);
stage.addChild(gameOver.container);

function animate(currentTime) {
  dt =  100/6.0; // or currentTime - lastCurrentTime;
  lastCurrentTime = currentTime;
  timeOnGame = timeOnGame + dt;

  if (timeOnGame > 1500) {
    var lineCar = LineCar();
    carLines.push(lineCar);
    carLinesContainer.addChild(lineCar.container);
    timeOnGame = 0;
  }

  var deleteFirst = false;
  for(var i in carLines) {
    deleteFirst = deleteFirst || carLines[i].update(dt);
  }

  if (carLines[0] && carLines[0].colisionDetected(currentRail)) {
    gameState = GAMEOVER_STATE;
    mainCar.hide();
    gameOver.show();
  }

  if (deleteFirst) {
    carLinesContainer.removeChild(carLines.shift().container);
    if (gameState == PLAYING_STATE) {
      score.increment(1);
    }
  }

  street.update(dt);

  renderer.render(stage);

  requestAnimationFrame(animate);
}
