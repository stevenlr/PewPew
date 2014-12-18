var ShipSelectScreen = function(game) {
	this.game = game;
	this.selected = 0;
};

ShipSelectScreen.prototype = new Screen();

ShipSelectScreen.prototype.update = function(dt) {
	if (this.game.input.pressed("left")) {
		this.selected = (this.selected + 2) % 3;
		this.game.sounds.play("select");
	}

	if (this.game.input.pressed("right")) {
		this.selected = (this.selected + 1) % 3;
		this.game.sounds.play("select");
	}

	if (this.game.input.pressed("space")) {
		this.game.screenManager.scheduleScreenChange(new GameScreen(this.game, this.selected));
		this.game.sounds.play("confirm");
	}
};

ShipSelectScreen.prototype.draw = function(ctx) {
	ctx.drawImage(this.game.images.get("stars"), 0, 0);

	ctx.fillStyle = '#eedd55';
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "60px Arial";
	ctx.fillText("Select a ship", this.game.width / 2, 120);

	var column = 0;

	ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
	ctx.fillRect((this.game.width / 4) * (this.selected + 1), 250, this.game.width / 4, 390);

	for (var x = this.game.width / 8; x < this.game.width; x += this.game.width / 4, ++column) {
		if (column == 0) {
			ctx.fillStyle = '#777';
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "30px Arial";
			ctx.fillText("Ship", x, 280);
			ctx.fillText("Health", x, 500);
			ctx.fillText("Acceleration", x, 550);
			ctx.fillText("Fire rate", x, 600);
		} else {
			if (this.selected == column - 1)
				ctx.fillStyle = '#eedd55';
			else
				ctx.fillStyle = '#bbb';

			var config = this.game.ships[column - 1];
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "30px Arial";
			ctx.fillText(config.name, x, 280);
			ctx.drawImage(this.game.images.get(config.image), x - 40, 330);
			ctx.fillText(config.health, x, 500);
			ctx.fillText(config.acceleration / 100, x, 550);
			ctx.fillText((Math.round(1 / config.fireRate * 100) / 100) + " /s", x, 600);
		}
	}
};