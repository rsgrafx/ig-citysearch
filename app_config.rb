$:.unshift File.join(__FILE__, "../lib")

require 'bundler/setup'

Bundler.require

require 'setup'
require 'search'
require 'search_item'

class CityGram < Sinatra::Base

  configure :development do
    require 'pry'
    Bundler.setup(:default, :assets, :development)
    set :environment, :development
    enable :sessions, :logging, :static, :inline_templates, :method_override, :dump_errors, :run
    Mongoid.load!(File.expand_path(File.join("config", "mongoid.yml")))
    REDIS = Redis.new
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
    uri = URI.parse(ENV["REDISTOGO_URL"])
    REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
  end

end