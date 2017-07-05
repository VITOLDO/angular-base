'use strict';

angular
    .module('myApp')
    .controller('View1Ctrl', View1Ctrl);

function View1Ctrl($scope, uibDateParser, ngToast) {
    ngToast.dismiss();

    $scope.format = 'HH:mm:ss.sss';
    $scope.date = new Date(120000 + new Date(120000).getTimezoneOffset()*60*1000)

    $scope.systemPropertiesTabs = ["Invoice", "Client Data Update", "Invoice Payment", "Purchase Order"]

    $scope.showDate = function(value) {
        ngToast.danger({
            content: "Date Parser returned : " + value,
            verticalPosition: 'top',
            dismissOnTimeout: false});
    }
};