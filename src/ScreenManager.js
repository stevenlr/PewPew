var ScreenManager = function() {
	this.currentScreen = null;
	this.nextScreen = null;
};

ScreenManager.prototype.getCurrentScreen = function() {
	return this.currentScreen;
};

ScreenManager.prototype.scheduleScreenChange = function(screen) {
	this.nextScreen = screen;
};

ScreenManager.prototype.requiresChange = function() {
	return this.nextScreen != null;
};

ScreenManager.prototype.changeScreen = function() {
	this.currentScreen = this.nextScreen;
	this.nextScreen = null;
};