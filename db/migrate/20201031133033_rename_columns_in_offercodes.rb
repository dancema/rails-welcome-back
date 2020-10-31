class RenameColumnsInOffercodes < ActiveRecord::Migration[6.0]
  def change
    rename_column :offercodes, :password, :code
    rename_column :offercodes, :used_at, :scanned_at

  end
end
