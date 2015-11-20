app.service('filtrosService', function () {
	var filtro = {
		titulo: 'Por defecto',
		x: -61.49179,
		y: -31.25273,
		codcalle: '',
		nombrecalle: '',
		altura: 0,
		codcalleint: '',
		nombrecalleint: '',
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