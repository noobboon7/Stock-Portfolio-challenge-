class StockSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :quantity, :price
  has_one :user
end
