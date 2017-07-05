'use strict';

angular
    .module('myApp')
    .controller('SyspropController', SyspropController) ;


function SyspropController($resource, $scope, ngToast) {
    ngToast.dismiss();

    var vm = $scope;

    vm.init = function(appId) {
        ngToast.danger({
            content: "Initializing sysproperties controller for : " + appId,
            verticalPosition: 'top',
            dismissOnTimeout: false});
        vm.thisApp = appId;
    }

    vm.syspropertiesData = $resource('/api/sysprop/sysprop.json').query();

    vm.save = function(data) {
        ngToast.danger({
            content: "Data from sys properties are : " + data,
            verticalPosition: 'top',
            dismissOnTimeout: false});
    }
}