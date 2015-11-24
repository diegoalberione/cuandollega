'use strict';

/**
 * @ngdoc function
 * @name APP.controller:MainController
 * @description
 * # MainController
 * Controller of the APP
 */
app.controller('MainController',  [
			'$rootScope','$scope','$http','$location','CONFIG','cordovaGeolocationService','filtroService','supervisoresFactory','representantesFactory','laboratoriosFactory','jwtHelper','olData','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $location,  CONFIG,  cordovaGeolocationService   filtroService,  supervisoresFactory,  representantesFactory,  laboratoriosFactory,  jwtHelper,  olData,  olHelpers,  store){
		$rootScope.rootMenu = 1;
		
		$scope.filtro = filtroService.get();
		
		$scope.person = {};
		$scope.supervisores = [];
		$scope.representantes = [];
		
        supervisoresFactory.listar().then(function(res){
			$scope.supervisores = res.data;
			/**
			if(res.data && res.data.code == 0){
				$scope.proyectos = res.data.response.proyectos;
			}
			/**/
		});
		
		$scope.regiones = ['','Centro','NE','NO','Cuyo','Patagonia'];
		$scope.paisSel = 'Argentina';
		$scope.regionSel = '';
		$scope.provinciaSel = '';
		if ($scope.filtro.zona.tipo == 0){
			$scope.paisSel = $scope.filtro.zona.value;
		} else if ($scope.filtro.zona.tipo == 1){
			$scope.regionSel = $scope.filtro.zona.value;
		} else if ($scope.filtro.zona.tipo == 2){
			$scope.provinciaSel = $scope.filtro.zona.value;
		}
		
		$scope.fechaDesde = {
			format: 'dd/MM/yyyy',
			opened: false,
			value: $scope.filtro.fechadesde
		};
		$scope.fechaHasta = {
			format: 'dd/MM/yyyy',
			opened: false,
			value: $scope.filtro.fechahasta
		};
		
		$scope.laboratorios = [];
		laboratoriosFactory.listar().then(function(res){
			$scope.laboratorios = res.data;
		
			/* verifica si tiene que prender o no algun check */
			angular.forEach($scope.laboratorios, function(obj, key) {
				angular.forEach($scope.filtro.laboratorios, function(obj2, key) {
					if (obj.id == obj2.id){
						obj.checked = obj2.checked;
					}
				});
			})
		});
		
		var getColor = function(feature) {
			var colores = [
				'rgba(255, 255, 255, 0.1)',
				'rgba(244, 0, 0, 0.1)',
				'rgba(0, 233, 0, 0.1)',
				'rgba(0, 0, 222, 0.1)',
				'rgba(211, 211, 0, 0.1)',
				'rgba(0, 211, 211, 0.1)',
			]
            return colores[feature.get('region')];
        };
		
		var getStyleProvincias = function(feature) {
            var style = olHelpers.createStyle({
                fill: {
                    color: getColor(feature)
                },
                stroke: {
                    color: 'white',
                    width: 2
                }
            });
            return [ style ];
        };
		
		$scope.center = {
			lat: -40.76,
			lon: -63.63,
			zoom: 4
		};
		$scope.defaults ={
			events: {
				layers: [ 'mousemove', 'click' ]
			}
		};
		$scope.lyProvincias = {
			name: 'lyProvincias',
			source: {
				type: 'GeoJSON',
				url: 'files/provincias.json'
			},
			style: getStyleProvincias
		};

		/* 
		* verifica que radiobutton esta selccionado para asignar el value al 
		* atributo zona del servicio filtro
		*/
		var asignarValorParaZona = function(){
			if ($scope.filtro.zona.tipo == 0){
				$scope.filtro.zona.value = $scope.paisSel;
			} else if ($scope.filtro.zona.tipo == 1){
				$scope.filtro.zona.value = $scope.regionSel;
			} else if ($scope.filtro.zona.tipo == 2){
				$scope.filtro.zona.value = $scope.provinciaSel;
			}
		};
		/* si se hace clic en una provincia se asignan al filtro los valores */
        $scope.$on('openlayers.layers.lyProvincias.click', function(event, feature) {
            $scope.$apply(function(scope) {
				$scope.regionSel = $scope.regiones[feature.get('region')];
				$scope.provinciaSel = feature.get('nombre');
				asignarValorParaZona();
            });
        });
		
		/* guarda en el filtro el laboratorio asignado/quitado */
		$scope.seleccionarLaboratorio = function(){
			$scope.filtro.laboratorios = [];
			angular.forEach($scope.laboratorios, function(obj, key) {
                if (obj.checked){
					$scope.filtro.laboratorios.push(obj);
				}
            })
			filtroService.set($scope.filtro);
		}
		
		/* se escuchan las variables para saber si cambiaron */
		$scope.$watch('filtro.zona.tipo', function(newValue, oldValue) {
			asignarValorParaZona();
		}, true);
		$scope.$watch('fechaDesde', function(newValue, oldValue) {
			$scope.filtro.fechadesde = newValue.value;
			filtroService.set($scope.filtro);
		}, true);	
		$scope.$watch('fechaHasta', function(newValue, oldValue) {
			$scope.filtro.fechahasta = newValue.value;
			filtroService.set($scope.filtro);
		}, true);	
		$scope.$watch('filtro.supervisores', function(newValue, oldValue) {
			representantesFactory.listar($scope.filtro.supervisores).then(function(res){
				$scope.representantes = res.data;
			});		
		}, true);
	}
]);
