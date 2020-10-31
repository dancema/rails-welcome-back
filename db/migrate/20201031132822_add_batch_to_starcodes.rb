class AddBatchToStarcodes < ActiveRecord::Migration[6.0]
  def change
    add_reference :starcodes, :batch, foreign_key: true
  end
end
