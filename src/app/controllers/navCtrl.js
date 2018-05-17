// kontroler paska nawigacyjnego
function NavCtrl($route, $routeParams, $location, $scope/*, userContext*/) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    // funkcja która pozwala na schowanie paska nawigacyjnego w ekranie logowania
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();

    };

    $scope.logOut = function(){
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
      }).catch(function(error) {
          // An error happened.
      });
    }

    setTimeout(function(){
      var user = firebase.auth().currentUser;
      user.providerData.forEach(function (profile) {
    console.log("  Name: " + profile.displayName);
    $scope.zalogowany = profile.displayName;
    console.log($scope.zalogowany);
    $scope.img = profile.photoURL;
  })}, 1000);


  //  var dejmiego = firebase.auth().currentUser;
    //  $scope.displayusername = userContext.getCurrentUserId();
    /*   userContext.watch('_id', (id, old, newval) => {
        console.log(old);
        console.log(newval);
        $scope.displayusername = newval;
      })*/
}

export default ['$route', '$routeParams', '$location', '$scope',/*'userContext',*/ NavCtrl];
