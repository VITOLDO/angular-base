//'use strict';

var permissionList;
angular.element(document).ready(function() {
  $.get('/user/roles', function(data) {
    permissionList = data;
    angular.bootstrap(document, ['myApp']);
  });
});

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap',
  'ngResource',
  'base64',
  'ngToast'
])
    .config(config)
    .factory('permissions', permissions)
    .filter('secondsToDateTime', secondsToDateTime);

config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider', 'ngToastProvider'];

function config($locationProvider, $routeProvider, $httpProvider, ngToastProvider) {
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
}

function secondsToDateTime() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}

app.run(function(permissions) {
  permissions.setPermissions(permissionList);
});

permissions.$inject = ['$rootScope'];

function permissions($rootScope) {
    var permissionList = [];
    var service = {
        setPermissions: setPermissions,
        hasPermission: hasPermission
    }
    return service;

    function setPermissions(permissions) {
        permissionList = permissions;
        $rootScope.$broadcast('permissionChanged');
    }

    function hasPermission(permission) {
        permission = permission.trim();
        return permissionList.some(item => {
            return item.trim() === permission;
        })
    }
}