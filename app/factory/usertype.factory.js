'use strict';

angular.module('app').factory('UserTypeFactory', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {
    var UserTypeFactory = {};

    UserTypeFactory.getUserTypes = function (data) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'user-type',
            data: data,
            cahce: true
        });
    };

    return UserTypeFactory;
}]);