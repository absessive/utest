class AddDeviceIdToDevice < ActiveRecord::Migration[5.2]
  def change
    add_column :devices, :device_id, :integer
  end
end
