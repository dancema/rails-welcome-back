class Offer < ApplicationRecord
  belongs_to :restaurant
  has_many :offercodes

  validates :title, presence: true
  validates :stars_required, presence: true, numericality: { only_integer: true }
  validates :offer_type, presence: true, inclusion: { in: %w(exclusive-deal loyalty), message: "%{value} is not a valid offer type"}

  def count_offercodes_scanned
    Offercode.joins(:offer).where(status: "scanned", offer: self).count
  end

  def count_offercodes_scanned_by(user)
    Offercode.joins(:offer).where(status: "scanned", offer: self, user: user).count
  end
end
