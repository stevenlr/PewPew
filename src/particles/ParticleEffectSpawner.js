var ParticleEffectSpawner = {};

ParticleEffectSpawner.fire = function(game, manager, x, y) {
	var spread = 20;

	for (var i = 0; i < 8; ++i) {
		var rx  = (Math.random() * 2 - 1) * spread;
		var ry  = (Math.random() * 2 - 1) * spread;
		manager.addParticle(new FireParticle(game, x + rx, y + ry));
	}
};

ParticleEffectSpawner.debris = function(game, manager, x, y, dx, dy) {
	var spread = 5;

	for (var i = 0; i < 12; ++i) {
		var rx  = (Math.random() * 2 - 1) * spread;
		var ry  = (Math.random() * 2 - 1) * spread;
		manager.addParticle(new DebrisParticle(game, x + rx, y + ry, dx, dy));
	}
};