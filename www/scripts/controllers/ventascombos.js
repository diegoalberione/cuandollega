'use strict';

/**
 * @ngdoc function
 * @name APP.controller:VentascombosController
 * @description
 * # VentascombosController
 * Controller of the APP
 */
app.controller('VentascombosController',  [
			'$rootScope','$scope','$http','$location','CONFIG','filtroService','jwtHelper','uiGridConstants','olHelpers','store', 
	function($rootScope,  $scope,  $http,  $location,  CONFIG,  filtroService,  jwtHelper,  uiGridConstants,  olHelpers,  store){
		$rootScope.rootMenu = 2;
		
		$scope.filtro = filtroService.get();
		
		$scope.gridOptions = {
		showGridFooter: true,
		showColumnFooter: true,
		enableFiltering: false,
		enablePaging: true,
		useExternalPagination: true,
		useExternalSorting: true,
		useExternalFiltering: true,
		paginationPageSizes: [25, 50, 75],
		paginationPageSize: 25,
		columnDefs: [
			{ field: 'zona', name:'Zona' },
			{ field: 'promotor', name:'Promotor' },
			{ field: 'totalcombos', name:'Total Combos' },
			{ field: 'totalcomboscc', name:'Total Combos CC' },
			{ field: 'totalcombosph', name:'Total Combos PH' }
		],
		data: [],
		onRegisterApi: function(gridApi) {
			$scope.gridApi = gridApi;
			/**/
			$scope.gridApi.core.on.filterChanged( $scope, function(parms) {
				var grid = this.grid;
				
				listarOptions.filter = [];
				for (var i=0; i<grid.columns.length; i++){
					if ((typeof grid.columns[i].filters[0].term != 'undefined') && (grid.columns[i].filters[0].term != null)){
						listarOptions.filter[listarOptions.filter.length] = grid.columns[i].field+'='+grid.columns[i].filters[0].term;
					}
				}
				
				listar(listarOptions);
			});

			gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
				listarOptions.pageNumber = newPage;
				listarOptions.pageSize = pageSize;
				listar(listarOptions);
			});
			/**/
		}
	};
	}
]);