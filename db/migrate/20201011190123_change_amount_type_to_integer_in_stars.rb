class ChangeAmountTypeToIntegerInStars < ActiveRecord::Migration[6.0]
  def change
    change_column :stars, :amount, 'integer USING CAST(amount AS integer)'
  end
end
