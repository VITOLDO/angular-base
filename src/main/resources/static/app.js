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
    .filter('secondsToDateTime', secondsToDateTime) /*Refactor directive*/
    .directive('fileInput', ['$parse',function($parse){
        return {
            restrict: 'A',
            scope: {fileInput: "="},
            link: function(scope, elm, attr){
                elm.bind('change',function(changeEvent){
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileInput = loadEvent.target.result;
                        });
                    }
                    if (changeEvent.target.files.length > 0) {
                        reader.readAsText(changeEvent.target.files[0]);
                    } else {
                        scope.fileInput = undefined;
                        scope.$apply();
                    }
                });
            }
        }
    }])
    .constant('domain', 'https://localhost:9443/')
    .constant('api', 'papi/services/')
    .service('urls', function(domain, api){this.apiUrl = domain+api;});

config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider', 'ngToastProvider'];

function config($locationProvider, $routeProvider, $httpProvider, ngToastProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    })
    .when('/system-properties', {
        templateUrl: 'admintool/sysprop/sysprop.main.html',
        controller: 'SyspropMainCtrl'
    })
    .when('/security', {
        templateUrl: 'security/security.html',
        controller: 'SecurityCtrl'
    })
    .when('/requests', {
        templateUrl: 'requests/requests.html',
        controller: 'RequestsCtrl'
    })
        .when('/requests/invoice', {
            templateUrl: 'requests/invoice/invoice.html',
            controller: 'RequestsCtrl',
            controllerAs: 'requestsCtrl'
        })
            .when('/requests/invoice/reprocess', {
                templateUrl: 'requests/invoice/invoice.request.template.html',
                controller: 'RequestsCtrl',
                controllerAs: 'requestsCtrl',
                action: {html:'reprocess.request.html', title:'Reprocess Request'}
            })
            .when('/requests/invoice/delete_invoice', {
                templateUrl: 'requests/invoice/invoice.request.template.html',
                controller: 'RequestsCtrl',
                controllerAs: 'requestsCtrl',
                action: {html:'delete.invoice.html', title:'Delete Invoice'}
            })
            .when('/requests/invoice/notification_list', {
                templateUrl: 'requests/invoice/invoice.request.template.html',
                controller: 'RequestsCtrl',
                controllerAs: 'requestsCtrl',
                action: {html:'notification.list.html', title:'Notifications List'}
            })
            .when('/requests/invoice/repeating_file_delivery', {
                templateUrl: 'requests/invoice/invoice.request.template.html',
                controller: 'RequestsCtrl',
                controllerAs: 'requestsCtrl',
                action: {html:'repeating.file.delivery.html', title:'Repeating File Delivery'}
            })
            .when('/requests/invoice/cacheclean', {
                templateUrl: 'requests/invoice/invoice.request.template.html',
                controller: 'RequestsCtrl',
                controllerAs: 'requestsCtrl',
                action: {html:'cache.clean.html', title:'Cache Clean'}
            })
        .when('/requests/ip', {
            templateUrl: 'requests/ip/ip.html',
            controller: 'RequestCtrl'
        })
        .when('/requests/po', {
            templateUrl: 'requests/po/po.html',
            controller: 'RequestCtrl'
        })
        .when('/requests/cdu', {
            templateUrl: 'requests/cdu/cdu.html',
            controller: 'RequestCtrl'
        })
    .when('/monitoring/queues', {
        templateUrl: 'monitoring/queue/monitoring.queue.html',
        controller: 'QueueCtrl',
        controllerAs: 'queueCtrl'
    })
    .when('/monitoring/invoice', {
        templateUrl: 'monitoring/monitoring.html',
        controller: 'MonitoringCtrl',
        controllerAs: 'monitoringCtrl',
        settings: {type: 'invoice', label: 'Invoice'}
    })
    .when('/monitoring/po', {
        templateUrl: 'monitoring/monitoring.html',
        controller: 'MonitoringCtrl',
        controllerAs: 'monitoringCtrl',
        settings: {type: 'po', label: 'Purchase Order'}
    })
    .when('/monitoring/ip', {
        templateUrl: 'monitoring/monitoring.html',
        controller: 'MonitoringCtrl',
        controllerAs: 'monitoringCtrl',
        settings: {type: 'ip', label: 'Invoice Payment'}
    })
    .when('/monitoring/cdu', {
        templateUrl: 'monitoring/monitoring.html',
        controller: 'MonitoringCtrl',
        controllerAs: 'monitoringCtrl',
        settings: {type: 'cdu', label: 'Client Data Update'}
    })
    .when('/search', {
        templateUrl: 'search/search.html',
        controller: 'SearchController',
        controllerAs: 'vm'
    })

  $routeProvider.otherwise({redirectTo: '/home'});

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