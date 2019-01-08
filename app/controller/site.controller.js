'use strict';

(function () {
    angular.module('app')
        .controller('SiteController', ['$scope', '$state', 'UserSessionFactory', 'SiteFactory', 'site', '$uibModal', '$timeout', function ($scope, $state, UserSessionFactory, SiteFactory, site, $uibModal, $timeout) {
            // console.log(site.data);
            if (site.data) {
                if (site.data.sites) {
                    $scope.sites = site.data.sites;

                    $scope.openConfirmModal = function (size, siteID, parentSelector) {
                        var modalInstance = $uibModal.open({
                            animation: false,
                            templateUrl: 'confirmModal.html',
                            size: size,
                            controller: 'ModalInstanceCtrl'
                        });

                        modalInstance.result
                            .then(function () {
                                deleteSite(siteID);
                            }).catch(function () {
                                modalInstance.close();
                            });
                    };

                    var deleteSite = function (siteID) {
                        console.log('Delete Site: ' + siteID);
                        SiteFactory.deleteSite(siteID)
                            .then(function (res) {
                                $scope.alertType = 'alert-success';
                                $scope.alertMessage = '<strong>Success!</strong> Site has been successfully deleted.';
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
                } else if (site.data.siteName) {
                    $scope.site = {
                        _id: site.data._id,
                        siteName: site.data.siteName,
                        geofenceLatLong: site.data.geofenceLatLong,
                        startDate: new Date(site.data.siteStartDate),
                        endDate: new Date(site.data.siteEndDate)
                    };
                }

                $scope.format = 'dd MMM yyyy';

                $scope.addSite = function () {
                    let siteData = {
                        siteName: $scope.site.siteName,
                        geofenceLatLong: $scope.site.geofenceLatLong,
                        siteStartDate: new Date($scope.site.siteStartDate),
                        siteEndDate: new Date($scope.site.siteEndDate)
                    };

                    SiteFactory.addSite(siteData)
                        .then(function (res) {
                            // console.log(res);
                            switch (res.data.code) {
                                case 'Exists':
                                    $scope.alertType = 'alert-danger';
                                    break;
                                case 'Success':
                                    $scope.alertType = 'alert-success';
                                    break;
                                default:
                                    $scope.alertType = 'alert-success';
                                    break;
                            }

                            $scope.alertMessage = '<strong>Success!</strong>' + res.data.message;
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        })
                        .catch(function (err) {
                            console.log(err);
                            $scope.alertType = 'alert-danger';
                            $scope.alertMessage = '<strong>Error!</strong> All fields are required.';
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        });
                };

                $scope.updateSite = function (siteID) {
                    let siteData = [{
                            'key': 'siteName',
                            'value': $scope.site.siteName
                        },
                        {
                            'key': 'geofenceLatLong',
                            'value': $scope.site.geofenceLatLong
                        },
                        {
                            'key': 'siteStartDate',
                            'value': $scope.site.startDate
                        },
                        {
                            'key': 'siteEndDate',
                            'value': $scope.site.endDate
                        }
                    ];

                    SiteFactory.updateSite(siteID, siteData)
                        .then(function (res) {
                            $scope.alertType = 'alert-success';
                            $scope.alertMessage = '<strong>Success!</strong> Site has been successfully updated.';
                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        })
                        .catch(function (err) {
                            console.log(err);
                            $scope.alertType = 'alert-danger';

                            if (err.data.error) {
                                if (err.data.error.code === 11000) {
                                    $scope.alertMessage = '<strong>Error!</strong> Duplicate Site.';
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