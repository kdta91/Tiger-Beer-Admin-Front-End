'use strict';

(function () {
    angular.module('app')
        .controller('UserController', ['$scope', '$state', 'UserSessionFactory', 'UserFactory', 'UserTypeFactory', 'users', '$uibModal', '$timeout', function ($scope, $state, UserSessionFactory, UserFactory, UserTypeFactory, users, $uibModal, $timeout) {
            // console.log(users);
            if (users.data) {
                if (users.data.users) {
                    $scope.users = users.data.users;

                    $scope.openConfirmModal = function (size, userID, parentSelector) {
                        var modalInstance = $uibModal.open({
                            animation: false,
                            templateUrl: 'confirmModal.html',
                            size: size,
                            controller: 'ModalInstanceCtrl'
                        });

                        modalInstance.result
                            .then(function () {
                                deleteUser(userID);
                            }).catch(function () {
                                modalInstance.close();
                            });
                    };

                    var deleteUser = function (userID) {
                        // console.log('Delete Prize: ' + userID);
                        UserFactory.deleteUser(userID)
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
                } else if (users.data._id) {
                    $scope.user = {
                        _id: users.data._id,
                        userType: users.data.userType._id,
                        username: users.data.username,
                        email: users.data.email,
                        password: users.data.password
                    };
                }

                if ($state.$current.name === 'user.add' || $state.$current.name === 'user.edit') {
                    UserTypeFactory.getUserTypes()
                        .then(function (res) {
                            // console.log(res);
                            $scope.userTypes = res.data.userTypes;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                $scope.addUser = function () {
                    let userData = {
                        userType: $scope.user.userType,
                        username: $scope.user.username,
                        email: $scope.user.email,
                        password: $scope.user.password
                    };

                    // console.log(userData);

                    UserFactory.addUser(userData)
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
                                    $scope.alertMessage = '<strong>Error!</strong> Duplicate User.';
                                } else if (err.data.error.name === 'ValidationError') {
                                    $scope.alertMessage = '<strong>Error!</strong> All fields are required.';
                                }
                            }

                            $scope.closeAlert = function () {
                                $scope.alertType = null;
                            };
                        });
                };

                $scope.updateUser = function (userID) {
                    let userData = [{
                        'key': 'userType',
                        'value': $scope.user.userType
                    }, {
                        'key': 'username',
                        'value': $scope.user.username
                    }, {
                        'key': 'email',
                        'value': $scope.user.email
                    }, {
                        'key': 'password',
                        'value': $scope.user.password
                    }];

                    UserFactory.updateUser(userID, userData)
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