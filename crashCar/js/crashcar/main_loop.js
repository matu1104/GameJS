// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 550, { backgroundColor : 0x33333333, class: 'game' });

// add the renderer view element to the DOM
document.getElementById('game').appendChild(renderer.view);

// create an new instance of a pixi stage
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage("img/bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

requestAnimationFrame(animate);
var lastCurrentTime = 0;
function animate(currentTime) {
  dt = currentTime - lastCurrentTime;
  lastCurrentTime = currentTime

  //console.log(dt, lastCurrentTime);

  bunny.rotation += 0.1;

  // render the stage
  renderer.render(stage);

  requestAnimationFrame(animate);
}
