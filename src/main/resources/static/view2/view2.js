'use strict';

angular
    .module('myApp')
    .controller('View2Ctrl', [function() {
        $('#timeInput').mask('00:00:00.000')
    }]);