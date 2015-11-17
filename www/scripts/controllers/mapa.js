'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('MapaController',  [
			'$rootScope','$scope','$http','$location','filtrosService','paradasFactory','CONFIG','jwtHelper','olData','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $location,  filtrosService,  paradasFactory,  CONFIG,  jwtHelper,  olData,  olHelpers,  store){
		$rootScope.rootMenu = 3;
		
		$scope.filtro = filtrosService.get();
		
		$scope.center = {
			lon: $scope.filtro.x,
			lat: $scope.filtro.y,
			zoom: 15
		};
		$scope.defaults = {
			events: {
				layers: [ 'mousemove', 'click' ]
			},
			controls: {
				zoom: true,
				rotate: false,
				attribution: false
			}
		};
		
		$scope.layers = [];
		/**
		$scope.layers.push({
			source: {
			type: 'tile',
				url: 'ttp://200.58.108.122/tilecache/tilecache.cgi',
				params: { LAYERS: 'rafaela3857' }
			}
		});
		/**/
		
		$scope.markers = [
			{
				nombre: 'Mi posición',
				lon: $scope.filtro.x,
				lat: $scope.filtro.y
			}
		];
		
		if ($scope.filtro.parada.x){
			$scope.markers.push({
				nombre: 'Parada',
				lon: parseFloat($scope.filtro.parada.x),
				lat: parseFloat($scope.filtro.parada.y),
				style: {
					image: {
						icon: {
							anchor: [0.5, 1],
							anchorXUnits: 'fraction',
							anchorYUnits: 'fraction',
							opacity: 0.90,
							src: 'images/linea'+$scope.filtro.parada.linea+'.png'
						}
					}
				}
			});
			
			$scope.layers.push({
				source: {
					type: 'ImageWMS',
					url: 'http://200.58.108.122/cgi-bin/mapserv?map=/var/www/gis/files/maps/gisar_1.map',
					params: { LAYERS: 'transportelinea'+$scope.filtro.parada.linea }
				}
			});
		}
		
	}
]);