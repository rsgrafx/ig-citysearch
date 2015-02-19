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

  before do 
    if request.request_method == "POST"
      body_parameters = request.body.read
      params.merge!(JSON.parse(body_parameters))
    end
  end
  
  get '/' do
    erb :index
  end

  # http -f POST localhost:9393/recent_pics? [place]street_address='San Ignacio Town, Belize'
  post '/recent_pictures' do
    # require 'pry'
    # binding.pry

    content_type :json
    json search(params[:place])
  end

end