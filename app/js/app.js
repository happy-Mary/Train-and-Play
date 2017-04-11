var tpApp = angular.module("tpApp", ["ngRoute", "vcRecaptcha"]);

// // SPA - pages
tpApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/main", { templateUrl: "templates/pages/main.html" })
        .when("/landing", { templateUrl: "templates/pages/landing.html" })
        .when("/user", { templateUrl: "templates/pages/user.html" })
        .otherwise({
            redirectTo: '/main'
        });
}]);