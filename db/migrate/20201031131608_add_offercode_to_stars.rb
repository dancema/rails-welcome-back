class AddOffercodeToStars < ActiveRecord::Migration[6.0]
  def change
    add_reference :stars, :offercode, foreign_key: true
  end
end
