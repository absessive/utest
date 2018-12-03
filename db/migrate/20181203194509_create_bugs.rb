class CreateBugs < ActiveRecord::Migration[5.2]
  def change
    create_table :bugs do |t|
      t.integer :bug_id
      t.references :device, foreign_key: true
      t.references :tester, foreign_key: true

      t.timestamps
    end
  end
end
