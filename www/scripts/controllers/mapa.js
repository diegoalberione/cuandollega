'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('MapaController',  [
			'$rootScope','$scope','$http','$window','$interval','miposicionService','filtrosService','paradasFactory','colectivosFactory','CONFIG','jwtHelper','olData','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $window,  $interval,  miposicionService,  filtrosService,  paradasFactory,  colectivosFactory,  CONFIG,  jwtHelper,  olData,  olHelpers,  store){
		$rootScope.rootMenu = 3;
		
		$scope.mapaHeight = $window.innerHeight - 85;
		
		$scope.colectivo = [];
		
		$scope.filtro = filtrosService.get();
		
		var x = miposicionService.getX();
		var y = miposicionService.getY();
		if ($scope.filtro.x != 0){
			x = $scope.filtro.x;
		}
		if ($scope.filtro.y != 0){
			y = $scope.filtro.y;
		}
		
		$scope.center = {
			lon: x,
			lat: y,
			zoom: 9
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
		
		$scope.view = {
			maxResolution: 55.15399651120839,
			minResolution: 0.026930662358988472,
			projection: {
				code: 'EPSG:3857',
				extent: [-7005702.91197727, -3884801.8956991816, -6810024.119567, -3432980.3562793625]
			}
		};
		
		$scope.layers = [];
		/**/
		$scope.layers.push({
			name: 'muni',
			type: 'Tile',
			active: true,
			source: {
				type: 'TileWMS',
				url: 'http://200.58.108.122/tilecache/tilecache.cgi?',
				params: { LAYERS: 'rafaela3857' }
			}
		});
		/**/
		
		$scope.markerMiPosicion = {
			nombre: 'Mi posición',
			lon: miposicionService.getX(),
			lat: miposicionService.getY()
		};
		
		if ($scope.filtro.parada.x != null){
			$scope.markerParada = {
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
			};
			
			$scope.layers.push({
				source: {
					type: 'ImageWMS',
					url: 'http://200.58.108.122/cgi-bin/mapserv?map=/var/www/gis/files/maps/gisar_1.map',
					params: { LAYERS: 'transportelinea'+$scope.filtro.parada.linea }
				}
			});
		}
		
		$scope.markersColectivo = [];
		$scope.obtenerCuandollega = function(){
			colectivosFactory.cuandollega($scope.filtro).then(function(res){
				$scope.colectivo = res.data;
				
				if ($scope.colectivo.costototal < 1000){
					$scope.colectivo.costototalunidad = 'm';
				} else{
					$scope.colectivo.costototal = $scope.colectivo.costototal / 1000;
					$scope.colectivo.costototalunidad = 'km';
				}
				
				if ($scope.colectivo.tiempototal > 1){
					$scope.colectivo.tiempototalunidad = 'min';
				} else{
					$scope.colectivo.tiempototal = $scope.colectivo.tiempototal * 60;
					$scope.colectivo.tiempototalunidad = 'seg';
				}
				
				$scope.markersColectivo = [];
				$scope.markersColectivo.push({
					nombre: 'Colectivo linea '+$scope.filtro.parada.linea,
					lon: parseFloat(res.data.x),
					lat: parseFloat(res.data.y),
					style: {
						image: {
							icon: {
								anchor: [0.5, 1],
								anchorXUnits: 'fraction',
								anchorYUnits: 'fraction',
								opacity: 0.90,
								src: 'images/bus'+$scope.filtro.parada.linea+'.png'
							}
						}
					}
				});
			});
		}
		
		var stopInterval;
		if ($scope.filtro.parada.id > 0){
			$scope.obtenerCuandollega();
			var interval = $interval(function() {
				$scope.obtenerCuandollega()
			}, 5000);
		}		
		
		$scope.ubicarMiPosicion = function(){
			$scope.center = {
				lon: miposicionService.getX(),
				lat: miposicionService.getY(),
				zoom: 10
			};
		};
		
	}
]);