'use strict';

var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('TaskListCtrl', function ($scope, $http, $window) {
    $scope.doneTasks = [{"taskName": "Done task", "id": 0, "ipAddress": "139.126.195.116"}];
    $scope.headers = [
        {"headerName": "user1"},
        {"headerName": "admin1"},
        {"headerName": "french1"},
    ];
    $scope.platforms = [
        {
            "id": 0,
            "ipAddress": "139.126.195.116",
            "platformName": "Win7 - IE9",
            "scenarios": [
                {
                    "statusClass": "info",
                    "statusName": "Available",
                    "testerName": "",
                    "actions": [
                        {"actionName": "Available", "actionFn": "setAvailable", "actionClass": "info"},
                        {"actionName": "In-Progress", "actionFn": "setInProgress", "actionClass": "danger"},
                        {"actionName": "Complete", "actionFn": "setComplete", "actionClass": "success"},
                    ]
                },
                {
                    "statusClass": "info",
                    "statusName": "Available",
                    "testerName": "",
                    "actions": [
                        {"actionName": "Available", "actionFn": "setAvailable", "actionClass": "info"},
                        {"actionName": "In-Progress", "actionFn": "setInProgress", "actionClass": "danger"},
                        {"actionName": "Complete", "actionFn": "setComplete", "actionClass": "success"},
                    ]
                },
                {
                    "statusClass": "info",
                    "statusName": "Available",
                    "testerName": "",
                    "actions": [
                        {"actionName": "Available", "actionFn": "setAvailable", "actionClass": "info"},
                        {"actionName": "In-Progress", "actionFn": "setInProgress", "actionClass": "danger"},
                        {"actionName": "Complete", "actionFn": "setComplete", "actionClass": "success"},
                    ]
                },
            ]
        },
    ];

    $scope.btnClicked = function(scenario, action) {
        console.log(scenario);
        console.log(action);
        scenario.statusClass = action.actionClass;
        scenario.statusName = action.actionName;
        if (action.actionName == "Available") {
            scenario.testerName = '';
        }
        else {
            scenario.testerName = 'Sudhir Moolky';
        }
        //$scope.platforms[0].scenarios[id].statusClass = action.actionClass;
        //$scope.platforms[0].scenarios[id].statusName = action.actionName;
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

    $scope.init();
    */
});