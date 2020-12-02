class Starcode < ApplicationRecord
  has_many :stars
  belongs_to :batch

  validates :code, presence: true, uniqueness: true, length: { is: 6 }
  validates :status, inclusion: { in: %w(valid scanned cancel), message: "%{value} is not a valid status" }

  def self.search(params = {})

    Starcode.find_by_code(params[:code])
  end
end
