var tpApp = angular.module("tpApp", ["ngRoute", "ui.bootstrap"]);
// "vcRecaptcha"
// https://www.npmjs.com/package/ng-google-recaptcha

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

tpApp.controller('ProgressDemoCtrl', function($scope) {
    $scope.max = 100;
    $scope.value = $scope.traning.progress;
    console.log($scope.value);
});