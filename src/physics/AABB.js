var AABB = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
};

AABB.prototype.intersects = function(box) {
	if (	box.x + box.w < this.x
		|| box.y + box.h < this.y
		|| box.x > this.x + this.w
		|| box.y > this.y + this.h) {
		return 0;
	}
	
	return 1;
};