module Setup

  def initialize_instagram
    setup if ENV['RACK_ENV'] == 'development' || ENV['RACK_ENV'] == nil
    Instagram.configure do |config|
      config.client_id = ENV.fetch('IG_CLIENT_ID')
    end
  end

  def setup
    require 'dotenv'
    Dotenv.load
  end
end