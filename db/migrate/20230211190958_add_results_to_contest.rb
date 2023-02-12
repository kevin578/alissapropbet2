class AddResultsToContest < ActiveRecord::Migration[7.0]
  def change
    add_column :contests, :results, :json
  end
end
