tpApp.controller("AccountCtrl", function($scope, $http) {
    // GETTING OBJECT
    // http get function
    $scope.userData = {
        name: "Святослав Ингрибидзе",
        avatar: "url",
        raiting: 100500,
        awards: [
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" },
            { header: "Прошел курс подготовки новичка", descr: "Основные принципы дизайна Ордена Дизайниеров" }
        ],
        trainings: [
            { name: "основные принципы дизайна ордена дизайниеров", progress: 80, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 35, input: 3 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 43, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 100, input: 1 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 85, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 100, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 23, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 66, input: 5 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 75, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 100, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 13, input: 0 },
            { name: "основные принципы дизайна ордена дизайниеров", progress: 98, input: 0 }
        ]
    };
    // GETTING OBJECT//////////////////////////////////////////////////////////////////////////////
    // AWARDS
    $scope.swowHideLink = "Развернуть";
    $scope.awardBlockVisible = false;

    $scope.toggleContent = function() {
        $scope.awardBlockVisible = $scope.awardBlockVisible === false ? true : false;
        $scope.swowHideLink = $scope.swowHideLink === "Развернуть" ? "Свернуть" : "Развернуть";
        console.log($scope.awardBlockVisible);
    };
    // сортируем тренинги по завершенности
    $scope.userData.trainings.sort(function(obj1, obj2) {
        return obj2.progress - obj1.progress;
    });

    $scope.complitedArr = $scope.userData.trainings.filter(function(obj) {
        return obj.progress === 100;
    });

    $scope.inprogressArr = $scope.userData.trainings.filter(function(obj) {
        return obj.progress < 100;
    });

});