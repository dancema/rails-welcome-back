class Batch < ApplicationRecord
  has_many :starcodes
  has_many :stars, through: :starcodes

  validates :name, presence: true
end
