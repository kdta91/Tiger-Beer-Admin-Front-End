'use strict';

angular.module('app').service('SessionService', ['$cookies', function ($cookies) {
    var Session = {};

    Session.put = function (key, value) {
        $cookies.put(key, value);
    };

    Session.get = function (key) {
        return $cookies.get(key);
    };

    Session.delete = function (key) {
        $cookies.remove(key);
    };

    return Session;
}]);