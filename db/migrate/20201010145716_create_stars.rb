class CreateStars < ActiveRecord::Migration[6.0]
  def change
    create_table :stars do |t|
      t.references :restaurant, foreign_key: true
      t.references :user, foreign_key: true
      t.string :status
      t.string :code
      t.string :amount
      t.timestamps
    end
  end
end
