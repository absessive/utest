# frozen_string_literal: true

require 'rails_helper'

describe Api::TestUserController, type: :controller do
  describe '#countries' do
    it 'returns a list of countries' do
      get :countries, params: {format: :json }
      expect(response.status).to eq(200)
      expect(JSON.parse response.body).to be_a(Array)
    end
  end

  describe '#devices' do
    it 'returns a list of countries' do
      get :devices, params: {format: :json }
      expect(response.status).to eq(200)
      expect(JSON.parse response.body).to be_a(Array)
    end
  end

end
