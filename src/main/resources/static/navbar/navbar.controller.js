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
            {title:'All', url:'#!/requests', type:'link'},
            {title:'Invoice', url:'#!/requests/invoice', type:'link'},
            {title:'Invoice Payment', url:'#!/requests/ip', type:'link'},
            {title:'Purchase Order', url:'#!/requests/po', type:'link'},
            {title:'Client Data Update', url:'#!/requests/cdu', type:'link'}]},
        {title:'Schedulers', url:'#', type:'link'},
        {title:'Monitoring', url:'#', type:'group', group: [
            {title:'Queues', url:'#!/monitoring/queues', type:'link'},
            {title:'Invoice', url:'#!/monitoring/invoice', type:'link'},
            {title:'Invoice Payment', url:'#!/monitoring/ip', type:'link'},
            {title:'Purchase Order', url:'#!/monitoring/po', type:'link'},
            {title:'Client Data Update', url:'#!/monitoring/cdu', type:'link'}]},
        {title:'Logging', url:'#', type:'link'}];
}