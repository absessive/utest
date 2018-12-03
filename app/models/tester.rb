class Tester < ApplicationRecord
  has_many :bugs
  has_and_belongs_to_many :devices
  validates :tester_id, presence: true, uniqueness: true
end
