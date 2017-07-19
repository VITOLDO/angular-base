'use strict';

angular
    .module('myApp')
    .controller('SecurityCtrl', SecurityCtrl);

 function SecurityCtrl($resource, $scope, ngToast) {
    ngToast.dismiss();

    var thisScope = $scope;
    $scope.selectedUser = null;

    $('#timeInput').mask('00:00:00.000')

    $scope.allUsers = $resource('/api/security.management/users.json').query();
    $scope.allGroups = $resource('/api/security.management/groups.json').query();
    $scope.allPermissions = $resource('/api/security.management/permission.json').query();

    $scope.userSelected = function(item) {
        thisScope.selectedUser = item;
        thisScope.userGroups = $resource('/api/security.management/usergroups' + item.userId +'.json').query();
    }

    $scope.assignGroupToUser = function(group, assigned) {
        group.assigned = assigned;
    }

    $scope.saveUserGroups = function(user, groups) {
        ngToast.create({
           className: 'success',
           content: "User with : " + user.userName + " should be updated with following groups : " + groups,
           verticalPosition: 'top',
           dismissOnTimeout: false});
    }
};