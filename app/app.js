// ==================================
// AUTHOR: Evandro Lira de Souza
// EMAIL: evandro.lira.souza@gmail.com
// ===================================
// Change History:
//
//====================================
(function () {
    angular
        .module('smsApp', ['ui.router', 'toastr', 'base64', 'ngStorage'])
        .config(['$urlRouterProvider', function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/zenvia/sendSms');
        }])
        .constant('env', window.__env);

})()