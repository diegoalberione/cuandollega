'use strict';
  
/**
 * @ngdoc overview
 * @name APP
 * @description
 * # APP
 *
 * Main module of the application.
 */
var app = angular.module('APP', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'angular-md5',
		'ngTouch',
		'ui.bootstrap',
		'ui.select',
		'ui.grid',
		'ui.grid.pagination',
		'angular-jwt',
		'angular-storage',
		'openlayers-directive'
	])
	.constant('CONFIG', {
		APIURL: "http://200.58.108.122/gis/ws",
	})
	.run(['$rootScope',function($rootScope) {
		$rootScope.rootMenu=1;
	}])	 
	.config(["$routeProvider",  function ($routeProvider){
		
		$routeProvider
			.when('/', {
				templateUrl: 'views/busquedas/index.html',
				controller: 'BusquedasController',
				controllerAs: 'busquedas'
			})
			.when('/busquedas', {
				templateUrl: 'views/busquedas/index.html',
				controller: 'BusquedasController',
				controllerAs: 'busquedas'
			})
			.when('/busquedas/index', {
				templateUrl: 'views/busquedas/index.html',
				controller: 'BusquedasController',
				controllerAs: 'busquedas'
			})
			.when('/busquedas/paradascercanas', {
				templateUrl: 'views/busquedas/paradascercanas.html',
				controller: 'BusquedasController',
				controllerAs: 'busquedas'
			})
			.when('/mapa', {
				templateUrl: 'views/mapa/index.html',
				controller: 'MapaController',
				controllerAs: 'mapa'
			})
			.otherwise({
				redirectTo: '/',
				authorization: true
			})
		;
	}])
;
