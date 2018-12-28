'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngCookies',
    'ngSanitize'
]);

app.constant('apiEndpoint', 'http://localhost:3000/');

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');

    $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/view/login.html',
            controller: 'UserSessionController'
        })
        .state('user', {
            url: '/user',
            views: {
                '': {
                    templateUrl: 'app/view/user/user.html',
                    controller: 'UserController'
                },
                'header@user': {
                    templateUrl: 'app/view/partials/header.html',
                    controller: 'UserSessionController'
                }
            },
            resolve: {
                user: function (UserSessionFactory, $state) {
                    return authorizeUser(UserSessionFactory, $state);
                },
                GetUsers: function (UserFactory) {
                    return UserFactory.getUsers()
                        .then(function (res) {
                            return res;
                        })
                        .catch(function (err) {
                            return err;
                        });
                }
            }
        })
        .state('prize', {
            views: {
                '': {
                    templateUrl: 'app/view/prize/prize.html',
                },
                'header@prize': {
                    templateUrl: 'app/view/partials/header.html',
                    controller: 'UserSessionController'
                }
            },
            resolve: {
                user: function (UserSessionFactory, $state) {
                    return authorizeUser(UserSessionFactory, $state);
                },
                prize: function (PrizeFactory) {
                    return PrizeFactory.getPrizes()
                        .then(function (res) {
                            return res;
                        })
                        .catch(function (err) {
                            return err;
                        });
                }
            }
        })
        .state('prize.list', {
            url: '/prize',
            templateUrl: 'app/view/prize/prize.list.html',
            controller: 'PrizeController'
        })
        .state('prize.add', {
            url: '/prize/add',
            templateUrl: 'app/view/prize/prize.add.html',
            controller: 'PrizeController'
        })
        .state('prize.edit', {
            url: '/prize/:prizeID',
            templateUrl: 'app/view/prize/prize.edit.html',
            controller: 'PrizeController',
            resolve: {
                prize: function (PrizeFactory, $stateParams) {
                    return PrizeFactory.getPrize($stateParams.prizeID)
                        .then(function (res) {
                            return res;
                        })
                        .catch(function (err) {
                            return err;
                        });
                }
            }
        })
        .state('site', {
            views: {
                '': {
                    templateUrl: 'app/view/site/site.html'
                },
                'header@site': {
                    templateUrl: 'app/view/partials/header.html',
                    controller: 'UserSessionController'
                }
            },
            resolve: {
                user: function (UserSessionFactory, $state) {
                    return authorizeUser(UserSessionFactory, $state);
                },
                site: function (SiteFactory) {
                    return SiteFactory.getSites()
                        .then(function (res) {
                            return res;
                        })
                        .catch(function (err) {
                            return err;
                        });
                }
            }
        })
        .state('site.list', {
            url: '/site',
            templateUrl: 'app/view/site/site.list.html',
            controller: 'SiteController'
        })
        .state('site.add', {
            url: '/site/add',
            templateUrl: 'app/view/site/site.add.html',
            controller: 'SiteController'
        })
        .state('site.edit', {
            url: '/site/:siteID',
            templateUrl: 'app/view/site/site.edit.html',
            controller: 'SiteController',
            resolve: {
                site: function(SiteFactory, $stateParams) {
                    return SiteFactory.getSite($stateParams.siteID)
                        .then(function (res) {
                            return res;
                        })
                        .catch(function (err) {
                            return err;
                        });
                }
            }
        })
        .state('allocation', {
            views: {
                '': {
                    templateUrl: 'app/view/allocation/allocation.html',
                },
                'header@allocation': {
                    templateUrl: 'app/view/partials/header.html',
                }
            },
            resolve: {
                user: function (UserSessionFactory, $state) {
                    return authorizeUser(UserSessionFactory, $state);
                }
            }
        })
        .state('allocation.list', {
            url: '/allocation',
            templateUrl: 'app/view/allocation/allocation.list.html',
            controller: 'AllocationController'
        })
        .state('win', {
            url: '/win',
            views: {
                '': {
                    templateUrl: 'app/view/win/win.html',
                },
                'header@win': {
                    templateUrl: 'app/view/partials/header.html',
                }
            },
            resolve: {
                user: function (UserSessionFactory, $state) {
                    return authorizeUser(UserSessionFactory, $state);
                }
            }
        });
});

function authorizeUser(UserSessionFactory, $state) {
    return (UserSessionFactory.isLoggedIn()) ? true : $state.go('login');
}

app.run(['$rootScope', 'UserSessionFactory', '$state', '$transitions', function ($rootScope, UserSessionFactory, $state, $transitions) {
    $transitions.onSuccess({}, function (transition) {
        console.log(
            "Successful Transition from " + transition.from().name +
            " to " + transition.to().name
        );

        $rootScope.previousState = transition.from().name;
    });

    $rootScope.back = function() {
        $state.go($rootScope.previousState);
    };
}]);