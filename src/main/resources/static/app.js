'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ngResource',
  'base64',
  'ngToast'
])
.config(function($locationProvider, $routeProvider, $httpProvider, ngToastProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    })
    .when('/security', {
        templateUrl: 'security/security.html',
        controller: 'SecurityCtrl'
    })
    .when('/search', {
        templateUrl: 'search/search.html',
        controller: 'SearchController',
        controllerAs: 'vm'
    })

  $routeProvider.otherwise({redirectTo: '/view1'});

  ngToastProvider.configure({
    dismissButton: true,
    dismissOnClick: false,
    combineDuplications: true,
    timeout: 6000
  });
})
.filter('secondsToDateTime', [function() {
  return function(seconds) {
      return new Date(1970, 0, 1).setSeconds(seconds);
  };
}]);
