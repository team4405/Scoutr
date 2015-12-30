'use strict';

angular
  .module('scoutr.about', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('about', {
        url: "/about",
        templateUrl: "features/about/about.html",
        controller: 'AboutCtrl',
        authRequired: true,
        resolve: {
            user: function (UserService) {
                var value = UserService.init();
                return value;
            }
        }
      })
    ;
  })
  .controller('AboutCtrl', function () {

  });
