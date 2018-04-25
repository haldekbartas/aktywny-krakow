var EventRepository = function(db, currentUserContext) {
    return {
        _getNextKey: function() {
            var eventId = db.ref().child('events').push().key;
            return eventId;
        },
        addEvent: function(event) {
            var authorId = currentUserContext.getCurrentUserId();
            var id = this._getNextKey();
            db.ref('users/' + authorId + '/' + id).set(event);
            db.ref('events/' + id).set(event);
        }
    };
};

export default EventRepository;