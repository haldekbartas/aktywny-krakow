import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import angularCSS from 'angular-css';
import navCtrl from './controllers/navCtrl';
import loginCtlr from './controllers/loginCtrl';
import mapCtlr from './controllers/mapCtrl';


import '../style/styles.css';

// let app = () => {
//   return {
//     template: require('./app.html'),
//     controller: 'AppCtrl',
//     controllerAs: 'app'
//   }
// };

// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

function appConfig ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    //route, ktory pozwala nam na zmiane ekranów i przypisuje kontrolery do danych ekranów
    $routeProvider
        .when('/home', {
            template: require('./views/home.html'),
            controller : 'MapController'
        })
        .when('/panel', {
            template: require('./views/panel.html'),
            controller: 'MapController'
        })
        .when('/login', {
            template: require('./views/login.html'),
            controller: 'LoginController',
            controllerAs: 'app'
        })
        .otherwise({
            redirectTo: '/login'
        });
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngRoute, ngAnimate, angularCSS])
  .config(['$routeProvider', '$locationProvider', appConfig])
  .controller('NavController', navCtrl)
  .controller('LoginController', loginCtlr)
  .controller('MapController', mapCtlr);

export default MODULE_NAME;
