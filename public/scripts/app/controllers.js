define(['angular'], function (angular) {
    'use strict';

	var mainAppcontrollers = angular.module('mainAppcontrollers', []);
	mainAppcontrollers.controller('loginController',['$scope', '$http','$location','localStorageService',
		function($scope, $http,$location,localStorageService){
			$scope.login = function(){
				var user = {"username": $scope.username, "password": $scope.password};

	                if($scope.username!==undefined || $scope.password !==undefined){
	                    $http({method: 'POST', url: '/api/login', data:user}).
	                        success(function(data, status, headers, config) {

	                            localStorageService.set("loggedin",data.loggedin);
	                            //$location.path("/home");
	                            alert('Logged in');
	                        }).
	                        error(function(data, status, headers, config) {
	                            if(status===401){
	                                alert('Wrong username and/or password!');
	                            }else{
	                                alert('error');
	                            }
	                        });
	                }else{
	                    alert('Username and password are mandatory!');
	                }
			}
	}]);
	return mainAppcontrollers;

});