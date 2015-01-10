define(['angular',
    'angularRoute',
    'angularLocalStorage',
    'controllers',
    'services']
    , function (angular) {
    	'use strict';

		var mainApp = angular.module('mainApp', ['mainAppcontrollers','ngRoute', 'myAppServices','LocalStorageModule']);


		mainApp.config(['$routeProvider', function($routeProvider) {
		  		$routeProvider.
		                when('/login', {
		                    templateUrl: 'partial/login',
		                    controller: 'loginController',
		                    access: { requiredLogin: false }
		                }).
		                otherwise({
		                    redirectTo: '/login'
		                });
		}]);

		mainApp.run(['$rootScope','$location','AuthenticationService',function($rootScope, $location, AuthenticationService) {
	        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {

	            if (nextRoute.access===undefined) {
	                $location.path("/login");
	            }else if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged()) {
	                $location.path("/login");
	            }else if (AuthenticationService.isLogged() && !nextRoute.access.requiredLogin) {
	                $location.path("/home");
	            }
	        });
    	}]);

    	return mainApp;
    });


