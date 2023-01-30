class AddPropsFieldToContests < ActiveRecord::Migration[7.0]
  def change
    add_column :contests, :props, :json
  end
end
