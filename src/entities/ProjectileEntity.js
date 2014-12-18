var ProjectileEntity = function(level, friendly, x, y, dx) {
	this.level = level;
	this.friendly = friendly;
	this.box = new AABB(x - 2, y - 2, 4, 4);
	this.dx = dx;
	this.dead = 0;
}

ProjectileEntity.prototype = new Entity();

ProjectileEntity.prototype.getBoundingBox = function() {
	return this.box;
}

ProjectileEntity.prototype.isDead = function() {
	return this.dead;
};

ProjectileEntity.prototype.update = function(dt) {
	var speed = 1000;

	this.box.x += speed * this.dx * dt;

	if (this.box.x < -4) {
		this.dead = 1;
	}

	if (this.box.x > this.level.game.width) {
		this.dead = 1;
	}
};

ProjectileEntity.prototype.draw = function(ctx) {
	if (this.friendly) {
		ctx.fillStyle = "#0077ff";
	} else {
		ctx.fillStyle = "#ff0000";
	}

	ctx.fillRect(this.box.x, this.box.y, this.box.w, this.box.h);
};