var Particle = function(x, y, dx, dy, time) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.time = time;
};

Particle.prototype.isDead = function() {
	return this.time <= 0;
};

Particle.prototype.update = function(dt) {
	this.time -= dt;

	this.x += this.dx * dt;
	this.y += this.dy * dt;
};

Particle.prototype.draw = function(ctx) {
};