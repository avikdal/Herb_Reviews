class Review < ApplicationRecord
  belongs_to :user
  belongs_to :herb

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :content, presence: true
end
