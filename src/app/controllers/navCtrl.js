// kontroler paska nawigacyjnego
function NavCtrl($route, $routeParams, $location, $scope) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    // funkcja która pozwala na schowanie paska nawigacyjnego w ekranie logowania
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.logOut = function(){
      firebase.auth().signOut().then(function() {
          // Sign-out successful
      }).catch(function(error) {
          console.log(error);
      });
    }
    //pozwala na zczytanie danych użytkownika
    setTimeout(function(){
      var user = firebase.auth().currentUser;
      user.providerData.forEach(function (profile) {
        console.log("  Name: " + profile.displayName);
        $scope.zalogowany = profile.displayName;
        console.log($scope.zalogowany);
        $scope.img = profile.photoURL;
      })}, 1000);
}

export default ['$route', '$routeParams', '$location', '$scope', NavCtrl];
