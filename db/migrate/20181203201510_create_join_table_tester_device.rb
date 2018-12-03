class CreateJoinTableTesterDevice < ActiveRecord::Migration[5.2]
  def change
    create_join_table :testers, :devices do |t|
      t.index [:tester_id, :device_id]
      t.index [:device_id, :tester_id]
    end
  end
end
