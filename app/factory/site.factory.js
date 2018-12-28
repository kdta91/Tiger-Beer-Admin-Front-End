'use strict';

angular.module('app').factory('SiteFactory', ['$http', 'apiEndpoint', function ($http, apiEndpoint) {
    var SiteFactory = {};

    SiteFactory.getSites = function () {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'site',
            cahce: true
        });
    };

    SiteFactory.getSite = function (siteID) {
        return $http({
            method: 'GET',
            url: apiEndpoint + 'site/' + siteID,
            cahce: true
        });
    };

    SiteFactory.addSite = function (data) {
        return $http({
            method: 'POST',
            url: apiEndpoint + 'site',
            data: data
        });
    };

    SiteFactory.updateSite = function (siteID, data) {
        return $http({
            method: 'PATCH',
            url: apiEndpoint + 'site/' + siteID,
            data: data
        });
    };

    SiteFactory.deleteSite = function (siteID) {
        return $http({
            method: 'DELETE',
            url: apiEndpoint + 'site/' + siteID
        });
    };

    return SiteFactory;
}]);