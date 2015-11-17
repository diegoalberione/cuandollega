app.service('filtrosService', function () {
	var filtro = {
		x: -61.33,
		y: -31.35,
		codcalle: '',
		altura: 0,
		parada: [],
		linea: 0
	};

	return {
		get: function () {
			return filtro;
		},
		set: function(f) {
			filtro = f;
		}
	};
});