'use strict';

angular
    .module('myApp')
    .controller('SecurityCtrl', SecurityCtrl);

 function SecurityCtrl($resource, $scope, ngToast) {
    ngToast.dismiss();

    $('#timeInput').mask('00:00:00.000')

    $scope.allUsers = $resource('/api/security.management/users.json').query();
    $scope.allGroups = $resource('/api/security.management/groups.json').query();
    $scope.allPermissions = $resource('/api/security.management/permission.json').query();

    $scope.userSelected = function(item) {
        item.showDetails = !item.showDetails;
    }
};