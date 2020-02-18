class Api::V1::StocksController < ApplicationController
  def buy_stock
    # find user trying purchase stock
    user = User.find(params[:userid])
    
    # user can only buy shares if they have enough cash in their account for a given purchase.
    if user.wallet >= totalStockCost
      # calc the total of the stock 
      total_cost = (params[:stockPrice].to_f * params[:stockQuantity].to_i)
      # calc the new balance in wallet and update
      new_balance = (user.wallet - total_cost).round(2)
      user.update(wallet: new_balance)
      # create stock 
      stock = Stock.create(price: params[:stockPrice], symbol: params[:stockSymbol], amount: params[:stockAmount], user_id: params[:userId])
      # return stock to client 
      data = {userData: UserSerializer.new(user), newStock: StockSerializer.new(stock)}
      render json: data
    else
			render json: {errors: "Need more funds to purchase."}
    end
  end
end
