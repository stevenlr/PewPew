var MenuScreen = function(game) {
	this.game = game;
};

MenuScreen.prototype = new Screen();

MenuScreen.prototype.update = function(dt) {
	if (this.game.input.pressed("space")) {
		this.game.screenManager.scheduleScreenChange(new GameScreen(this.game));
	}
};

MenuScreen.prototype.draw = function(ctx) {
	ctx.drawImage(this.game.images.get("stars"), 0, 0);

	ctx.fillStyle = '#eedd55';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "120px Arial";
	ctx.fillText("PEW PEW N' SHIT", this.game.width / 2, 150);

	ctx.fillStyle = '#999';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "50px Arial";
	ctx.fillText("Press SPACE to play", this.game.width / 2, 550);

	ctx.fillStyle = '#666';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "20px Arial";
	ctx.fillText("Arrow keys to dance", this.game.width / 2, 380);
	ctx.fillText("Space to make stuff go pew pew", this.game.width / 2, 420);

	ctx.fillStyle = '#555';
	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
	ctx.font = "20px Arial";
	ctx.fillText("A shitty game by Steven Le Rouzic", this.game.width - 20, this.game.height - 60);
	ctx.fillText("stevenlr.com", this.game.width - 20, this.game.height - 30);
};