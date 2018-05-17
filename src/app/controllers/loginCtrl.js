// kontroler logowania
function LoginController ($scope, $location, authorization, userContext) {

console.log(userContext.getCurrentUserId());
//logowanie za pomocą adresu email i hasła
    // przypisanie wartości z pól input do
      let loginCommand = {
        email: "",
        password: "",
      }
       $scope.user = loginCommand;

//logowanie za pomocą google
    $scope.loginWithGoogle = function() {
        authorization.handleGoogleAuth()
        .then((user) => {
          console.log("elo");
          window.location.href="/home";
          console.log("poszło");

        })
        .catch((error) => {
          alert(error);
        })
    };

//logowanie za pomocą facebooka

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
      //  $location.path('home');

    };


}

export default LoginController;
