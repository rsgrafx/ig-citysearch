angular.module('ig.citysearch.factories', []).factory('Pictures', ['$http', '$q', function( $http, $q) {
  var pics =  {
    data_results: null,
    
    fetch: function(address) {
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

angular.module('locations.google', ['ig.citysearch.factories'])
    .directive('googleplace', ['currentCity' ,'Pictures','IGResults', '$location', '$http',
      function(currentCity, Pictures, IGResults, $location, $http) {
    return {
        link: function(scope, element, attrs) {
                    var options = {
                        types: ['(cities)'],
                        componentRestrictions: {}
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
                            place: {
                              street_address: current_city.formatted_address
                            }
                          }
                        // var address = { city: current_city.formatted_address }
                        Pictures.fetch(address).success( function(data) {
                              IGResults.data = data;

                        })
                    });
                }

    }
}])
.service('IGResults', function() {
  return { data: '' }
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
    });
