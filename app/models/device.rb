class Device < ApplicationRecord
  has_many :bugs
  has_and_belongs_to_many :testers
  validates :description, presence: true, uniqueness: true
end
