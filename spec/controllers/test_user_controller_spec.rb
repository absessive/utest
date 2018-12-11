# frozen_string_literal: true

require 'rails_helper'

describe Api::TestUserController, type: :controller do
  describe '#countries' do
    it 'returns a list of countries' do
      get :countries, params: {format: :json }
      expect(response.status).to eq(200)
      response_body = JSON.parse response.body
      expect(response_body).to be_a(Array)
      expect(response_body).to include('US')
    end
  end

  describe '#devices' do
    it 'returns a list of countries' do
      get :devices, params: {format: :json }
      expect(response.status).to eq(200)
      response_body = JSON.parse response.body
      expect(response_body).to be_a(Array)
      expect(response_body).to include('iPhone 4')
    end
  end

  describe '#experience' do
    it 'returns the experience for a tester' do
      get :experience, params: { format: :json, tester_id: 1 }
      expect(response.status).to eq(200)
      response_body = JSON.parse response.body
      expect(response_body).to be_a(Array)
      expect(response_body).to include({"device"=>"iPhone 4", "experience"=>23})
    end
  end

  describe '#experience' do
    it 'returns the experience for a tester' do
      get :experience, params: { format: :json, tester_id: 1 }
      expect(response.status).to eq(200)
      response_body = JSON.parse response.body
      expect(response_body).to be_a(Array)
      expect(response_body).to include({"device"=>"iPhone 4", "experience"=>23})
    end
  end

  describe '#search' do
    it 'returns the list of testers with their total experience' do |variable|
      post :search, body: { devices: ['iPhone 4'], countries: ['US'] }.to_json, format: :JSON
      expect(response.status).to eq(200)
      response_body = JSON.parse response.body
      expect(response_body).to be_a(Array)
    end
  end

end
