var carsTextures = []

var carTextures = PIXI.Texture.fromImage("img/cars-steam.png");

for(var i = 0; i < CAR_TEXTURES; i++) {
  var carTexture = new PIXI.Texture(carTextures, new PIXI.Rectangle((i + 1) * CAR_OFFSET,0, WIDTH_CAR, HEIGHT_CAR));
  carsTextures.push(carTexture);
}

var LineCar = function(){
    var container = new PIXI.Container();

    freeSpace = randomWithMax(numberOfStreets);

    var thereIsACar = false;
    var thereIsASpace = false;
    var cars = []

    for(var i = 0; i < numberOfStreets; i++){
      if (throwACoin() == 1) {
        thereIsACar = true;
        cars[i] = true;
      }
      else {
        thereIsASpace = true;
        cars[i] = false;
      }
    }

    if (!thereIsACar) {
      cars[randomWithMax(numberOfStreets)] = true;
    }

    if (!thereIsASpace) {
      cars[randomWithMax(numberOfStreets)] = false;
    }

    for(var i = 0; i < cars.length; i++){
      if (cars[i]) {
        var carTexture = carsTextures[randomWithMax(CAR_TEXTURES)];
        var car = new PIXI.Sprite(carTexture);

        car.anchor.x = 0.5;
        car.anchor.y = 0;

        car.position.x = positionForRail(i);
        car.position.y = - HEIGHT_CAR;

        container.addChild(car);
      }
    }

    var update = function(dt){
      for(var i = 0; i < container.children.length; i++) {
        var car = container.children[i];
        car.position.y = car.position.y + VELOCITY * dt

        if (car.position.y > height) {
          return true;
        }
      }
      return false;
    }

    var colisionDetected = function(rail) {
      var sampleCar = container.children[0];
       return sampleCar.position.y > CAR_Y_POSITION - (3 / 2 * HEIGHT_CAR) + 10 &&
       CAR_Y_POSITION - (HEIGHT_CAR / 2) + 10 > sampleCar.position.y &&
       cars[rail];
    }

    return {
      update: update,
      container: container,
      colisionDetected: colisionDetected
    };
};
