'use strict'

angular
    .module('myApp')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['permissions']

function MainCtrl(permissions) {
    var vm = this;

    vm.hasPermission = function(value) {
        return permissions.hasPermission(value);
    }
}