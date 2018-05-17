var CurrentUserContext = function() {
    return {
        _id: undefined,
        _user: undefined,
        authenticate: function(user) {
            this._id = user.uid;
        },
        getCurrentUserId: function () {
            return this._id;
        },
        getUser: function () {
            return this._user;
        },
        clear: function(){
            this._id = undefined;
            this._user = undefined;
          }
    }
};

export default CurrentUserContext;
