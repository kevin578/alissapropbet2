class CreateContests < ActiveRecord::Migration[7.0]
  def change
    create_table :contests do |t|
      t.integer :user_id
      t.string :name
      t.integer :status
      t.timestamps
    end
  end
end
