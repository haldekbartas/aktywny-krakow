// kontroler logowania
function LoginController ($scope, $location ) {

    // przypisanie wartości z pól input do zmiennych
    //    let mail = $scope.user.mail;
    //    let password = $scope.user.password;

    // zmiana widoku po zalogowaniu na stronę główną
    $scope.login = function () {
        $location.path('home');
    };

}

export default ['$scope', '$location', LoginController];
