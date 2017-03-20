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
                .state('main', {
                    url: '',
                    templateUrl: 'modules/main/main.html',
                    controller: 'MainController as mainCtrl',
                    abstract: true
                });

        }]);
})();