class Herb < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    validates :name, uniqueness: true, presence: true
    validates :description, :image, presence: true
end
