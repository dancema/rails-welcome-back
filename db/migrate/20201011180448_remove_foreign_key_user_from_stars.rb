class RemoveForeignKeyUserFromStars < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :stars, column: :user_id
  end
end
