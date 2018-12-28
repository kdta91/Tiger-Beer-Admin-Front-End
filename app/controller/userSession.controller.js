'use strict';

(function () {
    angular.module('app')
        .controller('UserSessionController', ['$scope', '$state', 'UserSessionFactory', function ($scope, $state, UserSessionFactory) {
            $scope.isNavCollapsed = true;

            $scope.login = function (user) {
                UserSessionFactory.login(user)
                    .then(function (res) {
                        console.log(res);
                        UserSessionFactory.setUserData(res.data);
                        $state.go('user');
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };

            $scope.logout = function () {
                UserSessionFactory.logout();
                $state.go('login');
            };

            $scope.userData = UserSessionFactory.getUserData();
        }]);
})();