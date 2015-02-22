module Search
  def search(options)

    if options.fetch('coordinates', false)
      lat = options['coordinates']['latitude']
      long = options['coordinates']['longitude']
      return Instagram.client.media_search(lat, long)
    end

    _full_address = options.fetch('street_address', '')
    _full_address << options.fetch('city', '')
    _full_address << options.fetch('country', '')
    # Last Resort * Hello Brooklyn
    if options.empty?
      _full_address = 'Brooklyn, New York City'
    end

    lat, long = get_coordinates(_full_address)
    Instagram.client.media_search(lat, long)
  end

  def get_coordinates(address)
    lat, long= Geocoder.coordinates address
    [lat, long]
  end
end