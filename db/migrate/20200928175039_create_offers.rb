class CreateOffers < ActiveRecord::Migration[6.0]
  def change
    create_table :offers do |t|
      t.string :title
      t.references :restaurant, foreign_key: true
      t.string :offer_type
      t.string :stars_required

      t.timestamps
    end
  end
end
