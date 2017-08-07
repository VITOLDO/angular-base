'use strict';

angular
    .module('myApp')
    .controller('MonitoringCtrl', MonitoringCtrl);

MonitoringCtrl.$inject = ['$http', 'ngToast', '$scope', '$filter', 'urls']

function MonitoringCtrl($http, ngToast, $scope, $filter, urls) {
    ngToast.dismiss();
    var vm = this;
    // Defaulted values are: From yesterday to today
    $scope.date = {"from" : new Date(new Date().setSeconds(-1*60*60*24)), "to" : new Date()}

    vm.pagination = {current: 1, pageSize: 10, count: 0}
    vm.data = {};

    vm.refresh = function(date) {
        var rows = getRowNum(vm.pagination);
        $http.get(urls.apiUrl + "invoiceadmintool/monitoring/input/files?startRowNum=" + rows.startRowNum +
            "&endRowNum=" + rows.endRowNum +
            "&dateFrom=" + $filter('date')(date.from, 'yyyy-MM-dd') +
            "T00:00:00&dateTo=" + $filter('date')(date.to, 'yyyy-MM-dd') + "T23:59:59")
            .then(function(response) {
                vm.data = response.data.inputFiles;
                vm.pagination.count = response.data.count;
            }, function(error) {
                ngToast.create({className: 'danger',
                   content: "Invoice monitoring is in error state.",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            });
    }

    var getRowNum = function(pagination) {
        var rows = {};
        rows.startRowNum = ((pagination.current - 1) * pagination.pageSize) + 1;
        rows.endRowNum = pagination.current * pagination.pageSize;
        return rows;
    }

    vm.refresh($scope.date);
}