class Star < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user, optional: true
  belongs_to :starcode
  belongs_to :offercode, optional: true
  validates :status, inclusion: { in: %w(valid scanned cancel), message: "%{value} is not a valid status" }
end
