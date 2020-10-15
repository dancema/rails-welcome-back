class Restaurant < ApplicationRecord
  has_many :offers
  has_many :stars
  belongs_to :user

  validates :name, presence: true
  validates :street, presence: true
  validates :city, presence: true
  validates :postal_code, presence: true
end
