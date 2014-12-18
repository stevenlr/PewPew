var SoundRegistry = function() {
	this.sounds = {};
	this.lastPlayed = {};
	this.nbOverdubs = {};
	this.nbLoaded = {};
	this.nbFullLoaded = 0;
};

SoundRegistry.prototype.load = function(key, src, nbOverdubs, volume) {
	this.lastPlayed[key] = 0;
	this.nbOverdubs[key] = nbOverdubs;
	this.nbLoaded[key] = 0;
	this.sounds[key] = [];

	for (var i = 0; i < nbOverdubs; ++i) {
		var elm = document.createElement("audio");

		this.sounds[key][i] = elm;
		elm.autoplay = false;
		elm.volume = volume;

		(function (context, elm, key) {
			elm.oncanplaythrough = function() {
				context.nbLoaded[key]++;

				if (context.nbLoaded[key] == context.nbOverdubs[key]) {
					context.nbFullLoaded++;
				}
			};
		}) (this, elm, key);

		elm.src = "assets/sounds/" + src;
		document.body.appendChild(elm);
	}
};

SoundRegistry.prototype.getLoadedPercent = function() {
	if (isEmpty(this.sounds))
		return 1;

	return this.nbFullLoaded / objectLength(this.sounds);
};

SoundRegistry.prototype.play = function(key) {
	this.lastPlayed[key] = (this.lastPlayed[key] + 1) % this.nbOverdubs[key];

	var elm = this.sounds[key][this.lastPlayed[key]];

	elm.pause();
	elm.currentTime = 0;
	elm.play();
};