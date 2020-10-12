class AddColumnBatchNameToStars < ActiveRecord::Migration[6.0]
  def change
    add_column :stars, :batch_name, :string
  end
end
