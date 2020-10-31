class RemoveColumnsFromStars < ActiveRecord::Migration[6.0]
  def change
    remove_column :stars, :code, :string
    remove_column :stars, :amount, :integer
    remove_column :stars, :batch_name, :string
    remove_column :stars, :scanned_at, :datetime
  end
end
