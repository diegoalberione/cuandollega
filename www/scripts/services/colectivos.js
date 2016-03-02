// Invoca el modo JavaScript 'script'
'use strict';

app.factory('colectivosFactory', ["$http", "$q", "md5", "CONFIG", 
	function($http, $q, md5, CONFIG){
		return {
			cuandollega: function(filtro){
				var defered = $q.defer();
				var promise = defered.promise;
				
				var url = CONFIG.APIURL+'/seguimientos/cuandollega/'+filtro.parada.id+'/'+filtro.parada.linea_id;
				
				$http({
					method: 'GET',
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				})
				.then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					defered.resolve(response);
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					defered.reject(response);
				});
			 
				return promise;
			},
			obtenerUrlWMS: function(nombreLayer){
				var defered = $q.defer();
				var promise = defered.promise;
				
				var url = CONFIG.APIURL_GIS+'/layers/obtener_url_wms/?layer='+nombreLayer;
				
				$http({
					method: 'GET',
					url: url,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				})
				.then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					defered.resolve(response);
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					defered.reject(response);
				});
			 
				return promise;
			},
		};
	}
]);
