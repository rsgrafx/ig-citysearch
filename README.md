
# IG-City Search.

I got inspired go do this after seeing - Coordstagram [here's the demo coordstagram app](http://gowanus.herokuapp.com/) on hacker news. Coordstagram which is a Rails application does a lot of cool things truly demonstrating what Rails is capable of doing all around. But for me most of the functionality being demo'd was client side why not go with a backend service and move the heavy lifting to front-end tech.

This is a Sinatra and AngularJS that queries the Instagram API - for images based on a location. The location is parsed. the coordinates are passed to instagram api.and the media elements are returned. There is no persistence layer but feel free to fork and create one. This was mainly for me to keep working with Angular - by reimplementing some of the functionality I found in Coordstagram.

( Angular is Awesome in my opinion ) So I figured why not.

[Here's the demo app](http://city-gram.herokuapp.com/)

TODO: 
  * Implement Modal Next / Previous.
  * Implement Data Store ( After learning about more Instagram policies.)
  * Trending in City.
  * Move images rendering to angular directive.
  * Check for Videos - Create angular directive.

Fork and follow Heroku documentation to push up your own copy.

heroku config:set IG_CLIENT_ID=<YOUR CLIENT ID>


