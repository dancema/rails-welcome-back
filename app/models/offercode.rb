class Offercode < ApplicationRecord
  belongs_to :user
  belongs_to :offer
  has_one :restaurant, :through => :offer

  validates :code, presence: true, uniqueness: true, length: { is: 6 }
  validates :status, inclusion: { in: %w(valid scanned cancel), message: "%{value} is not a valid status" }

end
