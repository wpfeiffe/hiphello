'use strict';

describe('Controller Tests', function() {

    describe('Employee Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockEmployee, MockDepartment;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockEmployee = jasmine.createSpy('MockEmployee');
            MockDepartment = jasmine.createSpy('MockDepartment');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Employee': MockEmployee,
                'Department': MockDepartment
            };
            createController = function() {
                $injector.get('$controller')("EmployeeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'hiphelloApp:employeeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
