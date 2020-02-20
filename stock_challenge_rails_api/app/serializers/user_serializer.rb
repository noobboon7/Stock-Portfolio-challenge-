class UserSerializer < ActiveModel::Serializer
  # removed id cause its being encoded
  attributes :first_name, :last_name, :email, :wallet
   def stocks
    ActiveModel::SerializableResource.new(object.stocks,  each_serializer: StockSerializer)
  end
end
