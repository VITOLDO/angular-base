'use strict';

angular
    .module('myApp')
    .controller('SearchController', ['SearchService', function (SearchService){

        var vm = this;

        vm.search = function () {
            console.log(SearchService)
            SearchService.query(vm.term, function (response) {
                var results = response.filter(function (item) {
                    return JSON.stringify(item).toLowerCase().includes(vm.term.toLowerCase());
                });
                vm.searchResults = results;
            });
        };
}]);