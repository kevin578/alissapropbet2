class CreateEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :entries do |t|
      t.integer :contest_id
      t.string :name
      t.json :selected_options

      t.timestamps
    end
  end
end
