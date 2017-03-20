// ==================================
// AUTHOR: Evandro Lira de Souza
// EMAIL: evandro.lira.souza@gmail.com
// ===================================
// Change History:
//
//====================================
(function () {
    angular
        .module('smsApp')
        .controller('ZenviaController',
            ['$scope', '$filter', 'toastr', '$sessionStorage', 'ZenviaService',
            function ($scope, $filter, toastr, $sessionStorage, ZenviaService) {
                'use strict';

                //Send SMS
                $scope.msg = null;
                $scope.from = null;
                $scope.mobile = null;
                $scope.messageId = null;
                $scope.aggregateId = null;
                $scope.callbackOption = 'ALL';

                var oneMinutesLater = new Date();
                oneMinutesLater.setMinutes(oneMinutesLater.getMinutes() +1);
                $scope.schedule = oneMinutesLater;

                $scope.sendSms = function () {
                    if(hasCredentials()) {
                        let sms = new Message();

                        sms.msg = $scope.msg;
                        sms.from = $scope.from;
                        sms.to = $scope.mobile;
                        sms.id = $scope.messageId;
                        sms.aggregateId = $scope.aggregateId;
                        sms.callbackOption = $scope.callbackOption;
                        sms.schedule = $filter('date')($scope.schedule, 'yyyy-MM-dd');

                        let request = {};
                        request.sendSmsRequest = sms;

                        ZenviaService
                            .sendSms(request)
                            .then(function (promise) {
                                if(promise && promise.data) {
                                    toastr.success(JSON.stringify(promise.data));
                                }
                            });
                    }
                };

                //Send Multiple SMS
                $scope.aggregateId = null;
                $scope.layout = 'A';
                $scope.list = null;

                $scope.sendMultipleSms = function () {
                    if(hasCredentials()) {
                        let sms = new Message();
                        sms.aggregateId = $scope.aggregateId;
                        sms.layout = $scope.layout;
                        sms.list = $scope.list;

                        let request = {};
                        request.sendSmsMultiRequest = buildMultipleSms(sms);

                        ZenviaService
                            .sendMultipleSms(request)
                            .then(function (promise) {
                                if(promise && promise.status === 200) {
                                    toastr.success(JSON.stringify(promise.data));
                                } else {
                                    toastr.error(JSON.stringify(promise.data));
                                }
                            });
                    }
                };

                function buildMultipleSms(sms) {
                    let sendSmsMultiRequest = {};
                    let sendSmsRequestList = [];

                    let lines = sms.list.split('\n');

                    lines.forEach(function(element) {
                        let fields = element.split(';');

                        if(fields != '') {
                            let filed = {};
                            switch (sms.layout) {
                                case 'A':
                                    filed.to = fields[0];
                                    filed.msg = fields[1];
                                    sendSmsRequestList.push(filed);
                                    break;
                                case 'B':
                                    filed.to = fields[0];
                                    filed.msg = fields[1];
                                    filed.from = fields[2];
                                    sendSmsRequestList.push(filed);
                                    break;
                                case 'C':
                                    filed.to = fields[0];
                                    filed.msg = fields[1];
                                    filed.id = fields[2];
                                    sendSmsRequestList.push(filed);
                                    break;
                                case 'D':
                                    filed.to = fields[0];
                                    filed.msg = fields[1];
                                    filed.id = fields[2];
                                    filed.from = fields[3];
                                    sendSmsRequestList.push(filed);
                                    break;
                                case 'E':
                                    filed.to = fields[0];
                                    filed.msg = fields[1];
                                    filed.id = fields[2];
                                    filed.from = fields[3];
                                    filed.schedule = fields[4];
                                    sendSmsRequestList.push(filed);
                                    break;
                            }
                        }
                    });

                    sendSmsMultiRequest.aggregateId = sms.aggregateId;
                    sendSmsMultiRequest.sendSmsRequestList = sendSmsRequestList;

                    return sendSmsMultiRequest;

                };

                //Get SMS
                $scope.msgResponse = null;

                $scope.getSmsStatus = function () {
                    if(hasCredentials()) {
                        let sms = new Message();
                        sms.messageId = $scope.messageId;

                        ZenviaService
                            .getSmsStatus(sms)
                            .then(function (promise) {
                                if(promise && promise.status === 200) {
                                    toastr.success(JSON.stringify(promise.data));
                                    $scope.msgResponse = JSON.stringify(promise.data);
                                } else {
                                    toastr.error(JSON.stringify(promise.data));
                                    $scope.msgResponse = JSON.stringify(promise.data);
                                }
                            });
                    }
                };

                //List Unread Sms
                $scope.unredMsg = null;

                $scope.listUnreadMessages = function () {
                    if(hasCredentials()) {
                        ZenviaService
                            .listUnreadMessages()
                            .then(function (promise) {
                                if(promise && promise.status === 200) {
                                    toastr.success(JSON.stringify(promise.data));
                                    $scope.unredMsg = JSON.stringify(promise.data);
                                } else {
                                    toastr.error(JSON.stringify(promise.data));
                                    $scope.unredMsg = JSON.stringify(promise.data);
                                }
                            });
                    }
                };

                //Advanced Search
                var currentDate = new Date();
                var nextDate = new Date();
                $scope.startPeriod = currentDate;
                nextDate.setHours(currentDate.getHours() + 24);
                $scope.endPeriod = nextDate;

                $scope.msgListResponse = null;

                $scope.searchReceivedMessages = function () {
                    if(hasCredentials()) {
                        let sms = new Message();
                        sms.startPeriod = $filter('date')($scope.startPeriod, 'yyyy-MM-ddTHH:mm:ss');
                        sms.endPeriod = $filter('date')($scope.endPeriod, 'yyyy-MM-ddTHH:mm:ss');
                        sms.messageId = $scope.messageId;
                        sms.mobile = $scope.mobile;

                        ZenviaService
                            .searchReceivedMessages(sms)
                            .then(function (promise) {
                                if(promise && promise.status === 200) {
                                    toastr.success(JSON.stringify(promise.data));
                                    $scope.msgListResponse = JSON.stringify(promise.data);
                                } else {
                                    toastr.error(JSON.stringify(promise.data));
                                    $scope.msgListResponse = JSON.stringify(promise.data);
                                }
                            });
                    }
                };

                //Message cancel
                $scope.cancelSms = function () {
                    if(hasCredentials()) {
                        let sms = new Message();
                        sms.messageId = $scope.messageId;

                        ZenviaService
                            .cancelSms(sms)
                            .then(function (promise) {
                                if(promise && promise.status === 200) {
                                    toastr.success(JSON.stringify(promise.data));
                                } else {
                                    toastr.error(JSON.stringify(promise.data));
                                }
                            });
                    }
                };

                $scope.clean = function () {
                    $scope.unredMsg = null;

                    $scope.msgListResponse = null;

                    $scope.msgResponse = null;

                    $scope.aggregateId = null;
                    $scope.layout = 'A';
                    $scope.list = null;

                    $scope.msg = null;
                    $scope.from = null;
                    $scope.mobile = null;
                    $scope.messageId = null;
                    $scope.aggregateId = null;
                    $scope.callbackOption = null;
                };

                function hasCredentials () {
                    if(typeof $sessionStorage.credentials === 'undefined') {
                        toastr.error('Credenciais não definidas !');
                        return false;
                    } else {
                        return true;
                    }
                };

            }]);
})();