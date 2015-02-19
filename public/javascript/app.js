'use strict';

var CityGram = angular.module('CityGram', []);

CityGram.factory('Pictures', ['$http', '$q', function( $http, $q) {
  var pics =  {
    data_results: null,
    
    fetch: function(st_address, city, country) {
      console.log(st_address + ': no idea whatsup...')
      console.log('INSIDE THIS FUNCTION');
      var address = { 
        place: {
          street_address: st_address,
          city: city,
          country: country 
        }
      }
      return $http({ 
        url: '/recent_pictures', 
        data: JSON.stringify(address),
        method: 'POST',
        headers: 'Content-Type: application/json'
      })
    }
  }

  return pics;
}])

CityGram.controller('SearchCtrl', ['$scope', 'Pictures', function SearchCtrl($scope, Pictures) {
  var site_home = this;
  site_home.site_title = "Welcome to IG City Search";

  site_home.fetch_data = function(content) {

    window.navigator.geolocation.getCurrentPosition(
      function(position) {
        $scope.results = null;
        console.log(content)
        $scope.$apply(function() {
          site_home.position = position;
        
        Pictures.fetch(content).success(function(data, status, headers, config) {
            $scope.results = data;
            console.log(data);
        }).error(function(response, status, headers, config) {
          console.log(response.status);
      })
        })
      }
    );
    console.log($scope.results)
  }


}])