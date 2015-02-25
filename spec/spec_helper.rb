$LOAD_PATH.unshift(File.dirname(__FILE__)+'/lib')

require 'pathname'
require 'rspec'
require 'pry'

Dir[Pathname.new(File.dirname(__FILE__))
  .join('support/**/*.rb')]
  .each { |f| 
    load f 
  }

require './app'
