app.service('favoritosService', [
			 'store',
	function (store) {
		var favoritosParadas = [];
		return {
			listar: function () {
				favoritosParadas = store.get('favoritosParadas');
				return favoritosParadas;
			},
			existe: function(parada) {
				favoritosParadas = store.get('favoritosParadas');
				var existe = false;
				angular.forEach(favoritosParadas, function(obj, key) {
					if (obj.id == parada.id){
						existe = true;
					}
				});
				return existe;
			},
			guardar: function(parada) {
				var existe = false;
				favoritosParadas = store.get('favoritosParadas');
				angular.forEach(favoritosParadas, function(obj, key) {
					if (obj.id == parada.id){
						existe = true;
					}
				});
				
				if (existe == false){
					favoritosParadas.push(parada);
					store.set('favoritosParadas', favoritosParadas);
					favoritosParadas = store.get('favoritosParadas');
				}
			},
			quitar: function(parada){
				favoritosParadas = store.get('favoritosParadas');
				favoritosParadasFinal = [];
				angular.forEach(favoritosParadas, function(obj, key) {
					if (obj.id == parada.id){
						/* no lo asigna */
					} else{
						favoritosParadasFinal.push(obj);
					}
				});
				store.set('favoritosParadas', favoritosParadasFinal);
				favoritosParadas = store.get('favoritosParadas');
			},
			eliminarTodos: function(){
				store.set('favoritosParadas', []);
				favoritosParadas = store.get('favoritosParadas');
			}
		};
	}
]);