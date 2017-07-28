'use strict';

angular
    .module('myApp')
    .factory('SyspropEntity', SyspropEntity) ;

function SyspropEntity($resource) {
    return $resource('https://papi:9443/papi/services/system/properties/:id', {id: '@_id'}, {
        update: {
            method: 'PUT'
        }
        });
}