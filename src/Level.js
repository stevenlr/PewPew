var Level = function(game, shipType) {
	this.game = game;
	this.player = new PlayerShipEntity(this, this.game.ships[shipType]);
	this.projectiles = [];
	this.ennemies = [];
	this.nbEnnemies = 20;
	this.score = 0;
	this.end = 0;
	this.backgroundScroll = 0;
	this.backgroundScroll2 = 0;
	this.starsimg1 = this.game.images.get("stars");
	this.starsimg2 = this.game.images.get("stars2");
};

Level.prototype.update = function(dt) {
	this.player.update(dt);

	if (this.end) {
		return;
	}

	if (this.player.health == 0) {
		this.end = 1;
		return;
	}

	if (this.ennemies.length < this.nbEnnemies) {
		if (Math.random() < 0.04) {
			var e = new EnnemyShipEntity(this);
			this.ennemies[this.ennemies.length] = e;
		}
	}

	var toRemove = [];
	var i = 0;
	for (i in this.projectiles) {
		this.projectiles[i].update(dt);

		if (this.projectiles[i].isDead()) {
			toRemove[toRemove.length] = i;
		}
	}

	if (toRemove.length > 0) {
		toRemove.sort();
		toRemove.reverse();
		for (i in toRemove) {
			this.projectiles.splice(toRemove[i], 1);
		}
	}

	toRemove = [];
	for (i in this.ennemies) {
		this.ennemies[i].update(dt);

		if (this.ennemies[i].isDead()) {
			toRemove[toRemove.length] = i;
		}
	}

	if (toRemove.length > 0) {
		toRemove.sort();
		toRemove.reverse();
		for (i in toRemove) {
			this.ennemies.splice(toRemove[i], 1);
		}
	}

	if (this.score < 0) {
		this.score = 0;
	}

	this.backgroundScroll -= dt * 50;

	if (this.backgroundScroll < -this.starsimg1.width) {
		this.backgroundScroll += this.starsimg1.width;
	}

	this.backgroundScroll2 -= dt * 80;

	if (this.backgroundScroll2 < -this.starsimg2.width) {
		this.backgroundScroll2 += this.starsimg2.width;
	}
};

Level.prototype.draw = function(ctx) {
	for (var x = this.backgroundScroll; x < this.game.width; x += this.starsimg1.width) {
		ctx.drawImage(this.starsimg1, x, 0);
	}

	for (var x = this.backgroundScroll2; x < this.game.width; x += this.starsimg2.width) {
		ctx.drawImage(this.starsimg2, x, 0);
	}

	this.player.draw(ctx);

	ctx.save();
	ctx.globalCompositeOperation = "lighter";

	for (i in this.projectiles) {
		this.projectiles[i].draw(ctx);
	}

	ctx.restore();

	for (i in this.ennemies) {
		this.ennemies[i].draw(ctx);
	}

	ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
	ctx.fillRect(0, 0, this.game.width, 50);

	ctx.fillStyle = '#331100';
	ctx.fillRect(10, 10, 200, 30);
	ctx.fillStyle = '#dd2211';
	ctx.fillRect(10, 10, 200 * this.player.health / this.player.maxhealth, 30);
	ctx.fillStyle = '#ffffff';
	ctx.textBaseline = "middle";
	ctx.font = "20px Arial";
	ctx.textAlign = "left";
	ctx.fillText("Health    |    Score  " + this.score, 230, 25);

	if (this.end) {
		ctx.fillStyle = '#eedd55';
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "100px Arial";
		ctx.fillText("Game over", this.game.width / 2, this.game.height / 2);
	}
};

Level.prototype.addProjectile = function(p) {
	this.projectiles[this.projectiles.length] = p;
};