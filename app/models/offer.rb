class Offer < ApplicationRecord
  belongs_to :restaurant
  has_many :codes

  validates :title, presence: true
  validates :stars_required, presence: true, numericality: { only_integer: true }
  validates :offer_type, inclusion: { in: %w(discount free-item), message: "%{value} is not a valid offer type"}
end
