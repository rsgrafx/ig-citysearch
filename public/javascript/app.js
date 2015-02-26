'use strict';

var CityGram = angular.module('CityGram', ['locations.google', 'ig.citysearch.factories']);

CityGram.controller('NavSearchCtrl', ['$scope', 'IGResults', function($scope, IGResults) {
  var container = this;
  $scope.set_pic_data = function() {
    console.log('Sharing Data.')
  }
}])

CityGram.controller('SearchCtrl', 

  ['$scope', '$filter', 'Pictures','IGResults', 'PaginationItem',function SearchCtrl($scope, $filter, Pictures, IGResults, PaginationItem) {

  $scope.picture_results = null;
  $scope.location_title = '';
  var site_home = this;

  $scope.set_pic_data = function() {
    $scope.location_title = IGResults.location_title;
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
    $scope.setupPagination($scope.picture_results[PaginationItem.previousId]);
    $scope.loadedImage = PaginationItem.imgObj;
    $scope.paginationMap();
    $scope.updateMap();
  }

  $scope.paginationMap = function() {
    document.Coords.lat  = PaginationItem.imgObj.location.latitude;
    document.Coords.long = PaginationItem.imgObj.location.longitude;
  }

  $scope.nextItem = function() {
    $scope.setupPagination($scope.picture_results[PaginationItem.nextId]);
    $scope.loadedImage = PaginationItem.imgObj;
    $scope.paginationMap();
    $scope.updateMap();
  }

  $scope.updateCoords = function() {
    document.Coords.lat  = $scope.loadedImage.location.latitude;
    document.Coords.long = $scope.loadedImage.location.longitude;
  }

  $scope.updateMap = function() {
      var map, map_canvas, map_options;

      map_canvas = document.getElementById("map_canvas");
        map_options = {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(document.Coords.lat, document.Coords.long),
          zoom: 15
        }
    var map = new google.maps.Map(map_canvas, map_options);
    var marker = new google.maps.Marker({
      position: map_options.center,
      map: map,
      title: '#mapped'
    })
    google.maps.event.addDomListener(window, 'load', $scope.updateMap);
  };

  $scope.fetch_initial_data = function() {
    window.navigator.geolocation.getCurrentPosition( function(position) {
        $scope.$apply(function() {

          site_home.position = position; 
          var geocoder, address;

          var coords = { 
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }

          var address = { 
            place: { 
              street_address: '',
              coordinates: coords
              }
          }

          function getCityfromLatLong(address) {
            geocoder = new google.maps.Geocoder();
            var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

            geocoder.geocode({'latLng': latLng}, function(results, status) {
              if(status==google.maps.GeocoderStatus.OK) {
                address.place.street_address = results[0].formatted_address;
              }
            })
          }

          getCityfromLatLong(address)

          Pictures.fetch(address).success( function(data, status, headers, config) {
            $scope.location_title = address.place.street_address;
            IGResults.location_title = address.place.street_address;
            IGResults.data = data;


            $scope.setChatLocation = function(address) { 
              var items= address.place.street_address.split(',');
              var last_item = items[items.length - 1];
              
              var search = {
              short_name: last_item,
              location: {
                city_name: address.place.street_address,
                address:   address.place.street_address,
                longitude: coords.longitude,
                latitude:  coords.latitude
                }
              }
              document.ChatLocation = search;
           }(address);


            console.log($scope.sNameList)
            // var sName = sNameList[sNameList.length - 1]
            var search = {
              location: {
                city_name: address.place.street_address,
                address:   address.place.street_address,
                longitude: coords.longitude,
                latitude:  coords.latitude
              }
            }
            console.log(document.ChatLocation)
            Pictures.save_search(search).success(function(response) {
              console.log(response);
            })
            setTimeout(function(data) { $scope.$apply($scope.set_pic_data()) }, 500);
          })
        })

    });
  
  }
  $scope.fetch_initial_data()
  $scope.$watch($scope.set_pic_data)
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
