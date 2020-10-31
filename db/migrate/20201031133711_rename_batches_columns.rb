class RenameBatchesColumns < ActiveRecord::Migration[6.0]
  def change
    rename_column :batches, :batch_name, :name
  end
end
