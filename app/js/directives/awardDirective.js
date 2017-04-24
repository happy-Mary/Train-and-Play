// rewrite as ng-repeat later
tpApp.directive("award", function($compile) {
    return {
        restrict: "E",
        link: function($scope, element, attr) {
            for (var i = 0; i < $scope.userData.awards.length; i++) {
                var section = angular.element("<section>").addClass('award');
                if (i > 2) {
                    section.attr('ng-if', 'awardBlockVisible');
                }
                element.append(section);
                section.append(angular.element('<h3>').text($scope.userData.awards[i].header));
                section.append(angular.element('<p>').text($scope.userData.awards[i].descr));
                $compile(section)($scope);
            }

        }
    }
});