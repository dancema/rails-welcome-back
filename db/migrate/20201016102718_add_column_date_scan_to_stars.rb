class AddColumnDateScanToStars < ActiveRecord::Migration[6.0]
  def change
    add_column :stars, :scanned_at, :datetime
    add_column :stars, :used_at, :datetime

  end
end
