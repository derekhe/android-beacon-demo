var app = angular.module('androidBeaconDemo', [
    'ngRoute',
    'appControllers'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/search', {
                templateUrl: 'search.html',
                controller: 'searchController'
            }).
            otherwise({
                redirectTo: '/search'
            });
    }
]);