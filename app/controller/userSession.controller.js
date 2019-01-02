'use strict';

(function () {
    angular.module('app')
        .controller('UserSessionController', ['$scope', '$state', 'UserSessionFactory', function ($scope, $state, UserSessionFactory) {
            $scope.isNavCollapsed = true;

            $scope.login = function (user) {
                console.log(user);
                UserSessionFactory.login(user)
                    .then(function (res) {
                        console.log(res);
                        UserSessionFactory.setUserData(res.data);
                        $state.go('user.list');
                    })
                    .catch(function (err) {
                        console.log(err);

                        if (err) {
                            $scope.alertType = 'alert-danger';
                            $scope.alertMessage = '<strong>Error!</strong> ' + err.data.message;
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        }
                    });
            };

            $scope.logout = function () {
                UserSessionFactory.logout();
                $state.go('login');
            };

            $scope.userData = UserSessionFactory.getUserData();
        }]);
})();