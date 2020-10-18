class ExplodedStar < ApplicationRecord
  belongs_to :star

  validates :status, inclusion: { in: %w(valid used cancel), message: "%{value} is not a valid status" }
end
