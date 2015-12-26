var Street = function() {
  var BLOCK_SIZE = 45;
  var EXTRA_BLOCKS = 3;

  var container = new PIXI.Container();

  var numberOfBlocksInView = height / (2 * BLOCK_SIZE);
  var numberOfBlocks = numberOfBlocksInView + EXTRA_BLOCKS;

  for (var i = 1; i <= numberOfBlocks; i++) {
    for(var j = 0; j < (numberOfStreets - 1); j++) {
      var streetTexture = PIXI.Texture.fromImage("img/white.jpg");
      var streetLine = new PIXI.Sprite(streetTexture);

      streetLine.position.x = widthOfStreet * (j + 1) - widthOfSeparation;
      streetLine.position.y = - 2 * (i - 1) * BLOCK_SIZE;

      streetLine.width = widthOfSeparation;

      container.addChild(streetLine);
    }
  }

  var update = function(dt) {
    for(var i = 0; i < container.children.length; i++) {
      var streetLine = container.children[i];
      streetLine.position.y = streetLine.position.y + VELOCITY * dt;

      if (streetLine.position.y > height) {
        streetLine.position.y = height - 2 * numberOfBlocks * BLOCK_SIZE;
      }
    }
  };

  return {
    update: update,
    container: container
  };
};
