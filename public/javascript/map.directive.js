CityGram.directive('map', function() {
  return {
    restrict: 'AE',
    transclude: true,
    template: "<div id='mapshowplace'><script> </script><div id='map_canvas' class='map'> </div></div>",
    replace: true,
    scope: {
      longitude: "@",
      latitude: "@",
      placeId: "="
    },
    link: function(scope, element, attrs) {
      var initialize;
      scope.$watch('longitude', function(value) {
        return document.Coords.long = value;
      });
      scope.$watch('latitude', function(value) {
        document.Coords.lat = value;
        return initialize();
      });
      
      document.Coords = {}

      initialize = function(lat, long) {
        var map, map_canvas, map_options;
        map_canvas = document.getElementById("map_canvas");

          console.log('Insdie fucntion');
          console.log(document.Coords.lat);
          console.log('OUTSIDE fucntion');

        map_options = {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: new google.maps.LatLng(document.Coords.lat, document.Coords.long),
          zoom: 15
        };
        return map = new google.maps.Map(map_canvas, map_options);
      };

      google.maps.event.addDomListener(window, 'load', initialize);
      return document.Coords.data = scope;

    }
  };
});