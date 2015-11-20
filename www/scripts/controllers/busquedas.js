'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('BusquedasController',  [
			'$rootScope','$scope','$http','$location','miposicionService','filtrosService','paradasFactory','CONFIG','jwtHelper','olData','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $location,  miposicionService,  filtrosService,  paradasFactory,  CONFIG,  jwtHelper,  olData,  olHelpers,  store){
		$rootScope.rootMenu = 1;
		
		$scope.filtro = filtrosService.get();
		
		paradasFactory.listarcercanas($scope.filtro).then(function(res){
			$scope.paradascercanas = res.data;
		});
		
		$scope.seleccionarParada = function(parada){
			$scope.filtro.parada = parada;
			$scope.filtro.x = parseFloat(parada.x);
			$scope.filtro.y = parseFloat(parada.y);
			filtrosService.set($scope.filtro);
			$location.path('/mapa');
		};
		
		$scope.seleccionCalle = function(item, op){
			if (op == 1){
				$scope.filtro.codcalle = item.codigo;
				$scope.filtro.nombrecalle = item.nombre;
			} else{
				$scope.filtro.codcalleint = item.codigo;
				$scope.filtro.nombrecalleint = item.nombre;
				$scope.filtro.x = parseFloat(item.x);
				$scope.filtro.y = parseFloat(item.y);
			}
			filtrosService.set($scope.filtro);
		};
		$scope.getCalles = function(value,op){
			var url = CONFIG.APIURL+'/calles/listar?nombre='+value;
			if (op == 2){ // interseccion
				url = CONFIG.APIURL+'/calles/interseccion?nombre='+value+'&codigoint='+$scope.filtro.codcalle;
			}
			return $http.get(url, {})
			.then(function(response){
				return response.data;
			});
		}
		
		$scope.busquedaParadascercanas = function(op){
			if (op == 1){
				$scope.filtro.titulo = 'Mi posición actual';
				$scope.filtro.x = miposicionService.get().x;
				$scope.filtro.y = miposicionService.get().y;
				filtrosService.set($scope.filtro);
			} else if (op == 2){
				$scope.filtro.titulo = $scope.filtro.nombrecalle;
				if ($scope.filtro.nombrecalleint != ''){
					$scope.filtro.titulo += ' - '+$scope.filtro.nombrecalleint;
				} else{
					$scope.filtro.titulo += ' '+$scope.filtro.altura;
				}
				$scope.filtro.x = 0;
				$scope.filtro.y = 0;
				filtrosService.set($scope.filtro);
			}
				
			$location.path('/busquedas/paradascercanas');
		}
		
		$scope.$watch('filtro.altura', function(newValue, oldValue) {
			$scope.filtro.codcalleint = '';
			$scope.filtro.nombrecalleint = '';
		}, true);
		
	}
]);