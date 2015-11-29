// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor : 0x33333333 });

// add the renderer view element to the DOM
document.getElementById('game').appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Container();


street = Street();
stage.addChild(street.container);

var currentRail = 2

mainCar = MainCar();
mainCar.setPosition(positionForRail(currentRail));
stage.addChild(mainCar.sprite)

var rect = new PIXI.Graphics();
rect.interactive = true;
rect.hitArea = new PIXI.Rectangle(0,0, width, height);
var clickOrTap = function(ev) {
  var numberOfRail = inRails(ev.data.global.x);

  if (numberOfRail < currentRail) {
    currentRail = currentRail - 1;
  }
  else if (numberOfRail > currentRail) {
    currentRail = currentRail + 1;
  }

  mainCar.setPosition(positionForRail(currentRail));
};

rect.click = clickOrTap;
rect.tap = clickOrTap;

stage.addChild(rect);

requestAnimationFrame(animate);

var lastCurrentTime = 0;
var lastCurrentTime = 0;
var timeOnGame = 0;
var carLines = [];

function animate(currentTime) {
  dt =  100/6.0 // or currentTime - lastCurrentTime;
  lastCurrentTime = currentTime;
  timeOnGame = timeOnGame + dt;

  if (timeOnGame > 1500) {
    var lineCar = LineCar();
    carLines.push(lineCar);
    stage.addChild(lineCar.container);
    timeOnGame = 0;
  }

  var deleteFirst = false;
  for(var i in carLines) {
    deleteFirst = deleteFirst || carLines[i].update(dt);
  }

  if (deleteFirst) {
    stage.removeChild(carLines.shift().container);
  }

  street.update(dt);

  // render the stage
  renderer.render(stage);

  requestAnimationFrame(animate);
}
