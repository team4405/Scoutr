// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'vr.directives.slider', 'starter.controllers', 'starter.services', 'firebase'])

/*

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

*/
.value('fbURL', 'https://scouter.firebaseio.com/')
.value('teams_table', 'teams')
.value('matches_table', 'matches')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('main', {
            url : '/main',
            templateUrl : 'templates/mainContainer.html',
            abstract : true,
            controller : 'MainController'
        })

        .state('main.home', {
             url: '/home',
             views: {
                 'main': {
                     templateUrl: 'templates/home.html',
                     controller : 'HomePageController'
                 }
             }
        })


/*
        .state('main.home', {
            url: '/home',
            views: {
                'main': {
                    templateUrl: 'templates/home.html',
                    controller : 'HomePageController'
                }
            }
        })
*/
        .state('main.info', {
            url: '/info',
            views: {
                'main': {
                    templateUrl: 'templates/info.html',
                    controller : 'InfoPageController'
                }
            }
        })

        .state('match', {
          url: '/match',
          templateUrl: 'templates/match.html',
          controller: 'MatchScoutController'
        })

        .state('pit', {
          url: '/pit',
          templateUrl: 'templates/pit.html',
          controller: 'PitScoutController'
        })

        .state('intro', {
          url: '/intro',
          templateUrl: 'templates/intro.html',
          controller: 'IntroCtrl'
        })

        .state('main.data', {
             url: '/data',
             views: {
                 'main': {
                     templateUrl: 'templates/data.html',
                     controller : 'DataPageController'
                 }
             }
        })

        .state('main.teams', {
             url: '/teams',
             views: {
                 'main': {
                     templateUrl: 'templates/teams.html',
                     controller : 'TeamsPageController'
                 }
             }
        })

        .state('main.teams-detail', {
            url: '/teams/:teamNumber',
            views: {
                'main': {
                    templateUrl: 'templates/team-detail.html',
                    controller : 'TeamDetailController'
                }
            }
        })

        .state('main.teams-pics', {
                url: '/teams/:teamNumber/pics',
                templateUrl: 'templates/team-pics.html',
                controller: 'TeamPicsDetailCtrl'
        })

        .state('main.matches', {
             url: '/matches',
             views: {
                 'main': {
                     templateUrl: 'templates/matches.html',
                     controller : 'MatchesPageController'
                 }
             }
        })

        .state('main.match-detail', {
                url: '/matches/:matchNumber',
                templateUrl: 'templates/match-detail.html',
                controller: 'MatchDetailCtrl'
        })

    $urlRouterProvider.otherwise('/main/home');
}])
