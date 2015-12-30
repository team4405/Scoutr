'use strict';

angular
  .module('scoutr.admin', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: "/admin",
        templateUrl: "features/admin/admin.html",
        controller: 'adminCtrl',
        authRequired: true,
        resolve: {
            user: function (UserService) {
                var value = UserService.init();
                return value;
            }
        }
      })
      .state('admin.tab1', {
        url: "/tab1",
        templateUrl: "features/admin/tab1.html",
        controller: 'adminCtrl'
      })
      .state('admin.tab2', {
        url: "/tab2",
        templateUrl: "features/admin/tab2.html",
        controller: 'adminCtrl'
      })
      .state('admin.settings', {
        url: "/settings",
        templateUrl: "features/admin/settings.html",
        controller: 'SettingsCtrl'
      })
      .state('admin.pit-builder', {
        url: "/pit-builder",
        templateUrl: "features/admin/pit-builder.html",
        controller: 'PitBuilderCtrl'
      })
      .state('admin.match-builder', {
        url: "/match-builder",
        templateUrl: "features/admin/match-builder.html",
        controller: 'MatchBuilderCtrl'
      })
      .state('admin.scouters', {
        url: "/scouters",
        templateUrl: "features/admin/scouters.html",
        controller: 'ScoutersCtrl'
      })
      .state('admin.data', {
        url: "/data",
        templateUrl: "features/admin/data.html",
        controller: 'DataCtrl'
      })
      .state('admin.custom', {
        url: "/:tab",
        templateUrl: function ($stateParams) {
          return "features/admin/" + $stateParams.tab + ".html";
        },
        controllerProvider: function ($stateParams) {
          return 'adminCtrl';
        }
      })
    ;
  }).controller('PitBuilderCtrl', function ($scope , $stateParams, $builder, $validator, $state) {
    $scope.state = $stateParams;
    var checkbox, textbox;
      
       $scope.refresh = function(){location.reload();}

       $scope.$on("$locationChangeStart", function(event) {
       if (!confirm('You have unsaved changes, go back?'))
            event.preventDefault();
        });
        
      $scope.form = $builder.forms['default'];
      $scope.input = [];
      $scope.defaultValue = {};
      return $scope.submit = function() {
        return $validator.validate($scope, 'default').success(function() {
          return console.log('success');
        }).error(function() {
          return console.log('error');
        });
      };
  }).controller('MatchBuilderCtrl', function ($scope , $stateParams, $builder, $validator, $state) {
    $scope.state = $stateParams;
    var checkbox, textbox;
        
      $scope.alerts = [];
        
      $scope.refresh = function(){location.reload();}
  
      $scope.form = $builder.forms['default'];
      $scope.input = [];
      $scope.defaultValue = {};
      return $scope.submit = function() {
        return $validator.validate($scope, 'default').success(function() {
          return console.log('success');
        }).error(function() {
          return console.log('error');
        });
      };
  }).controller('adminCtrl', function ($scope , $stateParams, $builder, $validator) {
    $scope.state = $stateParams;
    var checkbox, textbox;
                
      $scope.form = $builder.forms['default'];
      $scope.input = [];
      $scope.defaultValue = {};
      return $scope.submit = function() {
        return $validator.validate($scope, 'default').success(function() {
          return console.log('success');
        }).error(function() {
          return console.log('error');
        });
      };
  });
