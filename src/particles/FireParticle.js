var FireParticle = function(game, x, y) {
	var angle = Math.random() * 6.28;
	var speed = Math.random() * 5 + 14;

	Particle.call(this, x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, 2);

	this.img = game.images.get("fire");
};

FireParticle.prototype = new Particle();

FireParticle.prototype.update = function(dt) {
	Particle.prototype.update.call(this, dt);
};

FireParticle.prototype.draw = function(ctx) {
	ctx.globalAlpha = (1 - Math.exp(- this.time));
	ctx.globalCompositeOperation = "lighter";
	ctx.drawImage(this.img, this.x - 32, this.y - 32);
};