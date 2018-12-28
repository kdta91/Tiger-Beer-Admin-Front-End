'use strict';

(function () {
    angular.module('app')
        .controller('WinController', ['$scope', '$state', 'UserSessionFactory', 'WinFactory', 'SiteFactory', 'PrizeFactory', 'win', '$uibModal', '$timeout', function ($scope, $state, UserSessionFactory, WinFactory, SiteFactory, PrizeFactory, win, $uibModal, $timeout) {
            // console.log(win);
            if (win.data) {
                if (win.data.wins) {
                    $scope.wins = win.data.wins;

                    $scope.openConfirmModal = function (size, winID, parentSelector) {
                        var modalInstance = $uibModal.open({
                            animation: false,
                            templateUrl: 'confirmModal.html',
                            size: size,
                            controller: 'ModalInstanceCtrl'
                        });

                        modalInstance.result
                            .then(function () {
                                deleteWin(winID);
                            }).catch(function () {
                                modalInstance.close();
                            });
                    };

                    var deleteWin = function (winID) {
                        // console.log('Delete Win: ' + winID);
                        WinFactory.deleteWin(winID)
                            .then(function (res) {
                                // console.log(res);
                                $scope.alertType = 'alert-success';
                                $scope.alertMessage = '<strong>Success!</strong>' + res.data.message;
                                $scope.closeAlert = function () {
                                    $scope.alertType = null;
                                };
                                $timeout(function () {
                                    $state.reload();
                                }, 3000);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    };

                    $scope.closeConfirmModal = function () {
                        $uibModal.dismiss('cancel');
                    };
                } else if (win.data.siteId) {
                    $scope.win = {
                        _id: win.data._id,
                        winSessionId: win.data.winSessionId,
                        site: win.data.siteId._id,
                        prize: win.data.sitePrizeId._id
                    };
                }

                if ($state.$current.name === 'win.add' || $state.$current.name === 'win.edit') {
                    SiteFactory.getSites()
                        .then(function (res) {
                            // console.log(res.data.sites);
                            $scope.sites = res.data.sites;
                        })
                        .catch(function (err) {
                            console.log(err);
                        })

                    PrizeFactory.getPrizes()
                        .then(function (res) {
                            // console.log(res.data.prizes);
                            $scope.prizes = res.data.prizes;
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                }

                $scope.addWin = function () {
                    // console.log($scope.win);
                    let winData = {
                        winSessionId: $scope.win.winSessionId,
                        siteId: $scope.win.site.siteID,
                        sitePrizeId: $scope.win.prize._id,
                    };

                    WinFactory.addWin(winData)
                        .then(function (res) {
                            // console.log(res);
                            $scope.alertType = 'alert-success';
                            $scope.alertMessage = '<strong>Success!</strong>' + res.data.message;
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        })
                        .catch(function (err) {
                            // console.log(err);
                            $scope.alertType = 'alert-danger';

                            if (err.data.error) {
                                if (err.data.error.code === 11000) {
                                    $scope.alertMessage = '<strong>Error!</strong> Duplicate Win.';
                                } else if (err.data.error.name === 'ValidationError') {
                                    $scope.alertMessage = '<strong>Error!</strong> All fields are required.';
                                }
                            }

                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        });
                };

                $scope.updateWin = function (winID) {
                    let winData = [{
                        'key': 'winSessionId',
                        'value': $scope.win.winSessionId
                    }, {
                        'key': 'siteId',
                        'value': $scope.win.site
                    }, {
                        'key': 'sitePrizeId',
                        'value': $scope.win.prize
                    }];

                    // console.log(winData);

                    WinFactory.updateWin(winID, winData)
                        .then(function (res) {
                            // console.log(res);
                            $scope.alertType = 'alert-success';
                            $scope.alertMessage = '<strong>Success!</strong>' + res.data.message;
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        })
                        .catch(function (err) {
                            // console.log(err);
                            $scope.alertType = 'alert-danger';

                            if (err.data.error) {
                                if (err.data.error.code === 11000) {
                                    $scope.alertMessage = '<strong>Error!</strong> Duplicate Prize Type.';
                                } else if (err.data.error.name === 'ValidationError') {
                                    $scope.alertMessage = '<strong>Error!</strong> All fields are required.';
                                }
                            }

                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        });
                };
            }
        }])
        .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
})();