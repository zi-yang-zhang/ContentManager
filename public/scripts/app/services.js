define(['angular'], function (angular) {
    'use strict';

    var myAppServices = angular.module('myAppServices', []);
    myAppServices.service('AuthenticationService',['localStorageService',function(localStorageService){
        return {
            isLogged: function()
            {   var loggedin = localStorageService.get("loggedin");
                if(loggedin=null) return false;
                return loggedin;
            }
        }
    }])

    return myAppServices;
});