class Starcode < ApplicationRecord
  has_many :stars
  belongs_to :batch

  validates :code, presence: true, uniqueness: true, length: { is: 6 }
  validates :status, inclusion: { in: %w(valid scanned cancel), message: "%{value} is not a valid status" }
end
