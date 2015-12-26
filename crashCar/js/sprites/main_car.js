var MainCar = function(){
  var carTextures = PIXI.Texture.fromImage("img/cars-steam.png");
  var mainCarTexture = new PIXI.Texture(carTextures, new PIXI.Rectangle(0,0, WIDTH_CAR, HEIGHT_CAR));
  var mainCar = new PIXI.Sprite(mainCarTexture);

	setMiddleAnchor(mainCar)

  mainCar.rotation = 3.14159;

  mainCar.position.x = 0;
  mainCar.position.y = CAR_Y_POSITION;

  var setPosition = function(x, y) {
    mainCar.position.x = typeof x !== 'undefined' ? x : mainCar.position.x;
    mainCar.position.y = typeof y !== 'undefined' ? y : mainCar.position.y;
  };

  var hide = function() {
    mainCar.visible = false;
  }

  return {
    sprite: mainCar,
    setPosition: setPosition,
    hide: hide
  };
}
