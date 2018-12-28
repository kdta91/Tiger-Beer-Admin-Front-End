'use strict';

(function () {
    angular.module('app')
        .controller('PrizeController', ['$scope', '$state', 'UserSessionFactory', 'PrizeFactory', 'prize', '$uibModal', '$timeout', function ($scope, $state, UserSessionFactory, PrizeFactory, prize, $uibModal, $timeout) {
            // console.log(prize);
            if (prize.data) {
                if (prize.data.prizes) {
                    $scope.prizes = prize.data.prizes;

                    $scope.openConfirmModal = function (size, prizeID, parentSelector) {
                        var modalInstance = $uibModal.open({
                            animation: false,
                            templateUrl: 'confirmModal.html',
                            size: size,
                            controller: 'ModalInstanceCtrl'
                        });

                        modalInstance.result
                            .then(function () {
                                deletePrize(prizeID);
                            }).catch(function () {
                                modalInstance.close();
                            });
                    };

                    var deletePrize = function (prizeID) {
                        // console.log('Delete Prize: ' + prizeID);
                        PrizeFactory.deletePrize(prizeID)
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
                } else if (prize.data.prizeName) {
                    $scope.prize = {
                        _id: prize.data._id,
                        prizeType: prize.data.prizeType,
                        prizeName: prize.data.prizeName
                    };
                }

                $scope.addPrize = function () {
                    let prizeData = {
                        prizeType: $scope.prize.prizeType,
                        prizeName: $scope.prize.prizeName
                    };

                    PrizeFactory.addPrize(prizeData)
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

                $scope.updatePrize = function (prizeID) {
                    let prizeData = [{
                            'key': 'prizeType',
                            'value': $scope.prize.prizeType
                        }, {
                            'key': 'prizeName',
                            'value': $scope.prize.prizeName
                        }
                    ];

                    PrizeFactory.updatePrize(prizeID, prizeData)
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