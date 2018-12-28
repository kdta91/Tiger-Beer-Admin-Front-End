'use strict';

angular.module('app').factory('AllocationFactory', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {
    var AllocationFactory = {};

    AllocationFactory.getAllocations = function () {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'site-prize-allocation',
            cahce: true
        });
    };

    AllocationFactory.getAllocation = function (allocationID) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'site-prize-allocation/' + allocationID,
            cahce: true
        });
    };

    AllocationFactory.addAllocation = function (data) {
        return $http({
            method: 'POST',
            url: apiEndpoint + 'site-prize-allocation',
            data: data
        });
    };

    AllocationFactory.updateAllocation = function (allocationID, data) {
        return $http({
            method: 'PATCH',
            url: apiEndpoint + 'site-prize-allocation/' + allocationID,
            data: data
        });
    };

    AllocationFactory.deleteAllocation = function (allocationID) {
        return $http({
            method: 'DELETE',
            url: apiEndpoint + 'site-prize-allocation/' + allocationID
        });
    };

    return AllocationFactory;
}]);