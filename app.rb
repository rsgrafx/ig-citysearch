require 'bundler/setup'

Bundler.require

require './lib/setup'
require './lib/search'

class CityGram < Sinatra::Base

  extend Setup
  include Search

  Tilt.register Tilt::ERBTemplate, 'html.erb'
  set :static, true
  set :public_folder, File.expand_path(File.dirname(__FILE__)) + '/public'

  initialize_instagram
  
  get '/' do
    erb :index
  end

  # http -f GET localhost:9393/recent_pics? [place]street_address='San Ignacio Town, Belize'
  get '/recent_pics' do
    content_type :json
    json search(params[:place])
  end

end