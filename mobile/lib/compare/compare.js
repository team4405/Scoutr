/*

README.md from https://github.com/Nerderer/compare

# Compare
This is a javascript to help you build comparison charts for, well, anything that you want to compare. This could be products, statistics, number of hairs on a persons head etc.

## Demo
<a href="http://www.nerderer.com/compare/demo/">Test a demo here</a>


## Requirements
This javascript does not require any other third party scripts, but still requires you to handle the input and output. It's probably easiest to use it with tools that can do the templating for you, such as AngularJS or Underscore.

## Usage
Load the script like any other javascript.
The script will not render anything for you, but simply give you an object or array of objects that are grouped and easy to loop through for presentation.


Let's say you have an array with awesome stuff that you want to compare:

  var myCoolStuffToCompare = [
    {
      title: 'Big Ass Sword of Baddassery',
      category: 'Weapons',
      price: '100 gold',
      attributes: {
        'Damage': '12-21',
      }
    },
    {
      title: 'Short Sword',
      category: 'Weapons',
      price: '25 gold',
      attributes: {
        'Damage': '7-10',
      }
    },
    {
      title: 'Wand of Foo',
      category: 'Weapons',
      price: '1250 gold',
      attributes: {
        'Damage': '8-13',
        'Fire damage': '15-25'
      }
    },
    {
      title: 'Health Potion',
      category: 'Misc',
      price: '10 gold',
      attributes: {
        'HP': '+50'
      }
    }
  ];

To get your list as a single object, use the 'getList' function. It'll take your array as the first parameter, and a default value for the second one:

  var myComparisonList = compare.getList(myCoolStuffToCompare, '-');


This returned object will look something like this:

  {
      title: ["Big Ass Sword of Baddassery", "Short Sword", "Wand of Foo", "Health Potion"],
      category: ["Weapons", "Weapons", "Weapons", "Misc"],
      price: ["100 gold", "25 gold", "1250 gold", "10 gold"],
      attributes: {
        "Damage": ["12-21", "7-10", "8-13", "-"],
        "Fire damage": ["-", "-", "15-25", "-"],
        "HP": ["-", "-", "-", "+50"]
      }
    }

As you can see, the second parameter will be used as a default value if the current item does not have such a property. This can be omitted, and will then set the default value as null.

You can also group the items you want to compare. Use the function 'getListGroupBy' for this. This one has three parameters - your array, the property you want to group on as a string, and then the default value:

  var myComparisonList = compare.getListGroupBy(myCoolStuffToCompare, 'category', '-');

This will return an array with objects similar to the example above, here grouped on the category:

  [
    {
      title: ["Big Ass Sword of Baddassery", "Short Sword", "Wand of Foo"],
      category: ["Weapons", "Weapons", "Weapons"],
      price: ["100 gold", "25 gold", "1250 gold"],
      attributes: {
        "Damage": ["12-21", "7-10", "8-13"],
        "Fire damage": ["-", "-", "15-25"]
      }
    }, {
      title: ["Health Potion"],
      category: ["Misc"],
      price: ["10 gold"],
      attributes: {
        "HP": ["+50"]
      }
    }
  ]

You can still use the 'getListGroupBy' function even if you don't want to group your items. Just set null or an empty string as the second parameter. This will return an array containing just one object.

*/
(function(window, undefined) {

  'use strict';

  var compare = (function() {

    var fillArrayWithDefaultValues = function(length, defaultValue) {
      var array = [];
      for(var i = 0; i < length; i++){
        array.push(defaultValue);
      }
      return array;
    };

    var getList = function(objectsToCompare, defaultValue) {
      var compareList  = {};

      for (var i in objectsToCompare) {
        var obj = objectsToCompare[i];

        // Add properties to list
        for(var propertyName in obj) {
          if(typeof(obj[propertyName]) !== 'object') {
            // create new property if it doesn't exist
            if(!compareList[propertyName]) {
              compareList[propertyName] = fillArrayWithDefaultValues(objectsToCompare.length, defaultValue);//new Array(objectsToCompare.length);
            }
            compareList[propertyName][i] = obj[propertyName];
          } else {
            // Handle properties of type 'object' here

            // create new property if it doesn't exist
            if(!compareList[propertyName]) {
              compareList[propertyName] = {};
            }

            for(var attributeName in obj[propertyName]) {
              // create new attribute if it doesn't exist
              if(!compareList[propertyName][attributeName]) {
                compareList[propertyName][attributeName] = fillArrayWithDefaultValues(objectsToCompare.length, defaultValue);//new Array(objectsToCompare.length);
              }
              compareList[propertyName][attributeName][i] = obj[propertyName][attributeName];
            }
          }
        }
      }

      return compareList;
    };

    var getListGroupBy = function(objectsToCompare, groupBy, defaultValue) {
      var groupedCompareList  = [];
      var groups = [];

      for (var i in objectsToCompare) {
        var obj = objectsToCompare[i];

        var groupWasFound = false;
        for(var x in groups) {
          // Insert into existing group
          if(groups[x].groupName === obj[groupBy])
          {
            groups[x].objects.push(obj);
            groupWasFound = true;
            break;
          }
        }

        // Insert into new group
        if(!groupWasFound) {
          var newGroup = {
            groupName: obj[groupBy],
            objects: [obj]
          };
          groups.push(newGroup);
        }
      }

      // Generate grouped compare list
      for(var y in groups) {
        groupedCompareList.push(getList(groups[y].objects, defaultValue));
      }

      return groupedCompareList;
    };

    return {
      getList: getList,
      getListGroupBy: getListGroupBy
    };

  })();

  window.compare = compare;

  if (typeof define === "function" && define.amd) {
    define( "compare", [], function () { return compare; } );
  }

})(window);
