import $ from 'jquery';

// kontroler map
function MapController ($scope, $location, eventRepository) {
    var geocoder= new google.maps.Geocoder();
    console.log(geocoder);
    // ustawienia map
    $scope.mapConfig = function(x) {

      var center = $scope.map ? $scope.map.center : new google.maps.LatLng(50.0646, 19.9450);
      var mapProp= {
        center: center,
        zoom: 12,
      };

        var map = new google.maps.Map(document.getElementsByClassName(x)[0], mapProp);

        $scope.map = map;
        // $('#submitAddress').on("click", function() {
        //     $scope.geocodeAddress(geocoder, map);
        // });
    }
    $scope.addressToQuery = "";

    // wyszukiwanie adresu na mapie
    $scope.geocodeAddress = function() {

        geocoder.geocode({'address' : $scope.addressToQuery}, function(results, status) {
            var result = results[0];
            var location = result.geometry.location;
            if(status === 'OK') {
                $scope.map.setCenter(location);
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: location,
                });
                $scope.event.address = result.formatted_address;
                //$scope.eventLocation = results[0].geometry.location;
            }
            else {
                alert("Pozyskiwanie lokacji nie powiodło się z przyczyny: " + status)
            }
        });
    }

    // ustawianie wysokosci map
    $scope.heightConfig = function(x) {

        var barHeight = $(".navbar").height();
        var height = ($(window).height()) - barHeight - 22;
        $(x).css("height", height);

    };

    /*
    // ustawianie parametrow wyswietlania elementow panelu
    $scope.formParams = function() {
        var formHeight = $(".setEvent").height();
        alert(formHeight);
        if(formHeight < 300) {
            $(".setEventHeader").css("font-size", "20px");
        }
    };
    */

    // zmiania parametrow wyswietlania elementow strony przy zmianie rozmiaru okna przegladarki
    $(window).resize(function() {
        if($location.path() == "/home") {
            $scope.heightConfig(".mapHome");
        }
        else if($location.path() == "/panel") {
            $scope.heightConfig(".mapPanel");
        }

        //$scope.formParams();
    });

    // kategorie wydarzeń
    $scope.eventTypes = [
        { name: "Chill-out" },
        { name: "Sport "}
    ];

    $scope.sendData = function() {
        console.log(eventRepository);
        $scope.event.type = $scope.event.type.name;
        eventRepository.addEvent($scope.event);
        console.log($scope.event);
    };

    $scope.event = {
        type: "",
        name: "",
        description: "",
    }
}

export default MapController;
