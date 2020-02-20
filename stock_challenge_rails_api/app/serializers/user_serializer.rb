class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :wallet
   def stocks
    ActiveModel::SerializableResource.new(object.stocks,  each_serializer: StockSerializer)
  end
end
