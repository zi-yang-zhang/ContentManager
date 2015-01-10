require.config({
  baseUrl: 'scripts/libs',
  paths: {
        'mainApp' : '../app/app',
        'controllers' : '../app/controllers',
        'services' : '../app/services',
        'angular' :'angular/angular.min',
        'angularRoute' : 'angular-route/angular-route.min',
        'angularLocalStorage' : 'angular-local-storage/dist/angular-local-storage.min',
        'jquery' : 'jquery/dist/jquery.min',
        'bootstrap' : '/css/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
        'angular': {
            exports: 'angular'
        },
        'angularRoute' :{
            deps: ['angular'],
            exports : 'angularRoute'
        },
        'angularLocalStorage' :{
            deps: ['angular'],
            exports : 'angularLocalStorage'
        },
        'bootstrap' : ['jquery']
  },
  
});

require(['angular','angularRoute','angularLocalStorage','bootstrap','mainApp'], function () {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['mainApp']);
    });
});