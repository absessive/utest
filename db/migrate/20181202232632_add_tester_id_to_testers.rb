class AddTesterIdToTesters < ActiveRecord::Migration[5.2]
  def change
    add_column :testers, :tester_id, :integer
  end
end
