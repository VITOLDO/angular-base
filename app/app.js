'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ngResource',
  'ngToast'
])
.config(function($locationProvider, $routeProvider, ngToastProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    })
    .when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
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
});
