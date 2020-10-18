class CreateExplodedStars < ActiveRecord::Migration[6.0]
  def change
    create_table :exploded_stars do |t|
      t.references :star, foreign_key: true
      t.string :status
      t.datetime :used_at
      t.timestamps
    end
  end
end
