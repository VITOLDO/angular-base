'use strict';

angular
    .module('myApp')
    .controller('RequestsCtrl', RequestsCtrl);

RequestsCtrl.$inject = ['$route', '$scope', '$http', 'ngToast', 'urls']

function RequestsCtrl($route, $scope, $http, ngToast, urls) {
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
        $http.post(urls.apiUrl + 'invoiceadmintool/invoicetransactions?startRowNum=0&endRowNum=10', body)
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

        $http.post(urls.apiUrl + 'invoiceadmintool/reprocessrequest', body)
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

    vm.cacheClean = function(client) {
        $http.delete(urls.apiUrl + 'invoiceadmintool/client/cache?clients=' + client)
            .then(function(response) {

            },
            function(error) {

            })
    }

    vm.updateRepeatingFileDelivery = function(search) {
        var body = {};
        if (angular.isDefined(search)) {
            body = {"filename" : search.fileName,
                "clientId": search.clientId,
                "clientName": search.clientName,
                "dateFrom": search.dateFrom,
                "dateTo": search.dateTo}
        }
        $http.post(urls.apiUrl + 'invoiceadmintool/invoiceoutputfileslist?startRowNum=1&endRowNum=10', body)
            .then(function(response){
                vm.repeatingFileDeliveryData = response.data;
            },function(error){
                ngToast.create({
                   className: 'danger',
                   content: "Invoice repeatingFileDelivery 'search' in error state : " + error,
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            })
    }
    vm.resendRepeatingFileDelivery = function(request) {
        var selectedItems = request.filter(function(item){return item.selected});
        var body = {
            "outputFiles" : selectedItems.map(function(item){return {"outputFileId":item.outputFileId, "outputFileName":item.outputFileName, "receiverId":item.receiverId}})
        }
        $http.post(urls.apiUrl + 'invoiceadmintool/invoiceoutputregeneration', body)
            .then(function(response){
                ngToast.create({
                   className: 'success',
                   content: "Invoice repeatingFileDelivery 'resend' returned success result",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            }, function(error){
                ngToast.create({
                   className: 'danger',
                   content: "Invoice repeatingFileDelivery 'resend' in error state",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            })
    }

    $http.get(urls.apiUrl + 'invoiceadmintool/invoicenotificationtypes')
        .then(function(response) {
            vm.notificationTypes = response.data;
        }, function(error) {
            ngToast.create({
               className: 'danger',
               content: "Invoice notification types couldn't be retrieved",
               verticalPosition: 'top',
               dismissOnTimeout: false});
        })

    vm.updateNotificationList = function(search) {
        var body = {}
        if (angular.isDefined(search)) {
            body = {"clientId" : search.senderId,
                "clientName": search.senderName,
                "notificationType": search.notificationType,
                "dateFrom": search.dateFrom,
                "dateTo": search.dateTo}
        }
        $http.post(urls.apiUrl + 'invoiceadmintool/invoicenotifications?startRowNum=1&endRowNum=25', body)
            .then(function(response){
                vm.notificationListData = response.data;
            }, function(error){
                ngToast.create({
                   className: 'danger',
                   content: "Invoice notification list is in error state",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            })
    }

    vm.notificationResend = function(request) {
        var selectedItems = request.filter(function(item){return item.selected});
        var body = {
            "notificationDeliveryIds" : selectedItems.map(function(item){return item.notificationDeliveryId})
        }
        $http.post(urls.apiUrl + 'invoiceadmintool/invoicenotificationsend', body)
            .then(function(response){
                ngToast.create({
                   className: 'success',
                   content: "Invoice notificationDelivery 'resend' returned success result",
                   verticalPosition: 'top',
                   dismissOnTimeout: true});
            }, function(error){
                ngToast.create({
                   className: 'danger',
                   content: "Invoice notificationDelivery 'resend' in error state",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            })
    }

    vm.updateDeleteInvoiceResult = function(search) {
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

        $http.post(urls.apiUrl + 'invoiceadmintool/invoicetransactions?startRowNum=1&endRowNum=10', body)
            .then(function(response){
                    vm.deleteInvoicesData = response.data;
                },
                function(error){
                    console.log(error);
                    ngToast.create({
                        className: 'danger',
                        content: "Invoice for deletion 'search' in error state : " + error,
                        verticalPosition: 'top',
                        dismissOnTimeout: false});
                })
    }

    vm.deleteInvoice = function(request) {
        var selectedItems = request.filter(function(item){return item.selected});
        var body = {
            "invoiceHeaderIdList" : selectedItems.map(function(item){return item.invoiceHeaderId})
        }
        $http.post(urls.apiUrl + 'invoiceadmintool/deleteinvoicetransactions', body)
            .then(function(response){
                ngToast.create({
                   className: 'success',
                   content: "Invoice deletion 'delete' returned success result",
                   verticalPosition: 'top',
                   dismissOnTimeout: true});
            }, function(error){
                ngToast.create({
                   className: 'danger',
                   content: "Invoice deletion 'delete' in error state",
                   verticalPosition: 'top',
                   dismissOnTimeout: false});
            })
    }
}