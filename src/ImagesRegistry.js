var ImagesRegistry = function() {
	this.images = {};
	this.loaded = {};
	this.nbLoaded = 0;
};

ImagesRegistry.prototype.load = function(key, src) {
	var img = new Image();

	this.loaded[key] = 0;
	this.images[key] = img;

	(function (context, img, key) {
		img.onload = function() {
			context.loaded[key] = 1;
			context.nbLoaded++;
		};
	}) (this, img, key);

	img.src = "assets/images/" + src;
};

ImagesRegistry.prototype.getLoadedPercent = function() {
	if (isEmpty(this.images))
		return 1;

	return this.nbLoaded / objectLength(this.images);
};

ImagesRegistry.prototype.get = function(key) {
	return this.images[key];
};