class AddStarcodeToStars < ActiveRecord::Migration[6.0]
  def change
    add_reference :stars, :starcode, foreign_key: true
  end
end
