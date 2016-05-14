(function() {
    'use strict';

    angular
        .module('hiphelloApp')
        .controller('EmployeeDetailController', EmployeeDetailController);

    EmployeeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Employee', 'Department'];

    function EmployeeDetailController($scope, $rootScope, $stateParams, entity, Employee, Department) {
        var vm = this;
        vm.employee = entity;
        
        var unsubscribe = $rootScope.$on('hiphelloApp:employeeUpdate', function(event, result) {
            vm.employee = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
