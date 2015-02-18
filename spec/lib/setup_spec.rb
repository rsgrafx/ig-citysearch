require 'spec_helper'

describe Setup do 
  it 'requires Yaml load' do 
    expect(Setup.load).to be_a Hash
  end
end