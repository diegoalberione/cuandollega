'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('BusquedasController',  [
			'$rootScope','$scope','$http','$location','filtrosService','paradasFactory','CONFIG','jwtHelper','olData','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $location,  filtrosService,  paradasFactory,  CONFIG,  jwtHelper,  olData,  olHelpers,  store){
		$rootScope.rootMenu = 1;
		
		$scope.filtro = filtrosService.get();
		$scope.filtro.x = -61.49179;
		$scope.filtro.y = -31.25273;
		filtrosService.set($scope.filtro);
		
		paradasFactory.listarcercanas($scope.filtro).then(function(res){
			$scope.paradascercanas = res.data;
		});
		
		$scope.seleccionarParada = function(parada){
			$scope.filtro.parada = parada;
			filtrosService.set($scope.filtro);
			$location.path('/mapa');
		};
		
	}
]);