
# IG-City Search.

I got inspired go do this after seeing - by Coordstagram [here's a demo coordstagram app](http://gowanus.herokuapp.com/) on hacker news. Coordstagram which is a Rails application.  Doing a lot of cool things. 

This is a Sinatra and AngularJS that queries the Instagram API - for images based on a location. The location is parsed. the coordinates are passed to instagram api.and the media elements are returned.  ( Nothing is stored ) This was mainly for me to relearn a bit of angular - by reimplementing some of the functionality in Coordstagram.

( Angular is Awesome in my opinion )  So I figured why not.

For example, [here's a demo app](http://city-search.herokuapp.com/)

TODO: 
  * Implement Modal Next / Previous.
  * Implement Data Store ( After learning about more Instagram policies.)
  * Trending in City.
  * Move images rendering to angular directive.
  * Check for Videos - Create angular directive.

Fork and follow Heroku documentation to push up your own copy.

heroku config:set IG_CLIENT_ID=<YOUR CLIENT ID>


