class Star < ApplicationRecord
  belongs_to :restaurant
  belongs_to :user, optional: true

end
