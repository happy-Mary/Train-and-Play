var tpApp = angular.module("tpApp", ["ngRoute"]);

// SPA - pages
tpApp.config(function($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "templates/pages/main.html" })
        .when("/landing", { templateUrl: "templates/pages/landing.html" })
        .when("/user", { templateUrl: "templates/pages/user.html" });
});