class ChangeTypeStarsRequiredToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :offers, :stars_required, 'integer USING CAST(stars_required AS integer)'
  end
end
