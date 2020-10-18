class RemoveUsedAtFromStars < ActiveRecord::Migration[6.0]
  def change
    remove_column :stars, :used_at, :datetime
  end
end
