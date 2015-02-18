module Search
  def search(options)
    _full_address = options.fetch('street_address', '')
    _full_address << options.fetch('city', '')
    _full_address << options.fetch('country', '')

    if _full_address.empty?
      _full_address = 'Brooklyn, New York City'
    end

    lat, long = get_coordinates(_full_address)
    Instagram.client.media_search(lat, long)
  end

  def get_coordinates(address)
    Geocoder.coordinates address
  end
end