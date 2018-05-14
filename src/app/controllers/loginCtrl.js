// kontroler logowania
function LoginController ($scope, $location, authorization) {

//logowanie za pomocą adresu email i hasła
    // przypisanie wartości z pól input do zmiennych
    //    let mail = $scope.user.mail;
    //    let password = $scope.user.password;

//logowanie za pomocą google
    $scope.loginWithGoogle = function() {
        authorization.handleGoogleAuth();
    };

//logowanie za pomocą facebooka

    $scope.loginWithFacebook = function() {
        authorization.handleFacebookAuth();
      }


// zmiana widoku po zalogowaniu na stronę główną
   $scope.login = function () {

        $location.path('home');
    };

}

export default LoginController;
