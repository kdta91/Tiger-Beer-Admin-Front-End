'use strict';

angular.module('app').factory('UserFactory', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {
    var UserFactory = {};

    UserFactory.getUsers = function (data) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'user',
            data: data,
            cahce: true
        });
    };

    UserFactory.getUser = function (userID) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'user/' + userID,
            cahce: true
        });
    };

    UserFactory.addUser = function (data) {
        return $http({
            method: 'POST',
            url: apiEndpoint + 'user',
            data: data
        });
    };

    UserFactory.updateUser = function (userID, data) {
        return $http({
            method: 'PATCH',
            url: apiEndpoint + 'user/' + userID,
            data: data
        });
    };

    UserFactory.deleteUser = function (userID) {
        return $http({
            method: 'DELETE',
            url: apiEndpoint + 'user/' + userID
        });
    };

    return UserFactory;
}]);