'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('FavoritosController',  [
			'$rootScope','$scope','$http','$location','miposicionService','filtrosService','favoritosService','CONFIG','jwtHelper','olData','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $location,  miposicionService,  filtrosService,  favoritosService,  CONFIG,  jwtHelper,  olData,  olHelpers,  store){
		$rootScope.rootMenu = 2;
		
		$scope.favoritosparadas = favoritosService.listar();
		
		$scope.limpiarFavoritos = function(){
			favoritosService.eliminarTodos();
			$scope.favoritosparadas = favoritosService.listar();
		};
		
		$scope.quitarDeFavoritos = function(parada){
			favoritosService.quitar(parada);
			$scope.favoritosparadas = favoritosService.listar();
		};
		
		$scope.seleccionarParada = function(parada){
			$scope.filtro = filtrosService.get();
			$scope.filtro.parada = parada;
			$scope.filtro.x = parseFloat(parada.x);
			$scope.filtro.y = parseFloat(parada.y);
			filtrosService.set($scope.filtro);
			$location.path('/mapa');
		};
		
	}
]);