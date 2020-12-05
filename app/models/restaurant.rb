class Restaurant < ApplicationRecord
  # attr_accessor :id, :name, :street, :city, :postal_code

  has_many :offers
  has_many :stars
  has_many :starcodes, through: :stars

  has_many :offercodes, through: :offers
  belongs_to :user

  validates :name, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :postal_code, presence: true


  def batchs #array of batchs for a restaurant
    Batch.joins(:starcodes, :stars).where({ stars: { restaurant: self } }).uniq
  end

  def users  #array of clients for a restaurant
    User.joins(:stars).where(stars: { restaurant: self }).uniq
  end

  def stars_count_available(user) #count number of stars available for a restaurant and a specific client
    self.stars.where(status: 'available', user: user).count
  end

  def stars_count_used(user) #count number of stars used for a restaurant and a specific client
    self.stars.where(status: 'used', user: user).count
  end
end
