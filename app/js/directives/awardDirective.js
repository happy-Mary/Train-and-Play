tpApp.directive("award", function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs) {
            // showing and hiding trenings
            var proc = angular.element(document.querySelectorAll(".award"));
            console.log(proc.length);
            for (var i = 3; i < proc.length; i++) {
                proc[i];
            }
        }
    }
});