'use strict'

angular
    .module('myApp')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['permissions', '$http', 'ngToast']

function MainCtrl(permissions, $http, ngToast) {
    var vm = this;
    vm.user = {'displayName':'Anauthorized'};


    vm.hasPermission = function(value) {
        return permissions.hasPermission(value);
    }

    $http.get('user').then(function(response) {
        vm.user = response.data;
    }, function(error) {
        ngToast.danger({
           content: "System module 'user' sent an error : " + error,
           verticalPosition: 'top',
           dismissOnTimeout: false});
    })
}