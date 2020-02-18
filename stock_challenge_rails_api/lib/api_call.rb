require 'rubygems'
require 'httpparty'
require 'json'

puts HTTParty.get(BASE_URL)

class IEXStocks
  include HTTParty 
  format :json 
  BASE_URL = 'https://sandbox.iexapis.com/'

  def self.get_stocks(stock)
    get(BASE_URL, :query => {:stock => stock, :output => 'json'})
  end
  
  puts IEXStocks.get_stocks(AALP)
end