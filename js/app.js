'use strict';

// Declare app level module which depends on views, and components
var scoutr = angular.module('scoutr'
  , ['ui.router'
    , 'scoutr.dashboard'
    , 'scoutr.about'
    , 'scoutr.admin'
    , 'scoutr.users'
    //, 'scoutr.data'
   // , 'scoutr.match'
    //, 'scoutr.pit'
    //, 'Scoutr.dashboard'
    //, 'Scoutr.landing'
    //, 'Scoutr.admin'
    , 'ngCookies'
    , 'angular-loading-bar'
    , 'parse-angular'
    , 'builder'
    , 'builder.components'
    , 'validator.rules'
    , 'ui.bootstrap'
    , 'ngDialog'
    //, 'ngFormBuilder'
    //, 'angularjsNotify'
  ]).config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/dashboard");
  }).service('ParseService', [function() {
    var app_id = "1234";
    var js_key = "5678";
    Parse.initialize(app_id, js_key);
  }])
  
    // .controller('RootController', [
    //     '$scope', '$location', '$rootScope', 'ParseService', function($scope, $location, $rootScope, ParseService) {
            
    //     $rootScope.currentUser = Parse.User.current();

    //     $rootScope.loggedIn = function() {
    //         if ($rootScope.currentUser === null) {
    //         return false;
    //         } else {
    //         return true;
    //         }
    //     };

    //     $scope.logout = function() {
    //         $rootScope.currentUser = null;
    //         Parse.User.logOut();
    //     };

    // }])
  
  .controller('MainCtrl', 
    ['$scope', 'ParseService', '$location', '$rootScope', '$cookies', 'ngDialog', function($scope, ParseService, $location, $rootScope, $cookies, ngDialog) {
    
    Parse.initialize("E9CzXT1NS4T1luWwNu3jRKSHjmUIdPk0ca321pej", "TswapPftwupky3FF9fbPjB9WjBYyW5s07fQ3qFkz");
    
    $scope.scoutrName = "";
    $scope.scoutrTeam = "";
    
    if (Parse.User.current()){
    Parse.User.current().fetch().then(function (user) {
       $scope.scoutrName = user.get('name');
       $scope.scoutrTeam = user.get('team');
       $cookies.put('team', $scope.scoutrTeam);
    });
    } else {
        
    };
    $rootScope.changeView = function(view) {
        $location.path(view);
    }
    
    $scope.open1 = function () {
        ngDialog.open({ template: 'firstDialog',
						controller: 'FirstDialogCtrl',
						className: 'ngdialog-theme-default ngdialog-theme-custom' });
    };
    
    $scope.open2 = function () {
        ngDialog.open({ template: 'secondDialog',
						controller: 'SecondDialogCtrl',
						className: 'ngdialog-theme-default ngdialog-theme-custom' });
    };
    
    var teams = Parse.Object.extend("Teams");
    var query = new Parse.Query(teams);
    query.find({
    success: function(results) {
    for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        (function($) {
            $('#select').append($("<option></option>")
            .attr("value",object.get('teamNumber'))
            .text(object.get('teamName') + " - " + object.get('teamNumber')));

            })(jQuery);

        }
        },
            error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    })
    
    // root binding for alertService
    //$rootScope.closeAlert = alertService.closeAlert; 
    
    //MainCtrl.$inject = ['$scope', '$location', 'alertService'];
        
    $rootScope.currentUser = Parse.User.current();

    $rootScope.loggedIn = function() {
        if ($rootScope.currentUser === null) {
        return false;
        } else {
        return true;
        }
    };

    $scope.logout = function() {
        $rootScope.currentUser = null;
        Parse.User.logOut();
        $location.path("/about");
    };
        
    // redirect to "/" if user is already logged in
    if ($rootScope.loggedIn() === true) {
        $location.path("/");
    }

    function loginSuccessful(user) {
        $rootScope.$apply(function() {
        $rootScope.currentUser = Parse.User.current();
        //$dismiss();
        $location.path("/");
        
        Parse.User.current().fetch().then(function (user) {
            $scope.scoutrName = user.get('name');
            $scope.scoutrTeam = user.get('team');
            $cookies.put('team', $scope.scoutrTeam);
        });
        
        });
    }

    function loginUnsuccessful(user, error) {
        //alert("Error: " + error.message + " (" + error.code + ")");
       //Notify.addMessage('"Error: " + error.message + " (" + error.code + ")"', 'danger');
    }

    $scope.login = function() {   
        
        // e.preventDefault();
         
        var username = $scope.login.username;
        var password = $scope.login.password;

        Parse.User.logIn(username, password, {
        success: loginSuccessful,
        error: loginUnsuccessful
        });
    }
    
    $scope.register = function() {   
        
        var scoutr_name = $scope.register.fname;
        var username = $scope.register.username;
        var password = $scope.register.password;
        var email = $scope.register.email;
        var team = $scope.register.team;
        
        var user = new Parse.User();
        user.set("name", scoutr_name);
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);

        // other fields can be set just like with Parse.Object
        user.set("team", team);

        user.signUp(null, {
            success: function(user) {
                // Hooray! Let them use the app now.
                Parse.User.logIn(username, password, {
                success: loginSuccessful,
                error: loginUnsuccessful
                });
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
            }
});
    };

  }]).controller('FirstDialogCtrl', function ($scope, ngDialog) {
				$scope.next = function () {
					ngDialog.close('ngdialog1');
					ngDialog.open({
						template: 'secondDialog',
                        controller: 'SecondDialogCtrl',
						className: 'ngdialog-theme-flat ngdialog-theme-custom'
					});
				};
    }).controller('SecondDialogCtrl', function ($scope, ngDialog) {
				$scope.next = function () {
					ngDialog.close('ngdialog2');
					ngDialog.open({
						template: 'firstDialog',
                        controller: 'FirstDialogCtrl',
						className: 'ngdialog-theme-flat ngdialog-theme-custom'
					});
				};
	}).run(function ($rootScope, $state) {


			$rootScope.$on('$stateChangeError',
				function (event, toState, toParams, fromState, fromParams, error) {

					//debugger;

					console.log('$stateChangeError ' + error && (error.debug || error.message || error));

					// if the error is "noUser" the go to login state
					if (error && error.error === "noUser") {
						event.preventDefault();

						$state.go('about', {});
					}
				});

		}).value('ParseConfiguration', {
        applicationId: "E9CzXT1NS4T1luWwNu3jRKSHjmUIdPk0ca321pej",
        javascriptKey: "TswapPftwupky3FF9fbPjB9WjBYyW5s07fQ3qFkz"
    });

