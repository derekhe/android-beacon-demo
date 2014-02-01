angular.module("AndroidBeaconDemo", []).controller("beaconController", function ($scope) {
    $scope.searchBeacon = function()
    {
        cordova.exec(function(success){
            $scope.result = success;
        }, function(fail)
        {
            $scope.result = "failed";
        }, "BeaconService", "", []);
    }

    $scope.result = "not success";
});