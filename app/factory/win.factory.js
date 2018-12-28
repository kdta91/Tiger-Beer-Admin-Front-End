'use strict';

angular.module('app').factory('WinFactory', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {
    var WinFactory = {};

    WinFactory.getWins = function () {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'win',
            cahce: true
        });
    };

    WinFactory.getWin = function (winID) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'win/' + winID,
            cahce: true
        });
    };

    WinFactory.addWin = function (data) {
        return $http({
            method: 'POST',
            url: apiEndpoint + 'win',
            data: data
        });
    };

    WinFactory.updateWin = function (winID, data) {
        return $http({
            method: 'PATCH',
            url: apiEndpoint + 'win/' + winID,
            data: data
        });
    };

    WinFactory.deleteWin = function (winID) {
        return $http({
            method: 'DELETE',
            url: apiEndpoint + 'win/' + winID
        });
    };

    return WinFactory;
}]);