'use strict';

angular
    .module('myApp')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['ngToast']

function HomeCtrl(ngToast) {
    ngToast.dismiss();

    var vm = this;


}