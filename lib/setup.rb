require 'dotenv'

module Setup

  def initialize_instagram
    setup
    Instagram.configure do |config|
      config.client_id = ENV.fetch('IG_CLIENT_ID')
    end
  end

  def setup
    Dotenv.load
  end
end