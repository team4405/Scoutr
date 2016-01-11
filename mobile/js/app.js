angular.module('ionicApp', ['ionic', 'parse-angular'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'MenuCtrl'//,
    //   authRequired: true,
    //     resolve: {
    //         user: function (UserService) {
    //         var value = UserService.init();
    //         return value;
    //         }
    //     }
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "tabs.html"
        }
      }
    })
    .state('menu.tabs.buttons', {
      url: "/buttons",
      views: {
        'buttons-tab': {
          templateUrl: "buttons.html",
          controller: 'ButtonsTabCtrl'
        }
      }
    })
    .state('menu.tabs.list', {
      url: "/list",
      views: {
        'list-tab': {
          templateUrl: "list.html",
          controller: 'ListCtrl'
        }
      }
    })
    .state('menu.tabs.item', {
      url: "/item",
      views: {
        'list-tab': {
          templateUrl: "item.html"
        }
      }
    })
    .state('menu.tabs.form', {
      url: "/form",
      views: {
        'form-tab': {
          templateUrl: "form.html"
        }
      }
    })
    .state('menu.tabs.account', {
      url: "/account",
      templateUrl: "templates/account.html",
      controller: 'AccountTabCtrl'
      })
    .state('menu.keyboard', {
      url: "/keyboard",
      views: {
        'menuContent': {
          templateUrl: "keyboard.html"
        }
      }
    })
    .state('menu.slidebox', {
      url: "/slidebox",
      views: {
        'menuContent': {
          templateUrl: "slidebox.html",
          controller: 'SlideboxCtrl'
        }
      }
    })
    .state('menu.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "about.html"
        }
      }
    });

  $urlRouterProvider.otherwise("menu/tab/buttons");

})

.controller('ListCtrl', function ($scope) {

  $scope.data = {
    showDelete: false
  };

  $scope.itemButtons = [
    {
      text: 'Delete',
      type: 'button-assertive',
      onTap: function (item) {
        alert('Delete Item: ' + item.id + ' ?');
      }
    }
  ];

  $scope.onItemDelete = function (item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.items = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    }
  ];

})

.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
    
    $scope.scoutrName = "";
    $scope.scoutrTeam = "";
    
    if (Parse.User.current()){
    Parse.User.current().fetch().then(function (user) {
       $scope.scoutrName = user.get('name');
       $scope.scoutrTeam = user.get('team');
       //$cookies.put('team', $scope.scoutrTeam);
    });
    } else {
        
    };
    
    $scope.showPopup = function () {
     $ionicPopup.alert({
       title: 'Popup',
       content: 'This is ionic popup alert!'
     });
    };
    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
          titleText: 'Ionic ActionSheet',
          buttons: [
            {
              text: 'Facebook'
            },
            {
              text: 'Twitter'
            },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index) {
            console.log('BUTTON CLICKED', index);
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
    };
})

.controller('AccountTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
    
    $scope.scoutrName = "";
    $scope.scoutrTeam = "";
    
    if (Parse.User.current()){
    Parse.User.current().fetch().then(function (user) {
       $scope.scoutrName = user.get('name');
       $scope.scoutrTeam = user.get('team');
       //$cookies.put('team', $scope.scoutrTeam);
    });
    } else {
        
    };
    
    $scope.showPopup = function () {
     $ionicPopup.alert({
       title: 'Popup',
       content: 'This is ionic popup alert!'
     });
    };
    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
          titleText: 'Ionic ActionSheet',
          buttons: [
            {
              text: 'Facebook'
            },
            {
              text: 'Twitter'
            },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index) {
            console.log('BUTTON CLICKED', index);
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
    };
})

.controller('SlideboxCtrl', function($scope, $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }             
})              

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {              
  $ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up'
  });
 })
  
 .controller('AppCtrl', function() {
  
  Parse.initialize("E9CzXT1NS4T1luWwNu3jRKSHjmUIdPk0ca321pej", "TswapPftwupky3FF9fbPjB9WjBYyW5s07fQ3qFkz");
  
  ionic.Platform.ready(function() {

  });

 })
 
 
 .service('UserService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

            var parseInitialized = false;


            return {

                /**
                 *
                 * @returns {*}
                 */
                init: function () {

                    //debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize('E9CzXT1NS4T1luWwNu3jRKSHjmUIdPk0ca321pej', 'TswapPftwupky3FF9fbPjB9WjBYyW5s07fQ3qFkz');
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                /**
                 *
                 * @param _userParams
                 */
                createUser: function (_userParams) {

                    var user = new Parse.User();
                    user.set("username", _userParams.username);
                    user.set("password", _userParams.password);
                    user.set("first_name", _userParams.first_name);
                    user.set("last_name", _userParams.last_name);

                    // should return a promise
                    return user.signUp(null, {
						  success: function(user) {
						    // Hooray! Let them use the app now.
						  },
						  error: function(user, error) {
						    // Show the error message somewhere and let the user try again.
						    alert("Error: " + error.code + " " + error.message);
						  }
						});

                },
                /**
                 *
                 * @param _parseInitUser
                 * @returns {Promise}
                 */
                currentUser: function (_parseInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                    console.log("_parseInitUser " + Parse.User.current());
                    if (!_parseInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_parseInitUser);
                    }
                },
                /**
                 *
                 * @param _user
                 * @param _password
                 * @returns {Promise}
                 */
                login: function (_user, _password) {
                    return Parse.User.logIn(_user, _password);
                },
                /**
                 *
                 * @returns {Promise}
                 */
                logout: function (_callback) {
                    var defered = $q.defer();
                    Parse.User.logOut();
                    defered.resolve();
                    return defered.promise;

                }

            }
        }])
        
        
        .run(function ($rootScope, $state) {


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

		});
              
              