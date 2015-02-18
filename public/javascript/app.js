'use strict';

var CityGram = angular.module('CityGram', []);

CityGram.controller('SearchCtrl', ['Pictures', function SearchCtrl(Pictures) {
  var site_home = this;
  site_home.site_title = "Welcome to IG City Search";

  site_home.fetch_data = function(content) {
    console.log(content);
  }
}])

CityGram.factory('Pictures', ['$http', '$q', function($http, $q) {
  
  var pics =  {
    fetch: function(st_address, city, country) {
      $http.post('http://localhost:9000/recent_pictures', { street_address: st_address, city: city, country: country })
      .success(function(response, status, headers, config) {
        pics.pictures = response.body
      })
      .error(function(response, status, headers, config) {
        console.log(response.status);
      })
    }
  }
  return pics;

}])
