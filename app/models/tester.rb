class Tester < ApplicationRecord
  validates :tester_id, presence: true, uniqueness: true
end
