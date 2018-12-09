class Tester < ApplicationRecord
  has_many :bugs
  has_and_belongs_to_many :devices
  validates :tester_id, presence: true, uniqueness: true

  scope :countries, -> (countries) { where country: countries }

  attr_accessor :experience

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
    return devices_experience.sum{ |v| v[:experience] }
  end

  # Given a list of countries and devies lists out all testers who fulfill that criteria
  def self.find_testers_with_countries_and_devices(countries = [], devices = [])
    countries(countries).joins(:devices).where(devices: {description: [devices]}).distinct
  end

  # Given list of countries and devices return list of testers in order of experience
  def self.experience_with_countries_and_devices(countries=[], devices = [])
    testers = countries(countries).joins(:devices).where(devices: {description: [devices]}).distinct
    testers_with_experience = []
    testers.each do |tester|
      puts tester.first_name
      tester_hash = tester.attributes.slice('first_name', 'last_name', 'country', 'tester_id')
      tester_hash['experience'] = tester.experience_count_by_devices(devices)
      testers_with_experience << tester_hash
    end
    return testers_with_experience.sort_by{|tester| tester['experience']}.reverse
  end

end
