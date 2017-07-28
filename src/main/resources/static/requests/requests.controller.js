'use strict';

angular
    .module('myApp')
    .controller('RequestsCtrl', RequestsCtrl);

function RequestsCtrl() {
    var vm = this;

    vm.actions = [{action:'Cache Clean', url:'/papi/invoice/cacheClean'},
        {action:'Request Deletion', url:'/papi/invoice/deleteRequest'},
        {action:'Notification List', url:'/papi/invoice/notificationList'},
        {action:'Repeating File Delivery', url:'/papi/invoice/repeatingFileDelivery'},
        {action:'Reprocess Request', url:'/papi/invoice/reprocessRequest'}]
}