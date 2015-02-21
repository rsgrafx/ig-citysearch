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
    var loadedImage = $filter('getbyProperty')('id', itemId, $scope.picture_results)
    $scope.loadedImage = loadedImage;
    console.log($scope.loadedImage)

    $scope.updateCoords();
    $scope.updateMap();

    google.maps.event.addDomListener(window, 'load', $scope.updateMap);
    return document.Coords.data = scope;

  }

  $scope.updateCoords = function() {
    document.Coords.lat = $scope.loadedImage.location.latitude;
    document.Coords.long = $scope.loadedImage.location.longitude;
  }

  $scope.updateMap = function(lat, long) {
      var map, map_canvas, map_options;
      map_canvas = document.getElementById("map_canvas");
        map_options = {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(document.Coords.lat, document.Coords.long),
          zoom: 15
        }
    return map = new google.maps.Map(map_canvas, map_options);
  };


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
