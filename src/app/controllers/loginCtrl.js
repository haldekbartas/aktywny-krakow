import $ from 'jquery';
// kontroler logowania
function LoginController ($scope, $location, authorization) {

//logowanie za pomocą adresu email i hasła
 // przypisanie wartości z pól input do zmiennych w modelu

    let loginCommand = {
       email: "",
       password: "",
     }
      $scope.user = loginCommand;

//logowanie i autoryzacja za pomocą google
    $scope.loginWithGoogle = function() {

      authorization.handleGoogleAuth()
      .then((user) => {

        console.log("elo");
        console.log("poszło");
        window.location.href="/home"
      })
      .catch((error) => {
        alert(error);
      });

    };

//logowanie i autoryzacja za pomocą facebooka

    $scope.loginWithFacebook = function() {

      authorization.handleFacebookAuth()
      .then((user) => {
        console.log("elo");
        window.location.href="/home";
        console.log("poszło");

      })
      .catch((error) => {
        alert(error);
      })
    };


// zmiana widoku po zalogowaniu na stronę główną

    $scope.login = function () {

      authorization.handlePasswordAuth(loginCommand)
      .then((user) => {
        console.log("elo");
        window.location.href="/home";
      })
      .catch((error) => {
        alert(error);
      })
     };





  /* $scope.login = function () {

        $location.path('home');
    };*/
}

export default LoginController;
