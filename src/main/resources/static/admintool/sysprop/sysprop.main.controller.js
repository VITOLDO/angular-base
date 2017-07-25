'use strict';

angular
    .module('myApp')
    .controller('SyspropMainCtrl', SyspropMainCtrl);

SyspropMainCtrl.$inject = ['$scope', 'uibDateParser', 'ngToast']

function SyspropMainCtrl($scope, uibDateParser, ngToast) {
    ngToast.dismiss();

    $scope.format = 'HH:mm:ss.sss';
    $scope.date = new Date(120000 + new Date(120000).getTimezoneOffset()*60*1000)

    $scope.systemPropertiesTabs = [{"title":"Admin Tool", "appId":"7", "template":"sysprop.admin.html"},
        {"title":"Invoice", "appId":"1", "template":"sysprop.invoice.html"},
        {"title":"Client Data Update","appId":"3", "template":"sysprop.cdu.html"},
        {"title":"Invoice Payment","appId":"2", "template":"sysprop.ip.html"},
        {"title":"Purchase Order","appId":"4", "template":"sysprop.po.html"}]

    $scope.showDate = function(value) {
        ngToast.danger({
            content: "Date Parser returned : " + value,
            verticalPosition: 'top',
            dismissOnTimeout: false});
    }
};