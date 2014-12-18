var LoadingScreen = function(game) {
	this.game = game;
	this.lastLoad = 0;
};

LoadingScreen.prototype = new Screen();

LoadingScreen.prototype.update = function(dt) {
	this.lastLoad = (this.game.images.getLoadedPercent() + this.game.sounds.getLoadedPercent()) / 2;
	if (this.lastLoad >= 1) {
		this.game.screenManager.scheduleScreenChange(new MenuScreen(this.game));
	}
};

LoadingScreen.prototype.draw = function(ctx) {
	ctx.fillStyle = '#555';
	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
	ctx.font = "30px Arial";
	ctx.fillText("Loading shit...", this.game.width - 20, this.game.height - 30);

	ctx.fillStyle = "#555";
	ctx.strokeStyle = "#999";
	ctx.fillRect(200, this.game.height / 2 - 30, (this.game.width - 400) * this.lastLoad, 60);
	ctx.strokeRect(200, this.game.height / 2 - 30, this.game.width - 400, 60);
};