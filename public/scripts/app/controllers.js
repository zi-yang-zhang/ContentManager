define(['angular'], function (angular) {
    'use strict';

var mainAppcontrollers = angular.module('mainAppcontrollers', []);
mainAppcontrollers.controller('loginController',['$scope', '$http','$location',
	function($scope, $http,$location){
		$scope.login = function(){

		}
}]);
return mainAppcontrollers;

});