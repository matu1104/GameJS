
GameOver = function(onMenu, onRetry) {
  YOULOSE_WIDTH = 678;

  BUTTON_SIZE = 95;

  var youLoseTexture = PIXI.Texture.fromImage("../img/youlose.png");
  var youLoseSprite = new PIXI.Sprite(youLoseTexture);

  var buttonsTexture = PIXI.Texture.fromImage("../img/buttons.png");
  var menuTexture = new PIXI.Texture(buttonsTexture, new PIXI.Rectangle(0, 405, BUTTON_SIZE, BUTTON_SIZE));
  var retryTexture = new PIXI.Texture(buttonsTexture, new PIXI.Rectangle(0, 310, BUTTON_SIZE, BUTTON_SIZE));

  var menuSprite = new PIXI.Sprite(menuTexture);
  var retrySprite = new PIXI.Sprite(retryTexture);

  var container = new PIXI.Container();

  setAnchor(youLoseSprite, 0.5, 1.0);
  setPosition(youLoseSprite, 0.5, 0.35);
  scaleWidth(youLoseSprite, 0.9, YOULOSE_WIDTH);

  setAnchor(menuSprite, 1.0, 0.0);
  setPosition(menuSprite, 0.45, 0.40);
  scaleWidth(menuSprite, 0.2, BUTTON_SIZE);

  setAnchor(retrySprite, 0.0, 0.0);
  setPosition(retrySprite, 0.55, 0.40);
  scaleWidth(retrySprite, 0.2, BUTTON_SIZE);

  menuSprite.interactive = true;
  retrySprite.interactive = true;

  menuSprite.click = onMenu;
  retrySprite.click = onRetry;
  menuSprite.tap = onMenu;
  retrySprite.tap = onRetry;

  container.addChild(youLoseSprite);

  container.addChild(menuSprite);
  container.addChild(retrySprite);

  show = function() {
    container.visible = true;
  };

  hide = function() {
    container.visible = false;
  };

  hide();

  return {
    show: show,
    hide: hide,
    container: container
  };
};
