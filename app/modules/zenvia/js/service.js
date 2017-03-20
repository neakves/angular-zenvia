// ==================================
// AUTHOR: Evandro Lira de Souza
// EMAIL: evandro.lira.souza@gmail.com
// ===================================
// Change History:
//
//====================================
(function(){
    angular
        .module('smsApp')
        .service('ZenviaService', ['$http', '$sessionStorage', 'env',
            function($http, $sessionStorage, env) {
                'use strict';
                return {
                    sendSms: function(message){
                        var promise = $http({
                            method: 'POST',
                            url: env.zenviaUrl + '/send-sms',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': $sessionStorage.credentials
                            },
                            data: message
                        }).then(function successCallback(response) {
                            return response;
                        }, function errorCallback(response) {
                            return response;
                        });
                        return promise;
                    },
                    sendMultipleSms: function(message){
                        var promise = $http({
                            method: 'POST',
                            url: env.zenviaUrl + '/send-sms-multiple',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': $sessionStorage.credentials
                            },
                            data: message
                        }).then(function successCallback(response) {
                            return response;
                        }, function errorCallback(response) {
                            return response;
                        });
                        return promise;
                    },
                    getSmsStatus : function(message){
                        var promise = $http({
                            method: 'GET',
                            url: env.zenviaUrl + '/get-sms-status/' +  message.messageId,
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': $sessionStorage.credentials
                            }
                        }).then(function successCallback(response) {
                            return response;
                        }, function errorCallback(response) {
                            return response;
                        });
                        return promise;
                    },
                    listUnreadMessages: function(){
                        var promise = $http({
                            method: 'POST',
                            url: env.zenviaUrl + '/received/list',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': $sessionStorage.credentials
                            },
                            data: undefined
                        }).then(function successCallback(response) {
                            return response;
                        }, function errorCallback(response) {
                            return response;
                        });
                        return promise;
                    },
                    searchReceivedMessages: function(message){
                        var newUrl = '/received/search/';

                        if(message.startPeriod != null && message.startPeriod != '' &&
                            message.endPeriod != null && message.endPeriod != ''){
                            newUrl = newUrl + message.startPeriod + '/' + message.endPeriod;

                            if(message.mobile != null && message.mobile != ''){
                                newUrl = newUrl + '?mobile=' + message.mobile;
                                if(message.messageId != null && message.messageId != ''){
                                    newUrl = newUrl + '&mtId=' + message.messageId;
                                }
                            }
                            else if(message.messageId != null && message.messageId != ''){
                                newUrl = newUrl + '?mtId=' + message.messageId;
                            }
                        };

                        var promise = $http({
                            method: 'GET',
                            url: env.zenviaUrl + newUrl,
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': $sessionStorage.credentials
                            }
                        }).then(function successCallback(response) {
                            return response;
                        }, function errorCallback(response) {
                            return response;
                        });
                        return promise;
                    },
                    cancelSms: function(message){
                        alert(env.zenviaUrl + '/cancel-sms/' +  message.messageId);
                        var promise = $http({
                            method: 'POST',
                            url: env.zenviaUrl + '/cancel-sms/' +  message.messageId,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': $sessionStorage.credentials
                            },
                            data: undefined
                        }).then(function successCallback(response) {
                            return response;
                        }, function errorCallback(response) {
                            return response;
                        });
                        return promise;
                    }
                }
            }]);
})();
