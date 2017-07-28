'use strict';

angular
    .module('myApp')
    .controller('RequestsCtrl', RequestsCtrl);

function RequestsCtrl() {
    var vm = this;

    vm.items = [{id:',', label:'Comma(,)'},
        {id:'\t', label:'Tab(\\t)'},
        {id:'\n', label:'New Line(\\n)'},
        {id:':', label:'Colon(:)'},
        {id:';', label:'Semicolon(;)'}]
}