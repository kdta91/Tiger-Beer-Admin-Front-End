'use strict';

(function () {
    angular.module('app')
        .controller('AllocationController', ['$scope', '$state', 'UserSessionFactory', 'AllocationFactory', 'allocation', '$uibModal', '$timeout', function ($scope, $state, UserSessionFactory, AllocationFactory, allocation, $uibModal, $timeout) {
            console.log(allocation);
            if (allocation.data) {
                if (allocation.data.allocations) {
                    $scope.allocations = allocation.data.allocations;

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
                        console.log('Delete Allocation: ' + allocationID);
                        AllocationFactory.deleteAllocation(allocationID)
                            .then(function (res) {
                                console.log(res);
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
                } else if (allocation.data.prizeName) {
                    console.log(allocation.data);
                    console.log(allocation.data.prizeType);
                    $scope.prize = {
                        _id: allocation.data._id,
                        prizeType: allocation.data.prizeType,
                        prizeName: allocation.data.prizeName
                    };
                    console.log($scope.prize);
                }

                $scope.addAllocation = function () {
                    let prizeData = {
                        prizeType: $scope.allocation.prizeType,
                        prizeName: $scope.allocation.prizeName
                    };

                    AllocationFactory.addAllocation(prizeData)
                        .then(function (res) {
                            console.log(res);
                            $scope.alertType = 'alert-success';
                            $scope.alertMessage = '<strong>Success!</strong>' + res.data.message;
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        })
                        .catch(function (err) {
                            console.log(err);
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

                $scope.updatePrize = function (allocationID) {
                    let prizeData = [{
                        'key': 'prizeType',
                        'value': $scope.allocation.prizeType
                    }, {
                        'key': 'prizeName',
                        'value': $scope.allocation.prizeName
                    }];

                    AllocationFactory.updatePrize(allocationID, prizeData)
                        .then(function (res) {
                            console.log(res);
                            $scope.alertType = 'alert-success';
                            $scope.alertMessage = '<strong>Success!</strong>' + res.data.message;
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        })
                        .catch(function (err) {
                            console.log(err);
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