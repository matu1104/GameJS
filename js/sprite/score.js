
var Score = function(name, score) {
  var container = new PIXI.Container();
  var nameContainer = new PIXI.Container();
  var scoreContainer = new PIXI.Container();

  container.addChild(nameContainer);
  container.addChild(scoreContainer);

  WIDTH_FONT = 512;
  HEIGHT_FONT = 512;
  CHAR_PER_ROW = 16;
  CHAR_PER_COLUMN = 16;

  WIDTH_CHAR = WIDTH_FONT / CHAR_PER_COLUMN;
  HEIGHT_CHAR = HEIGHT_FONT / CHAR_PER_ROW;

  WIDTH_IN_PERCENTAGE_OF_SCORE = 0.7;

  var fontTexture = PIXI.Texture.fromImage("../img/font.png");
  var textureCache = {};

  var getChar = function(asciiChar) {
    var widthOffset = WIDTH_CHAR * Math.floor(asciiChar % 16);
    var heightOffset = HEIGHT_CHAR * Math.floor(asciiChar / 16);

    if (textureCache['' + widthOffset + '-' + heightOffset]) {
      return new PIXI.Sprite(textureCache['' + widthOffset + '-' + heightOffset]);
    }

    var fontTextureFromChar = new PIXI.Texture(
      fontTexture,
      new PIXI.Rectangle(widthOffset, heightOffset, WIDTH_CHAR, HEIGHT_CHAR)
    );
    textureCache['' + widthOffset + '-' + heightOffset] = fontTextureFromChar;

    return new PIXI.Sprite(fontTextureFromChar);
  };

  var center = function() {
      scoreWidth = (name + '' + score).length * WIDTH_CHAR + WIDTH_CHAR / 2;
      container.position.x = (1 - WIDTH_IN_PERCENTAGE_OF_SCORE) * width / 2;
  };

  var renderString = function(container, toRender, offset){
    for(var i = 0; i < toRender.length; i++){
      var spriteChar = getChar(toRender.charCodeAt(i));
      spriteChar.position.x = offset + i * WIDTH_CHAR;
      spriteChar.position.y = HEIGHT_CHAR / 6;
      container.addChild(spriteChar);
    }
  };

  var renderName = function(name) {
    renderString(nameContainer, name, 0);
  };

  var renderScore = function(score) {
    score = '' + score;
    offset = name.length * WIDTH_CHAR + WIDTH_CHAR / 2;

    for(var i = scoreContainer.children.length - 1; i >= 0; i--) {
      scoreContainer.removeChild(scoreContainer.children[i]);
    }

    renderString(scoreContainer, score, offset);
  };

  var increment = function(inc) {
    score += inc;
    renderScore(score);
    scale();
    center();
  };

  var scoreTextWidth = function() {
    return (name + '' + score).length * WIDTH_CHAR + WIDTH_CHAR / 2;
  };

  var scale = function() {
    scaleWidth(container, WIDTH_IN_PERCENTAGE_OF_SCORE, scoreTextWidth());
  };

  var initialize = function() {
    renderName(name);
    renderScore(score);
    scale();
    center();
  };

  initialize();

  return {
    container: container,
    increment: increment
  };
};
