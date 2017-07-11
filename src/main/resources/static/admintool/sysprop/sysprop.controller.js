'use strict';

angular
    .module('myApp')
    .controller('SyspropController', SyspropController) ;


function SyspropController($resource, $scope, $http, $base64, ngToast) {
    ngToast.dismiss();

    var dataInMilliseconds = ['ADM.MN_HISTORY_TIMEOUT', 'ADM.MN_USER_ACTIVE_TIMEOUT',
        'RUNNING APPLICATION', 'RUNNING PRE-PROCESSOR', 'RUNNING POST-PROCESSOR', 'CACHE TIMEOUT',
        'CDU.RUNNING APPLICATION', 'CDU.RUNNING PRE-PROCESSOR', 'CDU.CACHE TIMEOUT',
        'IP.RUNNING APPLICATION', 'IP.RUNNING PRE-PROCESSOR', 'IP.CACHE TIMEOUT',
        'PO.RUNNING APPLICATION', 'PO.RUNNING PRE-PROCESSOR', 'PO.CACHE TIMEOUT'];

    var vm = $scope;

    vm.init = function(appId) {
        //get proper resource data with appId
        vm.thisApp = appId;

        vm.syspropertiesMap = {};
        $resource('http://192.168.99.100:9090/papi/services/system/properties/:id', {id:vm.thisApp})
            .query().$promise.then(function(array) {
            array.forEach(function(item) {
                if (-1 !== dataInMilliseconds.indexOf(item.key)) {
                    vm.syspropertiesMap[item.key] = new Date(1970, 0, 1).setSeconds(item.value/1000);
                } else {
                    vm.syspropertiesMap[item.key] = item.value;
                }
            })
        }, function(error) {
            ngToast.danger({
                content: "System module 'get' sent an error : " + error,
                verticalPosition: 'top',
                dismissOnTimeout: false})
        });
    }

    vm.save = function(data) {
        var requestForSave = [];
        angular.forEach(data, function(value,key) {
            if (-1 !== dataInMilliseconds.indexOf(key)) {
                requestForSave.push({"key":key, "value":(new Date(value) - new Date(1970, 0, 1))})
            } else {
                requestForSave.push({"key":key, "value":value})
            }
        })
        console.log(requestForSave);

        $resource('http://192.168.99.100:9090/papi/services/system/properties/:id', {id:vm.thisApp}, {'update': {method: 'PUT'}})
            .update(requestForSave).$promise.then(
            function(response){
                ngToast.create({
                    className: 'success',
                    content: "System module 'update' sent success : " + response,
                    verticalPosition: 'top',
                    dismissOnTimeout: false});
            },
            function(error){
                console.log(error)
                ngToast.danger({
                    content: "System module 'update' sent an error : " + error,
                    verticalPosition: 'top',
                    dismissOnTimeout: false});
            })
    }

    angular.element(document).ready(function () {
        $('input[uib-datepicker-popup]').mask('00:00:00');
    })
}