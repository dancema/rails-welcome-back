class Offercode < ApplicationRecord
  belongs_to :user
  belongs_to :offer

  validates :code, presence: true, uniqueness: true
  validates :status, inclusion: { in: %w(valid scanned cancel), message: "%{value} is not a valid status" }
end
