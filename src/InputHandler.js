var InputHandler = function() {

	this.currentStates = {};
	this.oldStates = {};

	for (key in this.config) {
		this.currentStates[this.config[key]] = 0;
		this.oldStates[this.config[key]] = 0;
	}

	(function (context) {
		document.onkeydown = function(e) {
			context.currentStates[e.keyCode] = 1;
			console.log(e.keyCode);
		};

		document.onkeyup = function(e) {
			context.currentStates[e.keyCode] = 0;
		};
	}) (this);
};

InputHandler.prototype.config = {
	"left": 37,
	"up": 38,
	"right": 39,
	"down": 40,
	"space": 32,
	"mute": 77
};

InputHandler.prototype.isDown = function(key) {
	return this.currentStates[this.config[key]];
};

InputHandler.prototype.pressed = function(key) {
	return this.currentStates[this.config[key]]
		&& !this.oldStates[this.config[key]];
};

InputHandler.prototype.released = function(key) {
	return !this.currentStates[this.config[key]]
		&& this.oldStates[this.config[key]];
};

InputHandler.prototype.update = function() {
	for (key in this.currentStates) {
		this.oldStates[key] = this.currentStates[key];
	}
};