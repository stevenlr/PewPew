var EnnemyShipEntity = function(level) {
	this.level = level;
	this.box = new AABB(level.game.width, Math.random() * (level.game.height - 25), 50, 25);
	this.dx = -280;
	this.dy = 0;
	this.dir_y = 0;
	this.cooldown = 1;
	this.iaCooldown = 0;
	this.dead = 0;
};

EnnemyShipEntity.prototype = new Entity();

EnnemyShipEntity.prototype.getBoundingBox = function() {
	return this.box;
};

EnnemyShipEntity.prototype.isDead = function() {
	return this.dead;
};

EnnemyShipEntity.prototype.update = function(dt) {
	this.cooldown -= dt;
	this.iaCooldown -= dt;

	if (this.iaCooldown <= 0) {
		this.iaCooldown = 0.8 + Math.random();

		if (Math.random() < 0.5) {
			this.dir_y = 0;
		} else if (Math.random() < 0.5) {
			this.dir_y = 1;
		} else {
			this.dir_y = -1;
		}
	}

	if (this.cooldown <= 0) {
		this.level.addProjectile(new ProjectileEntity(
			this.level, 0,
			this.box.x,
			this.box.y + this.box.h / 2,
			-1
		));
		this.cooldown = (Math.random() * 1) + 1;
	}

	this.dy *= 0.9;
	this.dy += dt * this.dir_y * 2000;
	this.box.y += dt * this.dy;

	if (this.box.y < 0) {
		this.box.y = 0;
		this.dy = 0;
		this.dir_y *= -1;
	}

	if (this.box.y > this.level.game.height - this.box.h) {
		this.box.y = this.level.game.height - this.box.h;
		this.dy = 0;
		this.dir_y *= -1;
	}

	this.box.x += dt * this.dx;

	if (this.box.x < -this.box.w) {
		this.dead = 1;
		this.level.score -= 4;
	}

	var i = 0;

	for (i in this.level.projectiles) {
		var p = this.level.projectiles[i];

		if (p.friendly) {
			var box = p.getBoundingBox();

			if (box.intersects(this.box)) {
				this.dead = 1;
				this.level.score += 7;
				break;
			}
		}
	}
};

EnnemyShipEntity.prototype.draw = function(ctx) {
	ctx.fillStyle = "#a20";
	ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
};