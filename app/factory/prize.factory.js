'use strict';

angular.module('app').factory('PrizeFactory', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {
    var PrizeFactory = {};

    PrizeFactory.getPrizes = function () {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'prize',
            cahce: true
        });
    };

    PrizeFactory.getPrize = function (prizeID) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'prize/' + prizeID,
            cahce: true
        });
    };

    PrizeFactory.addPrize = function (data) {
        return $http({
            method: 'POST',
            url: apiEndpoint + 'prize',
            data: data
        });
    };

    PrizeFactory.updatePrize = function (prizeID, data) {
        return $http({
            method: 'PATCH',
            url: apiEndpoint + 'prize/' + prizeID,
            data: data
        });
    };

    PrizeFactory.deletePrize = function (prizeID) {
        return $http({
            method: 'DELETE',
            url: apiEndpoint + 'prize/' + prizeID
        });
    };

    return PrizeFactory;
}]);