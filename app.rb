require_relative 'app_config'

class CityGram

  extend Setup
  include Search

  Tilt.register Tilt::ERBTemplate, 'html.erb'
  set :static, true
  # set :sockets, []
  set :public_folder, File.expand_path(File.dirname(__FILE__)) + '/public'

  initialize_instagram

  uri = URI.parse(ENV["REDISTOGO_URL"])
  REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

  set :redis, REDIS
  set(:watcher, Thread.new do
    redis = Redis.new
    Thread.current['sockets'] = []
    redis.subscribe 'chat_screen' do |on|
      on.message do |channel, message|
        Thread.current['sockets'].each do |s|
          s.send message
        end
      end
    end
  end)

  before do 
    if request.request_method == 'POST'
      body_parameters = request.body.read
      params.merge!(JSON.parse(body_parameters))
    end
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
  end

  get '/' do
    if !request.websocket?
      erb :index
    else
      request.websocket do |ws|
        ws.onopen do
          ws.send( {'sender' => 'CityGram', message: 'Give a Shout Out!'}.to_json )
          settings.watcher['sockets'] << ws
        end

        ws.onmessage do |msg|
          # binding.pry
          settings.redis.publish 'chat_screen', msg
          # EM.next_tick { settings.sockets.each{|s| s.send(msg) } }
        end

        ws.onclose do
          warn("websocket closed")
          settings.watcher['sockets'].delete(ws)
          # settings.sockets.delete(ws)
        end
      end
    end
  end 
end
