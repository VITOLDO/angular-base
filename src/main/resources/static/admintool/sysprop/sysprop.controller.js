'use strict';

angular
    .module('myApp')
    .controller('SyspropController', SyspropController) ;


function SyspropController($resource, $scope, $http, $base64, ngToast) {
    ngToast.dismiss();

    var vm = $scope;

    vm.init = function(appId) {
        //get proper resource data with appId
        vm.thisApp = appId;

        vm.syspropertiesMap = {};
        vm.syspropertiesData = $resource('http://192.168.99.100:9090/papi/services/system/properties/:id', {id:vm.thisApp}).query().$promise.then(function(array) {
            array.forEach(function(item) {
                vm.syspropertiesMap[item.key] = item.value;
            })
        });
    }

    vm.save = function(data) {
        ngToast.danger({
            content: "Data from sys properties are : " + data,
            verticalPosition: 'top',
            dismissOnTimeout: false});
    }
}