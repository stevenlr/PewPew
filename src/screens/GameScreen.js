var GameScreen = function(game, shipType) {
	this.game = game;
	this.level = new Level(game, shipType);
	this.endCooldown = 1;
};

GameScreen.prototype = new Screen();

GameScreen.prototype.update = function(dt) {
	if (this.level.end) {
		this.endCooldown -= dt;

		if (this.endCooldown <= 0 && this.game.input.pressed("space")) {
			this.game.screenManager.scheduleScreenChange(new MenuScreen(this.game));
		}
	} else {
		this.level.update(dt);
	}
};

GameScreen.prototype.draw = function(ctx) {
	this.level.draw(ctx);
};