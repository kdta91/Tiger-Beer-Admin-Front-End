'use strict';

(function () {
    angular.module('app')
        .controller('UserController', ['$scope', '$state', 'UserSessionFactory', 'UserFactory', 'GetUsers', function ($scope, $state, UserSessionFactory, UserFactory, GetUsers) {
            $scope.isNavCollapsed = true;

            $scope.users = GetUsers.data.users;
        }]);
})();