// kontroler logowania
function LoginController ($scope, $location, authorization) {


    // przypisanie wartości z pól input do zmiennych
    //    let mail = $scope.user.mail;
    //    let password = $scope.user.password;
    $scope.loginWithGoogle = function() {
        authorization.handleGoogleAuth();
        $location.path('home');
    };
    // zmiana widoku po zalogowaniu na stronę główną
    $scope.login = function () {

        $location.path('home');
    };

}

export default LoginController;
