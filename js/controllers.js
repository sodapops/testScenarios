'use strict';

function pageInit() {
    //console.log('web page inited');
    //var $scope = angular.element('body').scope();
    //$scope.init();
}

var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('TaskListCtrl', function ($scope, $http, $window) {
    $scope.doneTasks = [{"taskName": "Done task", "id": 0, "ipAddress": "139.126.195.116"}];
    $scope.showProductSelector = true;
    $scope.showTesterSelector = false;
    $scope.showTestMatrix = false;
    $scope.selectedProductName = '';
    $scope.selectedTesterName = '';

    $http({method: 'GET', url: 'apis/getTestData'}).
    success(function(data) {
        var index;
        $scope.productTestMatrix = data.productTestMatrix;
        $scope.productsToTest = new Array();
        for (index = 0; index < $scope.productTestMatrix.products.length; index++) {
            $scope.productsToTest[index] = {
                "productName": $scope.productTestMatrix.products[index].productName,
                "productRef": $scope.productTestMatrix.products[index]
            };
        }
    }).
    error(function(data) {
        console.log('get fail'); // shows in unit test too !!
    });

    $scope.selectedProduct = null;

    $scope.productTesters = [
        {"testerName": "Tim Jones"},
        {"testerName": "Jack Click"},
        {"testerName": "Jeff Engley"},
        {"testerName": "Sudhir Moolky"}
    ];
    $scope.headers = [
        {"headerName": "user1"},
        {"headerName": "admin1"},
        {"headerName": "french1"},
    ];
    $scope.actions = [
        {"actionName": "Available", "actionFn": "setAvailable", "actionClass": "info"},
        {"actionName": "In-Progress", "actionFn": "setInProgress", "actionClass": "danger"},
        {"actionName": "Complete", "actionFn": "setComplete", "actionClass": "success"}
    ];

    $scope.init = function() {
        var index, scenario, scenarios;
        console.log('init');
        scenarios = $scope.platforms[0].scenarios
        for (index = 0; index < scenarios.length; index++) {
            scenario = scenarios[index];
            console.log(scenario);
            $('#myProgress' + scenario.id).width(100*scenario.checkedTasks/scenario.totalTasks);
        }
    }

    $scope.btnStatusClicked = function(scenario, action) {
        var taskIndex;
        scenario.statusClass = action.actionClass;
        scenario.statusName = action.actionName;
        if (action.actionName == "Available") {
            scenario.testerName = '';
            $scope.selectedProduct.checkedTasks -= (scenario.checkedTasks);
            scenario.checkedTasks = 0;
            for (taskIndex = 0; taskIndex < scenario.tasks.length; taskIndex++) {
                scenario.tasks[taskIndex].selected = false;
            }
        }
        else {
            scenario.testerName = $scope.selectedTesterName;
        }
        if (action.actionName == "Complete") {
            $scope.selectedProduct.checkedTasks += (scenario.totalTasks - scenario.checkedTasks);
            scenario.checkedTasks = scenario.totalTasks;
            for (taskIndex = 0; taskIndex < scenario.tasks.length; taskIndex++) {
                scenario.tasks[taskIndex].selected = true;
            }
        }
    }

    $scope.btnProductSelected = function(productToTest) {
        $scope.selectedProductName = productToTest.productName;
        $scope.showTesterSelector = true;
        $scope.selectedProduct = productToTest.productRef;
        console.log($scope.selectedProduct);
    }

    $scope.btnTesterSelected = function(selectedTester) {
        $scope.selectedTesterName = selectedTester.testerName;
        $scope.showTestMatrix = true;
    }

    $scope.showTasks = function(platform, scenario) {
        var modalId;
        console.log(scenario);
        modalId = '#myModal_' + platform.platformId + '_' + scenario.scenarioId;
        console.log(modalId);
        $(modalId).modal({show: true});
    }

    $scope.taskChecked = function(scenario, task, checked) {
        var taskIndex, totalTasks, checkedTasks;
        scenario.testerName = $scope.selectedTesterName;
        if (task.selected) {
            scenario.checkedTasks -= 1;
            $scope.selectedProduct.checkedTasks -= 1;
            if (scenario.checkedTasks == 0) {
                scenario.statusClass = 'info';
                scenario.statusName = 'Available';
                scenario.testerName = '';
            }
            else {
                scenario.statusClass = 'danger';
                scenario.statusName = 'In-Progress';
            }
        }
        else {
            scenario.checkedTasks += 1;
            $scope.selectedProduct.checkedTasks += 1;
            if (scenario.checkedTasks == scenario.totalTasks) {
                scenario.statusClass = 'success';
                scenario.statusName = 'Complete';
            }
            else {
                scenario.statusClass = 'danger';
                scenario.statusName = 'In-Progress';
            }
        }
        //$('#myProgress' + scenario.id).width(100*scenario.checkedTasks/scenario.totalTasks);
    }
    /*
    $scope.init = function() {
            console.log('in init'); // shows in unit test too !!
        $http({method: 'GET', url: 'apis/todos'}).
        success(function(data) {
            $scope.toDoTasks = data.tasks;
            console.log('get success'); // shows in unit test too !!
        }).
        error(function(data) {
            console.log('get fail'); // shows in unit test too !!
        });
        $scope.taskOrder = 'id';
    }

    $scope.deleteToDo = function(id) {
            console.log('in deleteToDo'); // shows in unit test too !!
        $scope.doneTasks.splice(-1, 0, $scope.toDoTasks[id]);
        $scope.toDoTasks.splice(id,1);
    }
    $scope.addToDo = function(id) {
            console.log('in addToDo'); // shows in unit test too !!
        $scope.toDoTasks.splice(-1, 0, $scope.doneTasks[id]);
        $scope.doneTasks.splice(id,1);
    }
    */

    //$scope.init();

});