$:.unshift File.join(__FILE__, "../lib")

require 'bundler/setup'

Bundler.require

require 'setup'
require 'search'
require 'search_item'

class CityGram < Sinatra::Base

  extend Setup
  include Search

  configure :development do
    require 'pry'
    Bundler.setup(:default, :assets, :development)
    set :environment, :development
    enable :sessions, :logging, :static, :inline_templates, :method_override, :dump_errors, :run
    Mongoid.load!(File.expand_path(File.join("config", "mongoid.yml")))
  end

  configure :test do
    Bundler.setup(:default, :test)
    set :environment, :test
    enable :sessions, :static, :inline_templates, :method_override, :raise_errors
    disable :run, :dump_errors, :logging
    Mongoid.load!(File.expand_path(File.join("config", "mongoid.yml")))
  end

  configure :production do
    Bundler.setup(:default, :production)
    set :environment, :production
    enable :sessions, :logging, :static, :inline_templates, :method_override, :dump_errors, :run
    Mongoid.load!(File.expand_path(File.join("config", "mongoid.yml")))
  end

  Tilt.register Tilt::ERBTemplate, 'html.erb'
  set :static, true
  set :public_folder, File.expand_path(File.dirname(__FILE__)) + '/public'

  initialize_instagram

  before do 
    if request.request_method == 'POST'
      body_parameters = request.body.read
      params.merge!(JSON.parse(body_parameters))
    end
  end
  
  get '/' do
    erb :index
  end

  # http -f POST localhost:9393/recent_pics? [place]street_address='San Ignacio Town, Belize'
  post '/recent_pictures' do
    content_type :json
    json search(params[:place])
  end

  post '/location_name' do
    content_type :json
    searchItem = save(params[:location])
    json searchItem
    # binding.pry
  end

end