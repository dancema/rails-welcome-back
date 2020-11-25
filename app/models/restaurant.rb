class Restaurant < ApplicationRecord
  # attr_accessor :id, :name, :street, :city, :postal_code

  has_many :offers
  has_many :stars
  has_many :offercodes, through: :offers
  belongs_to :user

  validates :name, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :postal_code, presence: true

  def stars_count(user)
    self.stars.where(status: 'available', user: user).count
  end

end
