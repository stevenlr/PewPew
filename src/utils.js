function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}

function objectLength(obj) {
	var size = 0;
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			size++;
	}

	return size;
}