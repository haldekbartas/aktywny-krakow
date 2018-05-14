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