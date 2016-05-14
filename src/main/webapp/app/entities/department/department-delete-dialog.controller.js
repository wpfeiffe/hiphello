(function() {
    'use strict';

    angular
        .module('hiphelloApp')
        .controller('DepartmentDeleteController',DepartmentDeleteController);

    DepartmentDeleteController.$inject = ['$uibModalInstance', 'entity', 'Department'];

    function DepartmentDeleteController($uibModalInstance, entity, Department) {
        var vm = this;
        vm.department = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Department.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
