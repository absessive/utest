class Tester < ApplicationRecord
  has_many :bugs
  has_and_belongs_to_many :devices
  validates :tester_id, presence: true, uniqueness: true

  def experience
    self.bugs.size
  end

  def experience_by_device(device_name)
    device_id = Device.find_by(description: device_name).id
    self.bugs.select{|bug| bug.device_id == device_id}.count rescue 0
  end

  # Given an array of devices (by name), returns a hash of how bugs per device
  # fixed by that tester
  def experience_by_devices(devices = [])
    devices_experience = []
    bugs = self.bugs
    if devices.include?('ALL')
      user_devices = self.devices.map{ |device| device.description }
      user_devices.each do |device|
        devices_experience << { device: device, experience: self.experience_by_device(device)}
      end
    else # if All devices
      devices.each do |device|
        devices_experience << { device: device, experience: self.experience_by_device(device)}
      end
    end
    devices_experience
  end

  def experience_count_by_devices(devices=[])
    devices_experience = self.experience_by_devices(devices)
    return devices_experience.values.sum
  end

end
