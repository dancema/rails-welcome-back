class CreateCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :codes do |t|
      t.references :offer, foreign_key: true
      t.references :user, foreign_key: true
      t.string :status
      t.string :code

      t.timestamps
    end
  end
end
