var width = 400;
var height = 550;
var numberOfStreets = 5;
var widthOfStreet = width * 1.0 / numberOfStreets;
var widthOfSeparation = widthOfStreet / 10.0;

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
mainCar.setPosition(street.positionForRail(currentRail));
stage.addChild(mainCar.sprite)

var rect = new PIXI.Graphics();
rect.interactive = true;
rect.hitArea = new PIXI.Rectangle(0,0, width, height);
rect.click = function(ev) {
   var numberOfRail = street.inRails(ev.data.global.x);
   if (numberOfRail < currentRail) {
     currentRail = currentRail - 1;
   }
   else if (numberOfRail > currentRail) {
     currentRail = currentRail + 1;
   }
   console.log('currentRail', currentRail);
   console.log('numberOfRail', numberOfRail);
   mainCar.setPosition(street.positionForRail(currentRail));
}

stage.addChild(rect);

requestAnimationFrame(animate);

var lastCurrentTime = 0;

function animate(currentTime) {
  dt = 100/6.0;
  street.update(dt);

  // render the stage
  renderer.render(stage);

  requestAnimationFrame(animate);
}
