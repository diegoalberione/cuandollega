app.service('miposicionService', function () {
	var posicion = {
		x: -61.49179,
		y: -31.25273
	};

	return {
		get: function () {
			return posicion;
		},
		set: function(f) {
			posicion = f;
		},
		getX: function () {
			return posicion.x;
		},
		getY: function () {
			return posicion.y;
		}
	};
});