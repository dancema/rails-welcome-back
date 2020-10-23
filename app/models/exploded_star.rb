class ExplodedStar < ApplicationRecord
  belongs_to :star
  belongs_to :user, optional: true

  validates :status, inclusion: { in: %w(valid used not-valid cancel), message: "%{value} is not a valid status" }
end
