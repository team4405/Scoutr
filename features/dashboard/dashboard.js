'use strict';

angular
  .module('scoutr.dashboard', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "features/dashboard/dashboard.html",
        controller: 'DashboardCtrl',
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
  .controller('DashboardCtrl', function () {
    less.registerStylesheets();
    less.refresh(true);


  });
