// Invoca el modo JavaScript 'script'
'use strict';

app.factory('supervisoresFactory', ["$http", "$q", "md5", "CONFIG", 
	function($http, $q, md5, CONFIG){
		return {
			listar: function(){
				var defered = $q.defer();
				var promise = defered.promise;
				$http({
					method: 'GET',
					url: CONFIG.APIURL+'/Supervisores/GetSupervisores',
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
					/**
					if (status === 400) {
					} else {
						throw new Error("Fallo obtener los datos:" + response.status);
					}
					/**/
				});
			 
				return promise;
			}
		};
	}
]);
