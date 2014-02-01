angular.module("AndroidBeaconDemo", []).controller("beaconController", function ($scope) {
    $scope.startScan = function () {
        cordova.exec(
            function (success) {
                $scope.result = success;
            },
            function (fail) {
                $scope.result = fail;
            },
            "BeaconService", "start", []);
    };

    $scope.stopScan = function () {
        cordova.exec(
            function (success) {
                $scope.result = success;
            },
            function (fail) {
                $scope.result = fail;
            },
            "BeaconService", "stop", []);
    };

    $scope.result = "not started";
});