class Api::V1::StocksController < ApplicationController
  def buy_stock
    # find user trying purchase stock
    user = User.find_by(email: params[:email])
    id = user.id
    # calc the total of the stock 
    total_cost = (params[:latestPrice].to_f * params[:numStocks].to_i)
    
    # user can only buy shares if they have enough cash in their account for a given purchase.
    if user.wallet >= total_cost
      
      # calc the new balance in wallet and update
      new_balance = (user.wallet - total_cost).round(2)
      user.update_attribute(:wallet, new_balance)
      
      # create stock 
      stock = Stock.create(price: params[:latestPrice].round(2), symbol: params[:symbol], quantity: params[:numStocks], user_id: id)
      
      # return stock to client 
      data = { userData: StockSerializer.new(stock)}
      # byebug
      render json: data 
    else
			render json: {errors: "Need more funds to purchase."}
    end
  end

  def get_user_stock
    user = User.find_by(id:decode_token)
    stocks = user.stocks

    render json: stocks, each_serializer: StockSerializer
  end
end
