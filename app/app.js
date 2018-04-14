var aktywnyKrakow = angular.module('aktywnyKrakow', ['ngRoute', 'ngAnimate', 'angularCSS']);


// plik konfiguracyjny
aktywnyKrakow.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {


    $locationProvider.html5Mode(true);

    //route, ktory pozwala nam na zmiane ekranów i przypisuje kontrolery do danych ekranów
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/panel', {
            templateUrl: 'views/panel.html',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            css: 'content/css/loginstyle.css'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

// kontroler paska nawigacyjnego
aktywnyKrakow.controller('NavCtrl', ['$scope', '$location',
  function NavCtrl($scope, $location) {

        // funkcja która pozwala na schowanie paska nawigacyjnego w ekranie logowania
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

}])


// kontroler logowania
aktywnyKrakow.controller('LoginController', ['$scope', '$location', function ($scope, $location) {


    // przypisanie wartości z pól input do zmiennych
    //    let mail = $scope.user.mail;
    //    let password = $scope.user.password;

    // zmiana widoku po zalogowaniu na stronę główną 
    $scope.login = function () {
        $location.path('home');
    };

}]);
