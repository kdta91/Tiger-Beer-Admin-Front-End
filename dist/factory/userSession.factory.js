'use strict';

angular.module('app').factory('UserSessionFactory', ['$http', function($http) {
    var UserSessionFactory = {};

    UserSessionFactory.login = function() {
        return $http({
            method: 'POST',
            url: apiEndpoint + '/members/' + member_id + '/animation_clip',
            // url: apiEndpoint+'/members/WVDEGOAn/animation_clip',
            data: data,
            headers: $auth.retrieveData('auth_headers')
        });
    };

    UserSessionFactory.logout = function () {
        return 'LOGOUT!';
    };

    return UserSessionFactory;
}]);