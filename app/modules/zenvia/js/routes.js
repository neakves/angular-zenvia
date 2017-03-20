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
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider
                .state('main.sendSms', {
                    url: '/zenvia/sendSms',
                    templateUrl: 'modules/zenvia/html/sendSms.html',
                    controller: 'ZenviaController as zenviaCtrl'
                })
                .state('main.sendMultipleSms', {
                    url: '/zenvia/sendMultipleSms',
                    templateUrl: 'modules/zenvia/html/sendMultipleSms.html',
                    controller: 'ZenviaController as zenviaCtrl'
                })
                .state('main.cancelSms', {
                    url: '/zenvia/cancelSms',
                    templateUrl: 'modules/zenvia/html/cancelSms.html',
                    controller: 'ZenviaController as zenviaCtrl'
                })
                .state('main.listUnreadMessages', {
                    url: '/zenvia/listUnreadMessages',
                    templateUrl: 'modules/zenvia/html/listUnreadMessages.html',
                    controller: 'ZenviaController as zenviaCtrl'
                })
                .state('main.getSmsStatus', {
                    url: '/zenvia/getSmsStatus',
                    templateUrl: 'modules/zenvia/html/getSmsStatus.html',
                    controller: 'ZenviaController as zenviaCtrl'
                })
                .state('main.searchReceivedMessages', {
                    url: '/zenvia/searchReceivedMessages',
                    templateUrl: 'modules/zenvia/html/searchReceivedMessages.html',
                    controller: 'ZenviaController as zenviaCtrl'
                });
        }]);
})();