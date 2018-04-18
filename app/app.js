//Inicjalizacja Firebase
$(function() {
    
    var config = {
        apiKey: "AIzaSyB9Is-rNsWgM-V1EexcJQeq0babWrO_xYk",
        authDomain: "aktywny-krakow-ae725.firebaseapp.com",
        databaseURL: "https://aktywny-krakow-ae725.firebaseio.com",
        projectId: "aktywny-krakow-ae725",
        storageBucket: "aktywny-krakow-ae725.appspot.com",
        messagingSenderId: "525000600389"
    };

    firebase.initializeApp(config);

});

//definiowanie modułu
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
aktywnyKrakow.controller('LoginController', ['$scope', '$location', function ($scope, $location) {
      

    // przypisanie wartości z pól input do zmiennych
    //    let mail = $scope.user.mail;
    //    let password = $scope.user.password;

    // zmiana widoku po zalogowaniu na stronę główną 
    $scope.login = function () {
        $location.path('home');
    };

}]);

// kontroler główny
aktywnyKrakow.controller("mController", function($scope, $location) {

    
    // wysyłanie danych na Firebase
    $scope.sendData = function() {

        var firebaseRef = firebase.database().ref();
        if($scope.eventForm.$valid) {

            if($scope.eventLocation) {

                if($scope.dateTimeEvent > new Date()) {

                    firebaseRef.child("user_login, TODO!!!")
                    .child("location").child("lat").set($scope.eventLocation.lat());

                    firebaseRef.child("user_login, TODO!!!")
                    .child("location").child("lng").set($scope.eventLocation.lng());

                    firebaseRef.child("user_login, TODO!!!").child("type").set($scope.selectedEventType.name);
                    firebaseRef.child("user_login, TODO!!!").child("name").set($scope.eventName);
                    firebaseRef.child("user_login, TODO!!!").child("description").set($scope.description);
                    firebaseRef.child("user_login, TODO!!!").child("DT")
                    .child("date").set($scope.dateTimeEvent.getDate());

                    firebaseRef.child("user_login, TODO!!!").child("DT")
                    .child("month").set($scope.dateTimeEvent.getMonth()+1);

                    firebaseRef.child("user_login, TODO!!!").child("DT")
                    .child("year").set($scope.dateTimeEvent.getFullYear());

                    firebaseRef.child("user_login, TODO!!!").child("DT")
                    .child("hour").set($scope.dateTimeEvent.getHours());

                    firebaseRef.child("user_login, TODO!!!").child("DT")
                    .child("minute").set($scope.dateTimeEvent.getMinutes());

                    firebaseRef.child("user_login, TODO!!!").child("DT")
                    .child("second").set($scope.dateTimeEvent.getSeconds());

                    firebaseRef.child("user_login, TODO!!!").child("quantity").set($scope.personsQuantityEvent);
                    alert("Wydarzenie zostało stworzone");
                }
                else {
                    alert("Wprowadzona data już minęła, proszę podać przyszłą datę");
                }
            }
            else {
                alert("Proszę wskazać miejsce wydarzenia");
            }
        }        
    };
    
    //inicjalizacja map
    $scope.mapConfig = function(x) {
        
            var mapProp= {
                center:new google.maps.LatLng(50.0646, 19.9450),
                zoom: 12,
            };
            var map = new google.maps.Map(document.getElementsByClassName(x)[0], mapProp);
            var geocoder = new google.maps.Geocoder();
            $('#submitAddress').on("click", function() {
                $scope.geocodeAddress(geocoder, map);
            });  
    }
    
    // wyszukiwanie adresu na mapie
    $scope.geocodeAddress = function(geocoder, map) {

        var address = $('#address').val();
        geocoder.geocode({'address' : address}, function(results, status) {

            if(status === 'OK') {

                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                });
                $scope.eventLocation = results[0].geometry.location;
                
            }
            else {
                console.log("Pozyskiwanie lokacji nie powiodło się z przyczyny: " + status)
            }
        });
    }
    
    // ustawianie wysokosci map
    $scope.heightConfig = function(x) {

        var wWidth = $(window).width();
        if(wWidth < 760) {
            $(x).css("height", wWidth);
        } 
        else {
            var barHeight = $(".navbar").height();
            var height = ($(window).height()) - barHeight - 22;
            $(x).css("height", height);
        }
    };

    //zmiana widoku dla mapy strony głównej na małych ekranach
    $scope.homeParams = function() {

        var wWidth = $(window).width();
        if(wWidth < 760) {
            $(".googleMap").addClass("googleMapMobile");
        }
        else {
            $(".googleMap").removeClass("googleMapMobile");
        }
    }

    // ustawianie parametrów wyswietlania elementów panelu
    $scope.formParams = function() {

        var wWidth = $(window).width();

        if(wWidth < 380) {
            $(".setEventHeader").addClass("eventHeaderSmall");
            $("#submitAddress").addClass("submitAddressSmall");
            
        }
        else {
            $(".setEventHeader").removeClass("eventHeaderSmall");
            $("#submitAddress").removeClass("submitAddressSmall");
        }
        
        if(wWidth < 760) {
            $(".googleMap").addClass("googleMapMobile");
            $(".setEvent").addClass("setEventMobile");
            
            
        }
        else {
            $(".googleMap").removeClass("googleMapMobile");
            $(".setEvent").removeClass("setEventMobile");
        }

        if(wWidth < 1013) {
            if(wWidth < 380) {
                $("#descript").attr("cols", "30");
            }
            else {
                $("#descript").attr("cols", "40");
            }  
        }
        else {
            $("#descript").attr("cols", "55");
        }

        if (wWidth < 1215) {
            $(".EDSBreak1").addClass("eventDetailsSegmentSmaller1");
            $(".EDSBreak2").addClass("eventDetailsSegmentSmaller2");
        }
        else {
            $(".EDSBreak1").removeClass("eventDetailsSegmentSmaller1");
            $(".EDSBreak2").removeClass("eventDetailsSegmentSmaller2");
        }
    };
    
    // zmiania parametrów wyswietlania elementów strony przy zmianie rozmiaru okna przeglądarki
    $(window).resize(function() {

        if($location.path() == "/home") {    
            $scope.heightConfig(".mapHome");
            $scope.homeParams();
        }
        else if($location.path() == "/panel") {
            
            $scope.heightConfig(".mapPanel");
            $scope.formParams();
        }
    });

    // kategorie wydarzeń
    $scope.eventTypes = [
        { name: "Chill-out" },
        { name: "Sport "}
    ];

    //wywolanie konfiguracji widoku dla strony głównej i panelu
    if($location.path() == "/home") {
        
        $scope.mapConfig("mapHome");
        $scope.heightConfig(".mapHome");
        $scope.homeParams();
    }
    else if($location.path() == "/panel") {

        $scope.mapConfig("mapPanel");
        $scope.heightConfig(".mapPanel"); 
        $scope.formParams(); 
    }
});



