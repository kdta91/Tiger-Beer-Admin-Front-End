'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/view/home.html',
        controller: 'UserController'
    })
});