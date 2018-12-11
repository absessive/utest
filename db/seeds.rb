# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'
zone = "Eastern Time (US & Canada)"

# 1. List of Testers
# This one has already been run. Uncomment to run again.
CSV.foreach(Rails.root.join('public', 'test_files', 'testers.csv'), headers: true) do |row|
  Tester.create(tester_id: row['testerId'],
    first_name: row['firstName'],
    last_name: row['lastName'],
    country: row['country'],
    last_login: ActiveSupport::TimeZone[zone].parse(row['lastLogin']))
end

# 2. List of Devices
# This one has already been run. Uncomment to run again.
CSV.foreach(Rails.root.join('public', 'test_files', 'devices.csv'), headers: true) do |row|
  Device.create(device_id: row['deviceId'], description: row['description'])
end

# 3. List of Bugs
# This one has already been run. Uncomment to run again.
CSV.foreach(Rails.root.join('public', 'test_files', 'bugs.csv'), headers: true) do |row|
  Bug.create(bug_id: row['bugId'], device_id: row['deviceId'], tester_id: row['testerId'])
end

# 4. List of devices and testers
CSV.foreach(Rails.root.join('public', 'test_files', 'tester_device.csv'), headers: true) do |row|
  tester = Tester.find_by_id(row['testerId'])
  tester.devices << Device.find_by_id(row['deviceId'])
end
