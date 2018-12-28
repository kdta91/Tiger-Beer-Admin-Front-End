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

    return UserFactory;
}]);