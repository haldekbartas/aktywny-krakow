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
        }
    }
};

export default CurrentUserContext;