class Offer < ApplicationRecord
  belongs_to :restaurant
  has_many :offercodes

  validates :title, presence: true
  validates :stars_required, presence: true, numericality: { only_integer: true }
  validates :offer_type, presence: true, inclusion: { in: %w(exclusive-deal loyalty), message: "%{value} is not a valid offer type"}
end
