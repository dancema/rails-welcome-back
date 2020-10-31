class RenameTableCodes < ActiveRecord::Migration[6.0]
  def change
    rename_table :codes, :offercodes
  end
end
