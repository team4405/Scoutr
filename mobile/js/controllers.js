angular.module('starter.controllers', [])

.controller('IntroCtrl', function($scope, $state) {

    // Called to navigate to the main app
  var startApp = function() {
    $state.go('main.home');

    // Set a flag that we finished the tutorial
    window.localStorage['didTutorial'] = true;
  };

  //No this is silly
  // Check if the user already did the tutorial and skip it if so
  /*if(window.localStorage['didTutorial'] === "true") {
    console.log('Skip intro');
    startApp();
  }*/

  // Move to the next slide
  $scope.next = function() {
    $scope.$broadcast('slideBox.nextSlide');
  };

  // Our initial right buttons
  var rightButtons = [
    {
      content: 'Next',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Go to the next slide on tap
        $scope.next();
      }
    }
  ];

  // Our initial left buttons
  var leftButtons = [
    {
      content: 'Skip',
      type: 'button-positive button-clear',
      tap: function(e) {
        // Start the app on tap
        startApp();
      }
    }
  ];

  // Bind the left and right buttons to the scope
  $scope.leftButtons = leftButtons;
  $scope.rightButtons = rightButtons;


  // Called each time the slide changes
  $scope.slideChanged = function(index) {

    // Check if we should update the left buttons
    if(index > 0) {
      // If this is not the first slide, give it a back button
      $scope.leftButtons = [
        {
          content: 'Back',
          type: 'button-positive button-clear',
          tap: function(e) {
            // Move to the previous slide
            $scope.$broadcast('slideBox.prevSlide');
          }
        }
      ];
    } else {
      // This is the first slide, use the default left buttons
      $scope.leftButtons = leftButtons;
    }

    // If this is the last slide, set the right button to
    // move to the app
    if(index == 2) {
      $scope.rightButtons = [
        {
          content: 'Start using Scoutr',
          type: 'button-positive button-clear',
          tap: function(e) {
            startApp();
          }
        }
      ];
    } else {
      // Otherwise, use the default buttons
      $scope.rightButtons = rightButtons;
    }
  };
})

.controller('PitScoutController', function PitScoutController($scope, $state, angularFire) {

    // Called to navigate to the main app
  var exitScoutForm = function() {
    $state.go('main.home');
  };

  // Our initial right buttons
  var rightButtons = [
    {
      content: 'Submit',
      type: 'button-clear',
      tap: function(e) {
        console.log("Submitting Data - ", $scope.newTeam);
        $scope.teams.push($scope.newTeam);
        $scope.newMatch = '';
        $scope.newTeam = angular.copy($scope.emptyTeam);
      }
    }
  ];

  // Our initial left buttons
  var leftButtons = [
    {
      content: 'Close',
      type: 'button-clear',
      tap: function(e) {
        // Start the app on tap
        exitScoutForm();
      }
    }
  ];

  // Bind the left and right buttons to the scope
  $scope.leftButtons = leftButtons;
  $scope.rightButtons = rightButtons;

  var url = 'https://scouter.firebaseio.com/teams/';
  var promise = angularFire(url, $scope, 'teams', []);
  $scope.newTeam = {};
  $scope.emptyTeam= {};


  promise.then(function() {
    $scope.add = function() {
      console.log("Submitting Data - ", $scope.newTeam);
      $scope.teams.push($scope.newTeam);
      $scope.newMatch = '';
      $scope.newTeam = angular.copy($scope.emptyTeam);
    };
  });

})

.controller('MatchScoutController', function MatchScoutController($scope, $state, angularFire) {

    // Called to navigate to the main app
  var exitScoutForm = function() {
    $state.go('main.home');
  };

  // Our initial right buttons
  var rightButtons = [
    {
      content: 'Submit',
      type: 'button-clear',
      tap: function(e) {
        console.log("Submitting Data - ", $scope.newMatch);
        $scope.matches.push($scope.newMatch);
        $scope.newMatch = '';
        $scope.newMatch = angular.copy($scope.emptyMatch);
      }
    }
  ];

  // Our initial left buttons
  var leftButtons = [
    {
      content: 'Close',
      type: 'button-clear',
      tap: function(e) {
        // Start the app on tap
        exitScoutForm();
      }
    }
  ];

  // Bind the left and right buttons to the scope
  $scope.leftButtons = leftButtons;
  $scope.rightButtons = rightButtons;

  var url = 'https://scouter.firebaseio.com/matches/';
  var promise = angularFire(url, $scope, 'matches', []);
  $scope.newMatch = {};
  $scope.emptyMatch= {};


  promise.then(function() {
    $scope.add = function() {
      console.log("Submitting Data - ", $scope.newMatch);
      $scope.matches.push($scope.newMatch);
      $scope.newMatch = '';
      $scope.newMatch = angular.copy($scope.emptyMatch);
    };
  });

})



.controller('MainController', [ '$scope', '$ionicModal', function($scope, $ionicModal) {

        $scope.toIntro = function(){
          window.localStorage['didTutorial'] = "false";
          $state.go('intro');
        }

        $scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }

        /*
        // Modal 1
        $ionicModal.fromTemplateUrl('templates/pit.html', {
          id: '1', // We need to use and ID to identify the modal that is firing the event!
          scope: $scope,
          backdropClickToClose: true,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.oModal1 = modal;
        });

        // Modal 2
        $ionicModal.fromTemplateUrl('templates/match.html', {
          id: '2', // We need to use and ID to identify the modal that is firing the event!
          scope: $scope,
          backdropClickToClose: true,
          focusFirstInput: true,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.oModal2 = modal;
        });

        $scope.openModal = function(index) {
          if(index == 1) $scope.oModal1.show();
          else $scope.oModal2.show();
        };

        $scope.closeModal = function(index) {
          if(index == 1) $scope.oModal1.hide();
          else $scope.oModal2.hide();
        };

        $scope.$on('$destroy', function() {
          console.log('Destroying modals...');
          $scope.oModal1.remove();
          $scope.oModal2.remove();
        });
        */

    }])

    .controller('HomePageController', [ '$scope', '$state', '$ionicModal', 'Teams', function($scope, $state, $ionicModal, Teams) {

        $scope.navTitle = 'Scoutr Home';


        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];

        $scope.rightButtons = [
		{
            type: 'padding button button-clear',
            content: 'Desktop&nbsp;',
            tap: function(e) {
			  window.globalScope.$location.url("https://scoutr.parseapp.com");
              $scope.$apply();   //go back to desktop 
            }
        },	
        {
            type: 'padding button button-clear',
            content: 'Pit&nbsp;',
            tap: function(e) {
              $state.go('pit');
            }
        },
        {
            type: 'padding button button-clear',
            content: '&nbsp;Match',
            tap: function(e) {
              $state.go('match');
            }
        }];

        Teams.getAll().success(function(data){
            $scope.teams=data;
            console.log($scope.teams);
            //console.log(data);
        });

    }])

    .controller('DataPageController', [ '$scope', '$state', '$ionicModal', function($scope, $state, $ionicModal) {

      $scope.navTitle = 'Scoutr Data Export';

      $scope.leftButtons = [{
          type: 'button-icon icon ion-navicon',
          tap: function(e) {
              $scope.toggleMenu();
          }
      }];

      $scope.rightButtons = [
      {
          type: 'padding button button-clear',
          content: 'Pit&nbsp;',
          tap: function(e) {
            $state.go('pit');
          }
      },
      {
          type: 'padding button button-clear',
          content: '&nbsp;Match',
          tap: function(e) {
            $state.go('match');
          }
      }];
    }])

    .controller('InfoPageController', [ '$scope', '$state', '$ionicModal', function($scope, $state, $ionicModal) {
      $scope.navTitle = 'Scoutr Credits';

      $scope.leftButtons = [{
          type: 'button-icon icon ion-navicon',
          tap: function(e) {
              $scope.toggleMenu();
          }
      }];

      $scope.rightButtons = [
      {
          type: 'padding button button-clear',
          content: 'Pit&nbsp;',
          tap: function(e) {
            $state.go('pit');
          }
      },
      {
          type: 'padding button button-clear',
          content: '&nbsp;Match',
          tap: function(e) {
            $state.go('match');
          }
      }];
    }])

    .controller('MatchesPageController', [ '$scope', '$state', '$ionicModal', function($scope, $state, $ionicModal) {
        $scope.navTitle = 'Scoutr Matches';

        var url = 'https://scouter.firebaseio.com/matches/';
        var promise = angularFire(url, $scope, 'matches', []);
        $scope.newMatch = {};
        $scope.emptyMatch= {};


        promise.then(function() {
          $scope.add = function() {
            console.log("Submitting Data - ", $scope.newMatch);
            $scope.matches.push($scope.newMatch);
            $scope.newMatch = '';
            $scope.newMatch = angular.copy($scope.emptyMatch);
          };
        });

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];

        $scope.rightButtons = [
        {
            type: 'padding button button-clear',
            content: 'Pit&nbsp;',
            tap: function(e) {
              $state.go('pit');
            }
        },
        {
            type: 'padding button button-clear',
            content: '&nbsp;Match',
            tap: function(e) {
              $state.go('match');
            }
        }];

    }])

    .controller('TeamsPageController', [ '$scope', '$state', '$firebaseArray', 'Teams', function($scope, $state, $firebaseArray, Teams) {
        $scope.navTitle = 'Scoutr Teams';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];

        $scope.rightButtons = [
        {
            type: 'padding button button-clear',
            content: 'Pit&nbsp;',
            tap: function(e) {
              $state.go('pit');
            }
        },
        {
            type: 'padding button button-clear',
            content: '&nbsp;Match',
            tap: function(e) {
              $state.go('match');
            }
        }];

        Teams.getAll().success(function(data){
            $scope.teams=data;
            console.log($scope.teams);
            //console.log(data);
        });

    }])

    .controller('TeamDetailController', [ '$scope', '$state', '$ionicModal', 'Teams', function($scope, $state, $ionicModal, Teams) {
      $scope.navTitle = 'Scoutr Team Details';

      $scope.leftButtons = [{
          type: 'button-icon icon ion-navicon',
          tap: function(e) {
              $scope.toggleMenu();
          }
      }];

      $scope.rightButtons = [
      {
          type: 'padding button button-clear',
          content: 'Pit&nbsp;',
          tap: function(e) {
            $state.go('pit');
          }
      },
      {
          type: 'padding button button-clear',
          content: '&nbsp;Match',
          tap: function(e) {
            $state.go('match');
          }
      }];

      Teams.getTeam().success(function(data){
          $scope.team=data;
          console.log($scope.team);
          //console.log(data);
      });

    }])

    .controller('TeamComparisonController', [ '$scope', '$state', '$ionicModal', function($scope, $state, $ionicModal) {
      $scope.navTitle = 'Scoutr Team Comparison';

      $scope.leftButtons = [{
          type: 'button-icon icon ion-navicon',
          tap: function(e) {
              $scope.toggleMenu();
          }
      }];

      $scope.rightButtons = [
      {
          type: 'padding button button-clear',
          content: 'Pit&nbsp;',
          tap: function(e) {
            $state.go('pit');
          }
      },
      {
          type: 'padding button button-clear',
          content: '&nbsp;Match',
          tap: function(e) {
            $state.go('match');
          }
      }];

        var selectedProducts = [];

        // allProducts is loaded from all_products.js.
        // This is just for demo purposes, and should probably be a more dynamic list in a real scenario.
        $scope.allProducts = allProducts;

        $scope.compareList = [];

        $scope.updateGroup = function () {
          $scope.compareList = compare.getListGroupBy(selectedProducts, $scope.groupBy, '-');
        };

        $scope.addToCompareList = function (item) {
          selectedProducts.push(item);
          $scope.updateGroup();
        };
    }])

    .controller('TeamsPageController', [ '$scope', '$state', '$ionicModal', function($scope, $state, $ionicModal) {
      $scope.navTitle = 'Scoutr Teams';

      $scope.leftButtons = [{
          type: 'button-icon icon ion-navicon',
          tap: function(e) {
              $scope.toggleMenu();
          }
      }];

      $scope.rightButtons = [
      {
          type: 'padding button button-clear',
          content: 'Pit&nbsp;',
          tap: function(e) {
            $state.go('pit');
          }
      },
      {
          type: 'padding button button-clear',
          content: '&nbsp;Match',
          tap: function(e) {
            $state.go('match');
          }
      }];

    }]);

    function startWatch($scope) {
      $scope.add = function() {
        console.log($scope.newMatch);
        $scope.matches.push($scope.newMatch);
        $scope.newMatch = '';
      };
    };
