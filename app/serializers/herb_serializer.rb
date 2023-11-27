class HerbSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image
  
  has_many :reviews
end
