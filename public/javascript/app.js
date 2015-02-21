'use strict';

var CityGram = angular.module('CityGram', ['locations.google', 'ig.citysearch.factories']);

CityGram.controller('SearchCtrl', ['$scope', '$filter', 'Pictures','IGResults', 'PaginationItem', 
  function SearchCtrl($scope, $filter, Pictures, IGResults, PaginationItem) {
  $scope.picture_results = null;
  var site_home = this;
  site_home.site_title = "Welcome to IG City Search";


  $scope.set_pic_data = function(items) {
    $scope.picture_results = IGResults.data;
  }

  $scope.individualIGimage = function(itemId) {
    var loadedImage = $filter('getbyProperty')('id', itemId, $scope.picture_results)
    $scope.setupPagination(loadedImage)
    $scope.loadedImage = loadedImage;
    $scope.updateCoords();
    $scope.updateMap();
  }

  $scope.setupPagination = function(obj) {
    PaginationItem.imgObj = obj;

    if (isNaN(PaginationItem.imgObj.paginationId)) {
      // reset
        var itemId = PaginationItem.imgObj.id
        var resetImg = $filter('getbyProperty')('id', itemId, $scope.picture_results)

        PaginationItem.currentId =  resetImg.paginationId
        PaginationItem.previousId = resetImg.paginationId - 1
        PaginationItem.nextId = resetImg.paginationId + 1

    } else {
        PaginationItem.currentId = obj.paginationId
        PaginationItem.previousId = obj.paginationId - 1
        PaginationItem.nextId = obj.paginationId + 1
    }
    return PaginationItem;
  }

  $scope.previousItem = function() {
    console.log(PaginationItem);
    $scope.setupPagination($scope.picture_results[PaginationItem.previousId]);
    console.log(PaginationItem);
    $scope.loadedImage = PaginationItem.imgObj;
  }

  $scope.paginationMap = function() {
    document.Coords.lat  = PaginationItem.imgObj.location.latitude;
    document.Coords.long = PaginationItem.imgObj.location.longitude;
  }

  $scope.nextItem = function() {
    console.log(PaginationItem);
    $scope.setupPagination($scope.picture_results[PaginationItem.nextId]);
    console.log(PaginationItem);
    $scope.loadedImage = PaginationItem.imgObj;

  }

  $scope.updateCoords = function() {
    document.Coords.lat  = $scope.loadedImage.location.latitude;
    document.Coords.long = $scope.loadedImage.location.longitude;
  }

  $scope.updateMap = function(lat, long) {
      var map, map_canvas, map_options;

      map_canvas = document.getElementById("map_canvas");
        map_options = {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(document.Coords.lat, document.Coords.long),
          zoom: 10
        }
    var map = new google.maps.Map(map_canvas, map_options);
    var marker = new google.maps.Marker({
      position: map_options.center,
      map: map,
      title: '#mapped'
    })
    google.maps.event.addDomListener(window, 'load', $scope.updateMap);
  };


  site_home.fetch_data = function(content) {
    window.navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.$apply(function() {
          site_home.position = position;
          console.log(position)
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
        collection[i].paginationId = i;
        return collection[i];
      }
    }
    return null;
  }
})
