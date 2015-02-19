'use strict';

var CityGram = angular.module('CityGram', ['locations.google', 'ig.citysearch.factories']);

CityGram.controller('SearchCtrl', ['$scope', 'Pictures','IGResults', function SearchCtrl($scope, Pictures, IGResults) {
  $scope.picture_results = null;
  var site_home = this;
  site_home.site_title = "Welcome to IG City Search";
  
  $scope.set_pic_data = function(items) {
    
    console.log('THOSE IT REACH HERE??')
    $scope.picture_results = IGResults.data;
    console.log($scope.picture_results)
    console.log('and --- ??')
  }

  site_home.fetch_data = function(content) {
    window.navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.$apply(function() {
          site_home.position = position;
        }) //$apply.
    });
  }

}])