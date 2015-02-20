'use strict';

var CityGram = angular.module('CityGram', ['locations.google', 'ig.citysearch.factories']);

CityGram.controller('SearchCtrl', ['$scope', '$filter', 'Pictures','IGResults', function SearchCtrl($scope, $filter, Pictures, IGResults) {
  $scope.picture_results = null;
  var site_home = this;
  site_home.site_title = "Welcome to IG City Search";
  
  $scope.set_pic_data = function(items) {
    console.log(IGResults.data);
    $scope.picture_results = IGResults.data;
  }

  $scope.individualIGimage = function(itemId) {
    $scope.loadedImage = $filter('getbyProperty')('id', itemId, $scope.picture_results)
    console.log($scope.loadedImage)
  }

  site_home.fetch_data = function(content) {
    window.navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.$apply(function() {
          site_home.position = position;
        })
    });
  }
}])
.filter('getbyProperty', function() {
  /*
   I could have used underscore _.find 
   but no need to load an entire lib for one function
  */
  return function( propertyName, propertyValue, collection) {
    var i=0, lenght=collection.length;
    
    for(i; i<lenght; i++) {
      if (collection[i][propertyName] == propertyValue) {
        return collection[i];
      }
    }
    return null;
  }
})

