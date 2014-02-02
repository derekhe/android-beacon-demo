var controllers = angular.module("appControllers", []);

controllers.controller("searchController", function ($scope) {
    var BEACON_SERVICE = "BeaconService";

    $scope.beaconsFound = {};

    $scope.startScan = function () {
        beaconService("start");
        registerBeaconScanResultCallback();
        $scope.scanStarted = true;
    };

    function beaconService(action) {
        cordova.exec(
            function (success) {
                $scope.result = success;
            },
            function (fail) {
                $scope.result = fail;
            },
            BEACON_SERVICE, action, []);
    }

    function registerBeaconScanResultCallback() {
        cordova.exec(function (beacons) {
            var beacons = JSON.parse(beacons);

            $scope.beaconsVisiable = {};

            for (var i = 0; i < beacons.length; i++) {
                var proximityUuid = beacons[i].proximityUuid;
                $scope.beaconsFound[proximityUuid] = beacons[i];
                $scope.beaconsVisiable[proximityUuid] = beacons[i];
            }

            $scope.$apply();
        }, function (fail) {
        }, BEACON_SERVICE, "setCallback", []);
    }

    $scope.isVisible = function(beacon)
    {
        return _.has($scope.beaconsVisiable, beacon.proximityUuid);
    }

    $scope.stopScan = function () {
        beaconService("stop");
        $scope.scanStarted = false;
    };

    $scope.clearScanResult = function () {
        $scope.beaconsFound = {};
    }

    $scope.getNearestBeacon = function () {
        return _.min($scope.beaconsVisiable, function (beacon) {
            return -1 * parseFloat(beacon.rssi)
        });
    }

    $scope.isNearest = function (beacon) {
        return $scope.getNearestBeacon() == beacon;
    }

    document.addEventListener('deviceready', function () {
        $scope.startScan();
    });
});