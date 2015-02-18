Bundler.require

require './lib/setup'
require './lib/search'


class CityGram < Sinatra::Base
  get '/' do
    ENV.fetch('RACK_ENV')
  end
end