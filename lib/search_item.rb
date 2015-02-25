class SearchItem
  include Mongoid::Document

  field :longitude, type: Float
  field :latitude, type: Float
  field :address, type: String
  field :city_name, type: String

end