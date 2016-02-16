app.service('miposicionService', function () {
	var posicion = {
		x: -61.49179,
		y: -31.25273,
		altitude: 0,
		accuracy: 0,
		timestamp: 0
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
		},
		setX: function (x) {
			posicion.x = x;
		},
		setY: function (y) {
			posicion.y = y;
		}
	};
});