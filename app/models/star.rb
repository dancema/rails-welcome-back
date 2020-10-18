class Star < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user, optional: true
  has_many :exploded_stars

  validates :code, presence: true, uniqueness: true
  validates :amount, presence: true, numericality: { only_integer: true }
  validates :status, inclusion: { in: %w(valid scanned cancel), message: "%{value} is not a valid status" }
  validates :batch_name, presence: true
end
