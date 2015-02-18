require 'spec_helper'

describe CityGram do
   it 'includes Search # Setup' do
      expect(CityGram.const_defined?(:Search)).to be_truthy
      expect(CityGram.const_defined?(:Setup)).to be_truthy
   end

   it 'CityGram.setup' do
     expect(CityGram.setup).to be_a Hash
     expect(CityGram.setup.fetch('IG_CLIENT_ID')).to be_a String
   end

end