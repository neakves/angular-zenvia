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
        .controller('MainController', ['$scope', '$sessionStorage', '$base64', 'toastr',
            function ($scope, $sessionStorage, $base64, toastr) {
                'use strict';

                $scope.account = null;
                $scope.password = null;

                $scope.setCredential = function () {
                    if($scope.account != null && $scope.password != null) {
                        $sessionStorage.credentials =
                            'Basic ' + $base64.encode($scope.account + ':' + $scope.password);

                        toastr.success('Credenciais definidas com sucesso !');

                        $scope.account = null;
                        $scope.password = null;
                    } else {
                        toastr.error('Usuario e/ou senha não informados !');
                    }
                };

            }]);
})();