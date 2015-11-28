var Street = function(width, height, numberOfStreets) {
  var container = PIXI.Cointainer();

  var widthOfStreet = function() {
    return width * 1.0 / numberOfStreets;
  }

  var widthOfSeparation = function() {
    return widthOfStreet / 5.0;
  }
}
