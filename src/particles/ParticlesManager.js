var ParticlesManager = function(limit) {
	this.limit = limit;
	this.particles = [];
};

ParticlesManager.prototype.addParticle = function(p) {
	if (this.particles.length < this.limit) {
		this.particles[this.particles.length] = p;
	}
};

ParticlesManager.prototype.update = function(dt) {
	var toRemove = [];
	var i = 0;

	for (i in this.particles) {
		this.particles[i].update(dt);

		if (this.particles[i].isDead()) {
			toRemove[toRemove.length] = i;
		}
	}

	if (toRemove.length > 0) {
		toRemove.sort();
		toRemove.reverse();
		for (i in toRemove) {
			this.particles.splice(toRemove[i], 1);
		}
	}
};

ParticlesManager.prototype.draw = function(ctx) {
	for (i in this.particles) {
		this.particles[i].draw(ctx);
	}

	ctx.globalAlpha = 1;
};