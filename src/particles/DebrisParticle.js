var DebrisParticle = function(game, x, y, dx, dy) {
	var angle = Math.random() * 6.28;
	var speed = Math.random() * 50 + 30;

	Particle.call(this, x, y, Math.cos(angle) * speed + dx * 0.4, Math.sin(angle) * speed, 3);

	var r = Math.random();
	if (r < 0.33) {
		this.img = game.images.get("debris1");
	} else if (r < 0.66) {
		this.img = game.images.get("debris2");
	} else {
		this.img = game.images.get("debris3");
	}
};

DebrisParticle.prototype = new Particle();

DebrisParticle.prototype.update = function(dt) {
	Particle.prototype.update.call(this, dt);

	this.dx *= 0.99;
	this.dy *= 0.99;
};

DebrisParticle.prototype.draw = function(ctx) {
	ctx.globalAlpha = (1 - Math.exp(- this.time * 10));
	ctx.drawImage(this.img, this.x - 4, this.y - 4);
};