angular.module('starter.directives', [])

  .directive('heyhey', function () {
    return {
      restrict: 'A',
      link: function ($scope, $elem, attrs) {
        $("#overal_rating").ionRangeSlider({
            from: 0,
            values: [
                "0", "1",
                "2", "3",
                "4", "5",
                "6", "7",
                "8", "9",
                "10"
            ]
        });
      }
    }
  });
