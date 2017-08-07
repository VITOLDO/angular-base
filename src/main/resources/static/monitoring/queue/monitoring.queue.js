'use strict';

angular
    .module('myApp')
    .controller('QueueCtrl', QueueCtrl);

QueueCtrl.$inject = ['$http', 'ngToast', '$scope', '$filter', 'urls']

function QueueCtrl($http, ngToast, $scope, $filter, urls) {
    var vm = this;

    vm.threshold = 100;
    vm.allDlq;

    vm.refreshQueues = function() {
        $http.get(urls.apiUrl + 'nifi/application/queues?threshold=' + vm.threshold)
            .then(function(response){
                vm.queuesInProgress = response.data;
            }, function(error){
                ngToast.create({
                    className: 'danger',
                    content: "Nifi queue load is in error state : " + error,
                    verticalPosition: 'top',
                    dismissOnTimeout: false});
            });
    }

    vm.refreshDLQ = function(full) {
        $http.get(urls.apiUrl + 'nifi/application/dlq)
            .then(function(response){
                vm.dlqFromDb = response.data;
            }, function(error){
                ngToast.create({
                    className: 'danger',
                    content: "Nifi queue load is in error state : " + error,
                    verticalPosition: 'top',
                    dismissOnTimeout: false});
            });
        if (full || !vm.allDlq ) {
            $http.get(urls.apiUrl + 'nifi/application/search?query=AUTO_FAILED_AT')
                .then(function(response){
                    vm.allDlq = response.data;
                }, function(error){
                    ngToast.create({
                        className: 'danger',
                        content: "Nifi queue load is in error state : " + error,
                        verticalPosition: 'top',
                        dismissOnTimeout: false});
                });
        })
    }

    vm.refreshQueues();
    vm.refreshDLQ(true);
}