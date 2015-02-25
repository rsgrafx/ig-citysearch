require_relative 'search_item'

module Search
  def search(options)
    @options = options
    return by_coordinates if @options.fetch('coordinates', false)
    return by_address
  end

  def get_coordinates(address)
    @lat, @long= Geocoder.coordinates address
    [@lat, @long]
  end

  def by_coordinates
    Instagram.client.media_search(@options['coordinates']['latitude'], @options['coordinates']['longitude'])
  end

  def by_address
    _full_address =  @options.fetch('street_address', '')
    _full_address <<','<< @options.fetch('city', '')
    _full_address <<','<< @options.fetch('country', '')

    if get_coordinates(_full_address).compact.empty?
      get_coordinates('San Pedro Town, Belize, Central America')
    else
      Instagram.client.media_search(@lat, @long)
    end
  end

  def save(options)
    searchItem = SearchItem.new(options)
    _result = searchItem.save
    searchItem
  end

  def reverse_merge(other_hash)
    other_hash.merge(self)
  end

end

