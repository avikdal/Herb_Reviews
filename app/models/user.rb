class User < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :herbs, through: :reviews

    validates :password, presence: true
    validates :username, uniqueness: true, presence: true
end
