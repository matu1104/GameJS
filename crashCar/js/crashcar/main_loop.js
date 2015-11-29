// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 550, { backgroundColor : 0x33333333 });

// add the renderer view element to the DOM
document.getElementById('game').appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Container();

street = Street(400, 550, 4);
stage.addChild(street.container);

//var rect = new PIXI.Graphics();
//rect.interactive = true;
//rect.hitArea = new PIXI.Rectangle(0,0, 400, 550);
//rect.click = function(ev) { console.log(street.inRails(ev.data.global.x)); }
//stage.addChild(rect);

requestAnimationFrame(animate);

var lastCurrentTime = 0;

function animate(currentTime) {
  dt = 100/6.0;
  street.update(dt);

  // render the stage
  renderer.render(stage);

  requestAnimationFrame(animate);
}
