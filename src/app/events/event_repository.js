var EventRepository = function(db, currentUserContext) {
    return {
        _getNextKey: function() {
            var eventId = db.ref().child('events').push().key;
            return eventId;
        },
        addEvent: function(event) {
            var authorId = currentUserContext.getCurrentUserId();
            console.log("user "+ authorId + " added an event");
            var id = this._getNextKey();



            db.ref('users/' + authorId + '/' + id).set(event);
            db.ref('events/' + id).set(event);

        },
        getEvents: function() {
          return new Promise((resolve, reject) => {
            var ref = db.ref("events");

            ref.on("value", function(snapshot) {
              resolve(snapshot.val());
            }, function (errorObject) {
              reject(error);
            });
          });
        },
        filterEvents: function (events) {
          return new Promise((resolve, reject) => {
            let sportEvents = [], chillOutEvents = [];
            
            try {
              for (let i in events) {
                const event = events[i];
                switch (event.type) {
                  case 'Sport ':
                    sportEvents.push(event);
                    break;
                  case 'Chill-out':
                    chillOutEvents.push(event);
                    break;
                }
              }
            } catch(error) {
              reject(error);
            }

            resolve({ sportEvents, chillOutEvents });
          });
        },
        getUserId: function() {
            return currentUserContext.getCurrentUserId();

        },
        signToEvent: function(event) {
            var authorId = currentUserContext.getCurrentUserId();


            var id = event.key;

            db.ref("events/" + id + "/signed/").once("value").then(function(val) {
                db.ref("events/" + id + "/personsQuantityEvent/").once("value").then(function(v) {
                    if(val.val() == v.val()) {
                        alert("Niestety nie możesz już zapisać się na to wydarzenie");
                    }
                    else {
                        var q = (val.val()) + 1;

                        db.ref("events/" + id + "/signed").set(q);
                        db.ref('users/' + authorId + '/' + id).set(event.val());
                    }

                });

            })



        },
        signOffFromEvent: function(event) {
            var authorId = currentUserContext.getCurrentUserId();


            var id = event.key;
            db.ref("events/" + id + "/signed/").once("value").then(function(val) {
                var q = (val.val()) - 1;

                db.ref("events/" + id + "/signed").set(q);
                db.ref("users/" + authorId + "/" + id).remove();


            });



        }

    };
};

export default EventRepository;
