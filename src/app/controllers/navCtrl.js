// kontroler paska nawigacyjnego
function NavCtrl($route, $routeParams, $location, $scope) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    // funkcja która pozwala na schowanie paska nawigacyjnego w ekranie logowania
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

}

export default ['$route', '$routeParams', '$location', '$scope', NavCtrl];
