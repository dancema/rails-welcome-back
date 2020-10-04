class Offer < ApplicationRecord
  belongs_to :restaurant
  has_many :codes
end
