'use strict';

(function () {
    angular.module('app')
        .controller('AllocationController', ['$scope', '$state', 'UserSessionFactory', 'AllocationFactory', 'SiteFactory', 'PrizeFactory', 'allocation', '$uibModal', '$timeout', function ($scope, $state, UserSessionFactory, AllocationFactory, SiteFactory, PrizeFactory, allocation, $uibModal, $timeout) {
            // console.log(allocation);
            if (allocation.data) {
                if (allocation.data.sitePrizeAllocations) {
                    $scope.allocations = allocation.data.sitePrizeAllocations;

                    $scope.openConfirmModal = function (size, allocationID, parentSelector) {
                        var modalInstance = $uibModal.open({
                            animation: false,
                            templateUrl: 'confirmModal.html',
                            size: size,
                            controller: 'ModalInstanceCtrl'
                        });

                        modalInstance.result
                            .then(function () {
                                deleteAllocation(allocationID);
                            }).catch(function () {
                                modalInstance.close();
                            });
                    };

                    var deleteAllocation = function (allocationID) {
                        // console.log('Delete Allocation: ' + allocationID);
                        AllocationFactory.deleteAllocation(allocationID)
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
                } else if (allocation.data.siteId) {
                    $scope.allocation = {
                        _id: allocation.data._id,
                        prize: allocation.data.prizeId._id,
                        site: allocation.data.siteId._id,
                        quantityAllocated: allocation.data.quantityAllocated,
                        quantityLeft: allocation.data.quantityLeft,
                        odds: allocation.data.odds
                    };
                }

                if ($state.$current.name === 'allocation.add' || $state.$current.name === 'allocation.edit') {
                    SiteFactory.getSites()
                        .then(function (res) {
                            // console.log(res.data.sites);
                            $scope.sites = res.data.sites;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });

                    PrizeFactory.getPrizes()
                        .then(function (res) {
                            // console.log(res.data.prizes);
                            $scope.prizes = res.data.prizes;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                $scope.addAllocation = function () {
                    let allocationData = {
                        prizeId: $scope.allocation.prize._id,
                        siteId: $scope.allocation.site.siteID,
                        quantityAllocated: $scope.allocation.quantityAllocated,
                        quantityLeft: $scope.allocation.quantityLeft,
                        odds: $scope.allocation.odds
                    };

                    AllocationFactory.addAllocation(allocationData)
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
                                if (err.data.error.name === 'ValidationError') {
                                    $scope.alertMessage = '<strong>Error!</strong> All fields are required.';
                                }
                            }

                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        });
                };

                $scope.updateAllocation = function (allocationID) {
                    let allocationData = [{
                        'key': 'prizeId',
                        'value': $scope.allocation.prize
                    }, {
                        'key': 'siteId',
                        'value': $scope.allocation.site
                    }, {
                        'key': 'quantityAllocated',
                        'value': $scope.allocation.quantityAllocated
                    }, {
                        'key': 'quantityLeft',
                        'value': $scope.allocation.quantityLeft
                    }, {
                        'key': 'odds',
                        'value': $scope.allocation.odds
                    }];

                    AllocationFactory.updateAllocation(allocationID, allocationData)
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

                $scope.prevAlloc = function (allocationID) {
                    $scope.prevAllocDisabled = true;
                    AllocationFactory.getPrevAllocation(allocationID)
                        .then(function (res) {
                            // console.log(res);
                            if (res.data && !res.data.message) {
                                $scope.prevAllocDisabled = false;
                                $state.go($state.$current.name, {
                                    'allocationID': res.data._id
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                $scope.nextAlloc = function (allocationID) {
                    $scope.nextAllocDisabled = true;
                    AllocationFactory.getNextAllocation(allocationID)
                        .then(function (res) {
                            // console.log(res);]
                            if (res.data && !res.data.message) {
                                $scope.nextAllocDisabled = false;
                                $state.go($state.$current.name, {
                                    'allocationID': res.data._id
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
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