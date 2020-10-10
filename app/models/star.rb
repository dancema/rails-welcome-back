class Star < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user, optional: true

  validates :code, presence: true, uniqueness: true
  validates :amount, presence: true,numericality: { only_integer: true }
  validates :status, inclusion: { in: %w(valid used cancel), message: "%{value} is not a valid status" }
end
