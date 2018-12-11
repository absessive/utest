# frozen_string_literal: true

require 'rails_helper'

describe Tester, type: :model do
  describe '#experience' do
    it 'returns total number of bugs, i.e. experience' do
      tester = Tester.first
      expect(tester.experience).to eq(114)
    end
  end

  describe '#' do
    it 'returns users with experience' do
      testers = Tester.find_testers_with_countries_and_devices(['US'], ['iPhone 4'])
      expect(testers).not_to be_empty
    end
  end
end
