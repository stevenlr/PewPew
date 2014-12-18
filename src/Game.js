var Game = function(canvasF, canvasB) {
	this.elementF = canvasF;
	this.elementB = canvasB;
	this.ctxF = canvasF.getContext("2d");
	this.ctxB = canvasB.getContext("2d");
	this.fps = 60.0;
	this.mspf = 1000.0 / this.fps;
	this.input = new InputHandler();
	this.screenManager = new ScreenManager();
	this.images = new ImagesRegistry();

	this.images.load("stars", "stars.png");
	this.images.load("stars2", "stars2.png");

	this.images.load("ship-izalith", "ship1.png");
	this.images.load("ship-solaire", "ship2.png");
	this.images.load("stars-manus", "ship3.png");

	this.images.load("ennemy", "ennemy.png");
	this.images.load("projectile-player", "projectile-player.png");
	this.images.load("projectile-ennemy", "projectile-ennemy.png");

	this.width = this.elementF.width;
	this.height = this.elementF.height;

	this.screenManager.scheduleScreenChange(new LoadingScreen(this));

	(function (context) {
		window.setInterval(function() {
			context.run();
		}, context.mspf);
	}) (this);
};

Game.prototype.run = function() {
	var dt = this.mspf / 1000.0;

	if (this.screenManager.requiresChange()) {
		this.screenManager.changeScreen();
	}

	var screen = this.screenManager.getCurrentScreen();

	this.ctxB.fillStyle = "#000000";
	this.ctxB.fillRect(0, 0, 1280, 720);

	screen.update(dt);
	screen.draw(this.ctxB);

	this.ctxF.drawImage(this.elementB, 0, 0);

	this.input.update();
};

