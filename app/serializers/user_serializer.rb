class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  
  has_many :herbs, through: :reviews
end
