var MainCar = function(){
  var carTextures = PIXI.Texture.fromImage("img/cars-steam.png");
  var mainCarTexture = new PIXI.Texture(carTextures, new PIXI.Rectangle(0,0, WIDTH_CAR, HEIGHT_CAR));
  var mainCar = new PIXI.Sprite(mainCarTexture);

  // center the sprites anchor point
	mainCar.anchor.x = 0.5;
	mainCar.anchor.y = 0.5;

  mainCar.rotation = 3.14159;

  mainCar.position.x = 0;
  mainCar.position.y = height - HEIGHT_CAR / 2.0 - 20;

  var setPosition = function(x, y) {
    mainCar.position.x = typeof x !== 'undefined' ? x : mainCar.position.x;
    mainCar.position.y = typeof y !== 'undefined' ? y : mainCar.position.y;
  };

  return {
    sprite: mainCar,
    setPosition: setPosition
  };
}
