import $ from 'jquery';

// kontroler map
function MapController ($scope, $location) {

    // ustawienia map
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
}

export default ['$scope', '$location', MapController];
