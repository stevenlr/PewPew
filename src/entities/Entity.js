var Entity = function() {
};

Entity.prototype.getBoundingBox = function() {
	return new AABB(0, 0, 0, 0);
};

Entity.prototype.idDead = function() {
	return 0;
};

Entity.prototype.update = function(dt) {
};

Entity.prototype.draw = function(dt) {
};