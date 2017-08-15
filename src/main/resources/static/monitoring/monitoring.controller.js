'use strict';

angular
    .module('myApp')
    .controller('MonitoringCtrl', MonitoringCtrl);

MonitoringCtrl.$inject = ['$route', '$http', 'ngToast', '$scope', '$filter', 'urls']

function MonitoringCtrl($route, $http, ngToast, $scope, $filter, urls) {
    ngToast.dismiss();
    var vm = this;

    $scope.settings = $route.current.settings;

    // Defaulted values are: From yesterday to today
    $scope.date = {"from" : new Date(new Date().setSeconds(-1*60*60*24)), "to" : new Date()}

    vm.pagination = {current: 1, pageSize: 10, count: 0}
    vm.paginationFiles = {current: 1, pageSize: 10, count: 0}
    vm.paginationClients = {current: 1, pageSize: 10, count: 0}
    vm.paginationDocs = {current: 1, pageSize: 10, count: 0}
    vm.data = {};
    vm.activeTable = 0;
    vm.application = $scope.settings.type + 'admintool'

    vm.refresh = function(date) {
        var rows = getRowNum(vm.pagination);
        $http.get(urls.apiUrl + vm.application + "/monitoring/input/files?startRowNum=" + rows.startRowNum +
            "&endRowNum=" + rows.endRowNum +
            "&dateFrom=" + $filter('date')(date.from, 'yyyy-MM-dd') +
            "T00:00:00&dateTo=" + $filter('date')(date.to, 'yyyy-MM-dd') + "T23:59:59")
            .then(function(response) {
                vm.data = response.data.inputFiles;
                vm.pagination.count = response.data.count;
            }, function(error) {
                ngToast.create({className: 'danger',
                   content: $scope.settings.type + " monitoring is in error state.",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            });
    }

    vm.refreshFiles = function(item, type) {
        vm.activeTable = 0;
        var rows = getRowNum(vm.paginationFiles);
        $http.get(urls.apiUrl + vm.application + "/monitoring/input/files/" + type + "?startRowNum=" + rows.startRowNum +
            "&endRowNum=" + rows.endRowNum +
            "&dateFrom=" + (item.hours + ":00:00").replace(" ", "T") +
            "&dateTo=" + (item.hours + ":59:59").replace(" ", "T"))
            .then(function(response) {
                vm.filesData = response.data.inputFiles;
                vm.paginationFiles.count = response.data.count;
            }, function(error) {
                ngToast.create({className: 'danger',
                   content: $scope.settings.type + " monitoring is in error state.",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            });
    }

    vm.refreshDocs = function(item, type) {
        vm.activeTable = 1;
        var rows = getRowNum(vm.paginationDocs);
        $http.get(urls.apiUrl + vm.application + "/monitoring/input/docs/" + type + "?startRowNum=" + rows.startRowNum +
            "&endRowNum=" + rows.endRowNum +
            "&dateFrom=" + (item.hours + ":00:00").replace(" ", "T") +
            "&dateTo=" + (item.hours + ":59:59").replace(" ", "T"))
            .then(function(response) {
                vm.docsData = response.data.inputDocs;
                vm.paginationDocs.count = response.data.count;
            }, function(error) {
                ngToast.create({className: 'danger',
                   content: $scope.settings.type + " monitoring is in error state.",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            });
    }

    vm.refreshClients = function(item, type) {
        vm.activeTable = 2;
        var rows = getRowNum(vm.paginationClients);
        $http.get(urls.apiUrl + vm.application + "/monitoring/input/clients/" + type + "?startRowNum=" + rows.startRowNum +
            "&endRowNum=" + rows.endRowNum +
            "&dateFrom=" + (item.hours + ":00:00").replace(" ", "T") +
            "&dateTo=" + (item.hours + ":59:59").replace(" ", "T"))
            .then(function(response) {
                vm.clientsData = response.data.inputClients;
                vm.paginationClients.count = response.data.count;
            }, function(error) {
                ngToast.create({className: 'danger',
                   content: $scope.settings.type + " monitoring is in error state.",
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