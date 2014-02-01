var beaconDemo = angular.module("AndroidBeaconDemo", []);

beaconDemo.controller("beaconController", function ($scope) {
    var BEACON_SERVICE = "BeaconService";

    $scope.startScan = function () {
        beaconService("start");
        registerBeaconScanResultCallback();
        $scope.beaconsFound = {};
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

            for(var i=0;i<beacons.length;i++)
            {
                $scope.beaconsFound[beacons[i].proximityUuid] = beacons[i];
            }

            $scope.$apply();
        }, function (fail) {
        }, BEACON_SERVICE, "setCallback", []);
    }

    $scope.stopScan = function () {
        beaconService("stop");
        $scope.scanStarted = false;
    };

    $scope.clearScanResult = function() {
        $scope.beaconsFound = {};
    }

    document.addEventListener('deviceready', function () {
        $scope.startScan();
    });
});