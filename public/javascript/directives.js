angular.module('ig.citysearch.factories', []).factory('Pictures', ['$http', '$q', function( $http, $q) {
  var pics =  {
    data_results: null,
    
    fetch: function(address) {
      return $http({ 
        url: '/recent_pictures', 
        data: address,//JSON.stringify(address),
        method: 'POST',
        headers: 'Content-Type: application/json'
      })
    },
    save_search: function(coords) {
      return $http({
        url: '/location_name',
        data: JSON.stringify(coords),
        method: 'POST',
        headers: 'Content-Type: application/json'
      })
    }
  }
  return pics;
}])
.factory('PaginationItem', function() {
  return {
    imageObj: '',
    nextId: '',
    previousId: '',
    currentId: ''
  }
})

angular.module('locations.google', ['ig.citysearch.factories'])
    .directive('googleplace', ['currentCity' ,'Pictures','IGResults', '$location', '$http',
      function(currentCity, Pictures, IGResults, $location, $http) {
    return {
        link: function(scope, element, attrs) {
                    var options = {
                        types: ['(cities)']
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        var place = scope.gPlace.getPlace();

                        var current_city = {
                          name: place.name,
                          formatted_address: place.formatted_address,
                          location: {
                            lat: place.geometry.location.lb,
                            lng: place.geometry.location.mb
                          }
                        }
                        currentCity.setProperty(current_city);
                        var address = {
                            title: current_city.formatted_address,
                            place: {
                              street_address: current_city.formatted_address
                            }
                          }
                        Pictures.fetch(address).success( function(response) {
                              IGResults.data = response;
                              IGResults.location_title = current_city.formatted_address;
                              setTimeout(function(response) { scope.$apply(scope.set_pic_data()) }, 500);
                        })
                        var save_search = {
                          location: {
                            city_name: current_city.formatted_address,
                            address: current_city.name,
                            longitude: (current_city.location.long || ''),
                            latitude: (current_city.location.lat || '')
                          }
                        }
                        Pictures.save_search(save_search).success(function(response) {
                          console.log('search saved');
                          console.log(response);
                        }) 
                    });
                }

    }
}])
.service('IGResults', function() {
  return { data: '', location_title: '' }
})
.service('currentCity', function () {
        var current_city = {
            name: "",
            formatted_address: "",
            location: {
                lat: "",
                lng: ""
            }
        }

        return {
            getProperty: function () {
                return current_city;
            },
            setProperty: function(value) {
                current_city = value;
            }
        };
})
.directive('compile', ['$compile', function($compile) {

    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          // return scope.$eval(attrs.myCompileUnsafe);
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM element
          element.html(value);
          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
    };
  }]);
