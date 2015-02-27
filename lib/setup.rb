module Setup

  def initialize_instagram
    setup if local_environment?
    Instagram.configure do |config|
      config.client_id = ENV.fetch('IG_CLIENT_ID')
    end
  end

  def setup
    require 'dotenv'
    Dotenv.load
  end

  def local_environment?
    ['development', 'test', 'testing', nil].include? ENV['RACK_ENV']
  end
end