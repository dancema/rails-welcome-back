class AddUsedAtColumnToCodes < ActiveRecord::Migration[6.0]
  def change
    add_column :codes, :used_at, :datetime
  end
end
