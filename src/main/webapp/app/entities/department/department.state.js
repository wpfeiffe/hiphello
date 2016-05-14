(function() {
    'use strict';

    angular
        .module('hiphelloApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('department', {
            parent: 'entity',
            url: '/department?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hiphelloApp.department.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departments.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('department');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('department-detail', {
            parent: 'entity',
            url: '/department/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'hiphelloApp.department.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/department-detail.html',
                    controller: 'DepartmentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('department');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Department', function($stateParams, Department) {
                    return Department.get({id : $stateParams.id});
                }]
            }
        })
        .state('department.new', {
            parent: 'department',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                deptCode: null,
                                deptName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: true });
                }, function() {
                    $state.go('department');
                });
            }]
        })
        .state('department.edit', {
            parent: 'department',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department.delete', {
            parent: 'department',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-delete-dialog.html',
                    controller: 'DepartmentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
