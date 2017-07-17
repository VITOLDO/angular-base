'use strict';

angular
    .module('myApp')
    .controller('SecurityCtrl', SecurityCtrl);

 function SecurityCtrl($resource, $scope, ngToast) {
    ngToast.dismiss();

    var thisScope = $scope;
    $scope.selectedUser = null;
    $scope.notInUserGroups = {};

    $('#timeInput').mask('00:00:00.000')

    $scope.allUsers = $resource('/api/security.management/users.json').query();
    $scope.allGroups = $resource('/api/security.management/groups.json').query();
    $scope.allPermissions = $resource('/api/security.management/permission.json').query();

    $scope.userSelected = function(item) {
        thisScope.selectedUser = item;
        thisScope.userGroups = $resource('/api/security.management/usergroups' + item.userId +'.json').query();
    }

    $scope.assignGroupToUser = function(group, assigned) {



        ngToast.create({
            className: 'success',
            content: "Here should be method to " +  (assigned? "add" : "remove") + " group " + group.groupName + " for User " + $scope.selectedUser.userName,
            verticalPosition: 'top',
            dismissOnTimeout: false});
    }
};