class ChangeNameCodeInCodes < ActiveRecord::Migration[6.0]
  def change
    change_table :codes do |t|
      t.rename :code, :password
    end
  end
end
