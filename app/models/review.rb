class Review < ApplicationRecord
  belongs_to :user
  belongs_to :herb

  validates :user_id, uniqueness: { scope: :herb_id, message: "You can only have one review per herb." }
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :content, presence: true
end
