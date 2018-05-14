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

    $scope.event = {
        type: "",
        name: "",
        description: "",
        date: "",
        signed: 1
    }

    $scope.sendData = function() {
        var ampm = $scope.event.dateTimeEvent.getHours() >= 12 ? "AM" : "PM";
        $scope.event.type = $scope.event.type.name;
        $scope.event.date = $scope.event.dateTimeEvent.getDate() + "." + $scope.event.dateTimeEvent.getMonth()+1 + "." +
            $scope.event.dateTimeEvent.getFullYear();
        $scope.event.time = $scope.event.dateTimeEvent.getHours() + ":" +
        $scope.event.dateTimeEvent.getMinutes() + " " + ampm;
        
        eventRepository.addEvent($scope.event);
        
    };

    
    
    $scope.doCheckEvent = function(snap, eventObj) {
        
        var userId = eventRepository.getUserId();
        console.log("logged in as " + userId);
        firebase.database().ref("users/" + userId + "/").once('value').then(function(innerSnap){
            var checkEvent = false;
            innerSnap.forEach(function(event) {
                if(event.key == snap.key) {
                    checkEvent = true;
                }
            });
            var buttonTitle;
            if(checkEvent) {
                buttonTitle = "Wypisz się";
            }
            else {
                buttonTitle = "Zapisz się";
                if(eventObj.signed == eventObj.personsQuantityEvent) {
                    $("." + snap.key).attr("disabled", "disabled");
                }
            }

            
            var content = "<p><span class='name'>" + eventObj.name + "</span><span class='type'>" + eventObj.type +
                "</span></p>" + "<p class='place'>Miejsce: " + eventObj.address + "</p><p>Opis: " + eventObj.description + "</p><p>Data: " +
                eventObj.date + "<p>Czas: " + eventObj.time + "</p>" +
                "<p>Ilość zapisanych osób: <span class='quan" + snap.key + "'>" + eventObj.signed + "</span></p><div class='lastRow'><span>Maksymalna liczba osób: " +
                eventObj.personsQuantityEvent + "</span><button class='signUp " + snap.key + "'>" + buttonTitle + "</button></div>";
            
            
            var eventTag = "<div class='event' k='" + snap.key + "'>" + content + "</div>";
            
            var l = $(".event").length;
            
            $("." + snap.key).click(function() {

                $("." + snap.key).attr("disabled", "disabled");
                var userId = eventRepository.getUserId();
                
                firebase.database().ref("users/" + userId + "/").once('value').then(function(innerSnap){
                    var checkEvent = false;
                    var ev;
                    innerSnap.forEach(function(event) {
                        if(event.key == snap.key) {
                            checkEvent = true;
                            ev = event;
                        }
                    });
                    
                    
                    if(checkEvent) {
                        
                        firebase.database().ref("events/" + snap.key + "/signed/").once("value").then(function(val) {
                            var q = (val.val()) - 1;
                            
                            eventRepository.signOffFromEvent(ev);
                            $("." + snap.key).text("Zapisz się");

                            
                            $(".quan" + snap.key).text(q);

                            $("." + snap.key).removeAttr("disabled");
            
                            
                        });
                        
                    }
                    else {
                        firebase.database().ref("events/").once('value').then(function(snapshot) {
                            var event;
                            snapshot.forEach(function(evv) {
                                if(evv.key == snap.key) {
                                    event = evv;
                                }
                            });
                            firebase.database().ref("events/" + snap.key + "/signed/").once("value").then(function(val) {
                                var q = (val.val()) + 1;
                                eventRepository.signToEvent(event);
                                $("." + snap.key).text("Wypisz się");
                                
                                $(".quan" + snap.key).text(q);
                                $("." + snap.key).removeAttr("disabled");
                            });
                            
                        });

                        
                    }



                

                    

                });

            });

            var check = false;
            for(var i = 0; i < l; i++) {
                var key = $(".event").eq(i).attr("k");
                if(key == snap.key) {
                    check = true;
                }

                
            }

            

            if(!check) {
                $(".eventList").append(eventTag);
            }
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            
            
        }); 
        
        
        
        
        
        

    };

    
    
    
    

    

    
    

    
    //definiowanie listy wydarzen
    $scope.getEventList = function() {
        
        $scope.eventList = [];
        
        
        
        firebase.database().ref().child("events").on("child_added", snap => {
            var eventArray = [];
            
            snap.forEach(function(child) {
                   
                var feature = child.val();
                eventArray.push(feature);
                    
                    
                    
            });

            var eventObj = {
                address: eventArray[0],
                date: eventArray[1],
                description: eventArray[2],
                name: eventArray[3],
                personsQuantityEvent: eventArray[4],
                signed: eventArray[5],
                time: eventArray[6],
                type: eventArray[7]
            }
            $scope.doCheckEvent(snap, eventObj);
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            
            
            
            
           
            
            
            
            
            
           
            
            
            
            
            
            
                
                
        });
        
        
        
        
        
        
    }
    
    
    
}

export default MapController;
