var Street = function() {
  var BLOCK_SIZE = 45;
  var EXTRA_BLOCKS = 3;

  var container = new PIXI.Container();

  var numberOfBlocksInView = height / (2 * BLOCK_SIZE);
  var numberOfBlocks = numberOfBlocksInView + EXTRA_BLOCKS;

  for (var i = 1; i <= numberOfBlocks; i++) {
    for(var j = 0; j < (numberOfStreets - 1); j++) {
      var streetTexture = PIXI.Texture.fromImage("img/crashcar/white.jpg");
      var streetLine = new PIXI.Sprite(streetTexture);

      streetLine.position.x = widthOfStreet * (j + 1) - widthOfSeparation;
      streetLine.position.y = - 2 * (i - 1) * BLOCK_SIZE;

      streetLine.width = widthOfSeparation;

      container.addChild(streetLine);
    }
  }

  var update = function(dt) {
    var VELOCITY = 0.05
    for(var i = 0; i < container.children.length; i++) {
      var streetLine = container.children[i];
      streetLine.position.y = streetLine.position.y + VELOCITY * dt

      if (streetLine.position.y > height) {
        streetLine.position.y = height - 2 * numberOfBlocks * BLOCK_SIZE;
      }
    }
  }

  var isInRails = function(number, xPosition) {
    return (number * widthOfStreet < xPosition) && (xPosition < (number + 1) * widthOfStreet);
  }

  var inRails = function(xPosition) {
    for(var i = 0; i < numberOfStreets; i++) {
      if (isInRails(i, xPosition)) {
        return i;
      }
    }
  }

  var positionForRail = function(number){
    var maxWidth = ((number + 1) * widthOfStreet) - widthOfSeparation;
    var minWidth = number * widthOfStreet;
    return (maxWidth + minWidth) / 2.0;
  }

  return {
    update: update,
    container: container,
    inRails: inRails,
    positionForRail: positionForRail
  };
}
