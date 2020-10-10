class Restaurant < ApplicationRecord
  has_many :offers
  has_many :stars
end
