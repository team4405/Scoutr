'use strict';

angular
  .module('scoutr.about', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('about', {
        url: "/about",
        templateUrl: "features/about/about.html",
        controller: 'AboutCtrl'
      })
    ;
  })
  .controller('AboutCtrl', function () {

  });
