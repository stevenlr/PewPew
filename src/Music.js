var Music = function(volume) {
	this.volume = volume;
	this.muted = false;
	this.loaded = 0;
	this.start = load("start", false, this);
	this.loop = load("loop", true, this);
	this.muted = false;

	function load(file, loop, music) {
		var elm = document.createElement("audio");
		elm.autoplay = false;
		elm.volume = music.volume;
		elm.preload = "auto";
		elm.loop = loop;

		elm.oncanplaythrough = function() {
			music.loaded++;
		};

		elm.src = "assets/music/music-" + file + ".ogg";
		document.body.appendChild(elm);

		return elm;
	}
};

Music.prototype.getLoadedPercent = function() {
	return this.loaded / 2;
};

Music.prototype.play = function() {
	this.start.play();

	(function (context) {
		context.start.onended = function() {
			context.loop.play();
		}
	}) (this);
};

Music.prototype.toggleMuted = function() {
	if (this.muted) {
		this.start.volume = this.volume;
		this.loop.volume = this.volume;
		this.muted = false;
	} else {
		this.start.volume = 0;
		this.loop.volume = 0;
		this.muted = true;
	}
};