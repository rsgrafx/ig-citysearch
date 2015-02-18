require 'spec_helper'

describe Search do
  before do
    class SearchCity
      include ::Search
    end
    @_search = SearchCity.new
  end
  
  context 'Geocoding' do
    it '#get_coordinates' do
      expect(@_search).to respond_to :get_coordinates
      expect(@_search.get_coordinates('San Ignacio, Belize')).to be_a Array
    end
  end

  it '#search' do
    expect(@_search.search({
                            street_address: '18 Buena Vista rd',
                            city: 'San Ignacio',
                            country: 'Belize' })).to be_a Hashie::Mash
  end

end