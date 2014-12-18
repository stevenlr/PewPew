var ImagesRegistry = function() {
	this.images = {};
	this.nbLoaded = 0;
};

ImagesRegistry.prototype.load = function(key, src) {
	var img = new Image();

	this.images[key] = img;

	(function (context, img) {
		img.onload = function() {
			context.nbLoaded++;
		};
	}) (this, img);

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