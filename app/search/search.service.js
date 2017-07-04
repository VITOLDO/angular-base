'use strict';

angular
    .module('myApp')
    .factory('SearchService', ['$resource', function SearchService($resource) {
        return $resource('/api/search/people.json');
    }
]);
