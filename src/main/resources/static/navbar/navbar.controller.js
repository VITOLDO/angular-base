'use strict';

angular
    .module('myApp')
    .controller('NavbarCtrl', NavbarCtrl);

function NavbarCtrl() {
    var vm = this;

    vm.actions = [{title:'Home', url:'#!/home', type:'link'},
        {title:'System Properties', url:'#!/system-properties', type:'link'},
        {title:'User Management', url:'#!/security', type:'link'},
        {title:'Requests', url:'#', type:'group', group: [
            {title:'Invoice', url:'#!/requests/invoice', type:'link'},
            {title:'Invoice Payment', url:'#!/requests/ip', type:'link'},
            {title:'Purchase Order', url:'#!/requests/po', type:'link'},
            {title:'Client Data Update', url:'#!/requests/cdu', type:'link'}]}];
}