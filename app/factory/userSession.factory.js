'use strict';

angular.module('app').factory('UserSessionFactory', ['SessionService', '$http', 'apiEndpoint', function (SessionService, $http, apiEndpoint) {
    var UserSessionFactory = {};

    UserSessionFactory.login = function (data) {
        return $http({
            method: 'POST',
            url: apiEndpoint + 'user/login',
            data: data
        });
    };

    UserSessionFactory.logout = function () {
        SessionService.delete('token');
        SessionService.delete('username');
        SessionService.delete('email');
        SessionService.delete('userType');
    };

    UserSessionFactory.setUserData = function(data) {
        SessionService.put('token', data.token);
        SessionService.put('username', data.user.username);
        SessionService.put('email', data.user.email);
        SessionService.put('userType', data.user.userType);
    };

    UserSessionFactory.isLoggedIn = function(data) {
        return (SessionService.get('token')) ? true : false;
    };

    UserSessionFactory.getUserData = function () {
        return {
            'token': SessionService.get('token'),
            'username': SessionService.get('username'),
            'email': SessionService.get('email'),
            'userType': SessionService.get('userType')
        };
    };

    return UserSessionFactory;
}]);