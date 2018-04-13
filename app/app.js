var aktywnyKrakow = angular.module('aktywnyKrakow', ['ngRoute', 'ngAnimate','angularCSS' ]);


// plik konfiguracyjny
aktywnyKrakow.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {


    $locationProvider.html5Mode(true);

    //route, ktory pozwala nam na zmiane ekranów i przypisuje kontrolery do danych ekranów
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            conrtoller : "mController"
        })
        .when('/panel', {
            templateUrl: 'views/panel.html',
            controller: 'mController'
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
aktywnyKrakow.controller('NavCtrl', ['$route', '$routeParams', '$location', '$scope',
  function NavCtrl($route, $routeParams, $location, $scope) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
      // funkcja która pozwala na schowanie paska nawigacyjnego w ekranie logowania
$scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
};
      
}]);


// kontroler logowania
aktywnyKrakow.controller('LoginController', ['$scope', '$location', function ($scope, $location ) {
      

    // przypisanie wartości z pól input do zmiennych
    //    let mail = $scope.user.mail;
    //    let password = $scope.user.password;

    // zmiana widoku po zalogowaniu na stronę główną 
    $scope.login = function () {
        $location.path('home');
    };

}]);


aktywnyKrakow.controller("mController", function($scope) {

    $scope.mapConfig = function(x) {
        
            
            var mapProp= {
                center:new google.maps.LatLng(50.0646, 19.9450),
                zoom: 12,
            };
            new google.maps.Map(document.getElementsByClassName(x)[0], mapProp);
            
        
       
        
    }
    $scope.heightConfig = function(x) {
        
        var barHeight = $(".navbar").height();
        var height = ($(window).height()) - barHeight - 22;
        $(x).css("height", height);
        

    
    
    
    };
    $(window).resize(function() {
        $scope.heightConfig();
    });
});



