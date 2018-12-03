class Bug < ApplicationRecord
  belongs_to :device, foreign_key: 'device_id'
  belongs_to :tester, foreign_key: 'tester_id'

  validates :bug_id, presence: true, uniqueness: true
end
