'use strict';

angular
    .module('myApp')
    .controller('RequestsCtrl', RequestsCtrl);

RequestsCtrl.$inject = ['$route', '$scope', '$http', 'ngToast']

function RequestsCtrl($route, $scope, $http, ngToast) {
    ngToast.dismiss();
    var vm = this;

    $scope.action = $route.current.action;

    $scope.items = [{id:',', label:'Comma(,)'},
        {id:'\t', label:'Tab(\\t)'},
        {id:'\n', label:'New Line(\\n)'},
        {id:':', label:'Colon(:)'},
        {id:';', label:'Semicolon(;)'}]

    $scope.sendImgType = ['Mail To:', 'Save In:', 'Exec:']

    vm.reprocessRequest = function (search) {
        var body = {};

        /*TODO: FIND THE BETTER WAY TO HANDLE THIS SHIT*/
        if (angular.isDefined(search)) {
            if (angular.isDefined(search.senderObx)) {
                body.supplierId = search.senderObx.input;
                body.supplierIdList = safeSplit(search.senderObx.file, search.senderObx.type)
            }
            if (angular.isDefined(search.buyerObx)) {
                body.buyerId = search.buyerObx.input;
                body.buyerIdList = safeSplit(search.buyerObx.file, search.buyerObx.type)
            }
            if (angular.isDefined(search.buyerFile)) {
                body.buyerFileId = search.buyerFile.input;
                body.buyerFileIdList = safeSplit(search.buyerFile.file, search.buyerFile.type)
            }
            if (angular.isDefined(search.buyerFileName)) {
                body.buyerFileName = search.buyerFileName.input;
            }
            if (angular.isDefined(search.invoiceNumber)) {
                body.invoiceNumber = search.invoiceNumber.input;
                body.invoiceNumberList = safeSplit(search.invoiceNumber.file, search.invoiceNumber.type)
            }
            if (angular.isDefined(search.transactionNumber)) {
                body.transactionNumber = search.transactionNumber.input;
                body.transactionNumberList = safeSplit(search.transactionNumber.file, search.transactionNumber.type)
            }
        }

        /*TODO: Pagination*/
        $http.post('https://localhost:9443/papi/services/invoiceadmintool/invoicetransactions?startRowNum=0&endRowNum=10', body)
            .then(function(response){
                    vm.reprocessRequestData = response.data;
                },
                function(error){
                    console.log(error);
                    ngToast.create({
                        className: 'danger',
                        content: "Invoice reprocessRequest 'search' in error state : " + error,
                        verticalPosition: 'top',
                        dismissOnTimeout: false});
                })
    }

    var safeSplit = function (text, splitter) {
        if (angular.isDefined(text) && angular.isDefined(splitter)) {
            return text.split(splitter.id);
        } else {
            return null;
        }
    }

    vm.reprocessRequestSend = function(request, option) {
        var selectedItems = request.filter(function(item){return item.selected});
        var body = {
            "invoiceHeaderIdList" : selectedItems.map(function(item){return {"invoiceHeaderId":item.invoiceHeaderId, "invoiceTxNumber":item.transactionNumber, "receiverId":item.buyerId}}),
            "removeImg" : option.remove,
            "resendAtt" : option.resend,
            "writeToRIF" : option.writeToRIF,
            "writeImgToDB" : option.writeToDB,
            "sendImg" : option.send,
            "sendImgType" : option.sendType,
            "sendImgAddr" : option.sendInput
        }

        $http.post('https://localhost:9443/papi/services/invoiceadmintool/reprocessrequest', body)
            .then(function(response){
                    ngToast.create({
                        className: 'success',
                        content: "Invoice reprocessRequest 'send' success !",
                        verticalPosition: 'top',
                        dismissOnTimeout: false});
                },
                function(error){
                    ngToast.create({
                        className: 'danger',
                        content: "Invoice reprocessRequest 'send' in error state : " + error,
                        verticalPosition: 'top',
                        dismissOnTimeout: false});
                });
    }
}