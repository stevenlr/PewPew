var PlayerShipEntity = function(level, config) {
	this.config = config;
	this.level = level;
	this.box = new AABB(100, level.game.height / 2 - 40, 80, 40);
	this.dy = 0;
	this.dx = 0;
	this.cooldown = 0;
	this.maxhealth = config.health;
	this.health = this.maxhealth;
	this.healthCooldown = 0;
	this.firing = 0;
};

PlayerShipEntity.prototype = new Entity();

PlayerShipEntity.prototype.getBoundingBox = function() {
	return this.box;
};

PlayerShipEntity.prototype.update = function(dt) {
	var accy = 0;
	var accx = 0;
	var acc = this.config.acceleration;
	var input = this.level.game.input;

	if (this.health == 0) {
		return;
	}

	if (input.isDown("up")) {
		accy -= acc;
	}

	if (input.isDown("down")) {
		accy += acc;
	}

	if (input.isDown("left")) {
		accx -= acc;
	}

	if (input.isDown("right")) {
		accx += acc;
	}

	if (input.pressed("space")) {
		this.firing = 1;
	}

	if (input.released("space")) {
		this.firing = 0;
	}

	if (this.firing && this.cooldown <= 0) {
		this.level.game.sounds.play("shoot");
		this.level.addProjectile(new ProjectileEntity(
			this.level, 1,
			this.box.x + this.box.w,
			this.box.y,
			1
		));

		this.cooldown = this.config.fireRate;
	}

	this.cooldown -= dt;

	if (input.released("space")) {
		this.cooldown = 0;
	}

	this.dy *= 0.9;
	this.dy += dt * accy;
	this.box.y += dt * this.dy;

	this.dx *= 0.9;
	this.dx += dt * accx;
	this.box.x += dt * this.dx;

	if (this.box.y < 0) {
		this.box.y = 0;
		this.dy = 0;
	}

	if (this.box.y > this.level.game.height - this.box.h) {
		this.box.y = this.level.game.height - this.box.h;
		this.dy = 0;
	}

	if (this.box.x < 0) {
		this.box.x = 0;
		this.dx = 0;
	}

	if (this.box.x > this.level.game.width - this.box.w) {
		this.box.x = this.level.game.width - this.box.w;
		this.dx = 0;
	}

	this.healthCooldown -= dt;

	if (this.healthCooldown <= 0) {
		var i = 0;

		for (i in this.level.projectiles) {
			var p = this.level.projectiles[i];

			if (!p.friendly) {
				var box = p.getBoundingBox();

				if (box.intersects(this.box)) {
					this.level.game.sounds.play("hurt");
					this.health -= 1;
					this.healthCooldown = 1;
					ParticleEffectSpawner.fire(this.level.game, this.level.particles,
						box.x, box.y);

					if (this.health < 0) {
						this.health = 0;
					}

					break;
				}
			}
		}

		for (i in this.level.ennemies) {
			var e = this.level.ennemies[i];
			var box = e.getBoundingBox();

			if (box.intersects(this.box)) {
				this.level.game.sounds.play("hurt");
				this.health -= 2;
				this.healthCooldown = 1;

				if (this.health < 0) {
					this.health = 0;
				}

				e.kill();

				break;
			}
		}
	}
};

PlayerShipEntity.prototype.draw = function(ctx) {
	ctx.drawImage(this.level.game.images.get(this.config.image), this.box.x, this.box.y - 40);
};