'use strict';

angular
    .module('myApp.search')
    .factory('SearchService', ['$resource', function SearchService($resource) {
        return $resource('/api/search/people.json');
    }
]);
