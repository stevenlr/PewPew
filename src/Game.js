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
	this.sounds = new SoundRegistry();

	this.images.load("stars", "stars.png");
	this.images.load("stars2", "stars2.png");
	this.images.load("ship-izalith", "ship1.png");
	this.images.load("ship-solaire", "ship2.png");
	this.images.load("ship-manus", "ship3.png");
	this.images.load("ennemy", "ennemy.png");
	this.images.load("projectile-player", "projectile-player.png");
	this.images.load("projectile-ennemy", "projectile-ennemy.png");
	this.images.load("debris1", "debris.png");
	this.images.load("debris2", "debris-small1.png");
	this.images.load("debris3", "debris-small2.png");
	this.images.load("fire", "fire.png");

	this.sounds.load("confirm", "confirm.wav", 2, 0.3);
	this.sounds.load("explosion", "explosion.wav", 4, 0.1);
	this.sounds.load("hurt", "hurt.wav", 1, 0.4);
	this.sounds.load("select", "select.wav", 4, 0.4);
	this.sounds.load("shoot", "shoot.wav", 8, 0.2);

	this.width = this.elementF.width;
	this.height = this.elementF.height;

	this.ships = [
		new ShipConfig("Solaire", 5000, 10, 0.12, "ship-solaire"),
		new ShipConfig("Izalith", 6000, 6, 0.075, "ship-izalith"),
		new ShipConfig("Manus", 3400, 28, 0.23, "ship-manus")
	];

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

