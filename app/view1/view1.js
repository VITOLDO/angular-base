'use strict';

angular
    .module('myApp')
    .controller('View1Ctrl', View1Ctrl);

function View1Ctrl($scope, uibDateParser) {
    $scope.format = 'HH:mm:ss.sss';
    $scope.date = new Date(120000);
};