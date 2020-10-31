class CreateStarcodes < ActiveRecord::Migration[6.0]
  def change
    create_table :starcodes do |t|
      t.string :status
      t.datetime :scanned_at
      t.string :code
    end
  end
end
