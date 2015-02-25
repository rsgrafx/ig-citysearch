require_relative 'search_item'

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

  def save(options)
    if options['longitude'].to_s.empty?
      lat, long= Geocoder.coordinates(options['city_name'])
      options['longitude'] = long
      options['latitude'] = lat
    end
    searchItem = SearchItem.new(options)
    _result = searchItem.save
    searchItem
  end

  def reverse_merge(other_hash)
    other_hash.merge(self)
  end

end

