class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :content, :user, :herb
end
