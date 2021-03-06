var files = [
	"utils",
	
	"Game",
	"InputHandler",
	"ScreenManager",
	"Level",
	"ImagesRegistry",
	"SoundRegistry",
	"ShipConfig",
	"Music",

	"screens/Screen",
	"screens/GameScreen",
	"screens/MenuScreen",
	"screens/LoadingScreen",
	"screens/ShipSelectScreen",

	"entities/Entity",
	"entities/PlayerShipEntity",
	"entities/EnnemyShipEntity",
	"entities/ProjectileEntity",

	"particles/Particle",
	"particles/ParticlesManager",
	"particles/DebrisParticle",
	"particles/FireParticle",
	"particles/ParticleEffectSpawner",

	"physics/AABB"
];

var numberLoadedFiles = 0;

function require(file) {
	var script = document.createElement("script");

	script.src = "src/" + file + ".js";
	script.type = "text/javascript";
	script.onload = onScriptLoaded;

	document.body.appendChild(script);
}

function onScriptLoaded() {
	++numberLoadedFiles;

	if (numberLoadedFiles == files.length) {
		onFullLoad();
	}
}

function onFullLoad() {
	var canvasF = document.getElementById("frontBuffer");
	var canvasB = document.getElementById("backBuffer");
	var game = new Game(canvasF, canvasB);
}

for (i in files) {
	require(files[i]);
}
