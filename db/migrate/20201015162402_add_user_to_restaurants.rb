class AddUserToRestaurants < ActiveRecord::Migration[6.0]
  def change
    add_reference :restaurants, :user, foreign_key: true
  end
end
