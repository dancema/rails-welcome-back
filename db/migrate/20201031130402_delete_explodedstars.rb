class DeleteExplodedstars < ActiveRecord::Migration[6.0]
  def change
    drop_table :exploded_stars
  end
end
