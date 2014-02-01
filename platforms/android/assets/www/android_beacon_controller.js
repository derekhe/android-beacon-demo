var beaconDemo = angular.module("AndroidBeaconDemo", []);

beaconDemo.controller("beaconController", function ($scope) {
    var BEACON_SERVICE = "BeaconService";

    $scope.startScan = function () {
        cordova.exec(
            function (success) {
                $scope.result = success;
            },
            function (fail) {
                $scope.result = fail;
            },
            BEACON_SERVICE, "start", []);

        cordova.exec(function (ibeacon) {
            console.log(ibeacon);
            $scope.result = ibeacon;
            $scope.$apply();
        }, function (fail) {

        }, BEACON_SERVICE, "setCallback", []);
    };

    $scope.stopScan = function () {
        cordova.exec(
            function (success) {
                $scope.result = success;
            },
            function (fail) {
                $scope.result = fail;
            },
            BEACON_SERVICE, "stop", []);
    };

    $scope.result = "not started";

    document.addEventListener('deviceready', function () {
        $scope.$apply(function () {
            $scope.startScan();
        });
    });
});