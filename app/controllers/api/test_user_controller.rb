class Api::TestUserController < ApplicationController

  SEARCH_CRITERIA = %w[country device]

# No real use for these APIs, just to test
  def list_testers
    testers = Tester.all
    render json: testers
  end

  def list_devices
    devices = Device.all
    render json: devices
  end

  def list_bugs
    bugs = Bug.all
    render json: bugs
  end

  def countries
    render json: distinct_countries
  end

  def devices
    render json: distinct_devices
  end

  def experience
    tester_id = params[:tester_id]
    begin
      experience = Tester.where(tester_id: tester_id).first.experience_by_devices(['ALL'])
      render json: experience
    rescue => e
      Rails.logger.warn(e)
      render json: {}
    end

  end

  def search
    countries = params[:country] || distinct_countries
    devices = params[:devices]
    testers = Tester.find(country: countries)
  end

  private
  def distinct_countries
    Rails.cache.fetch('all_countries') do
      Tester.distinct.pluck(:country)
    end
  end

  # Fetch a list of distinct devices with device IDs
  def distinct_devices
    Rails.cache.fetch('all_devices') do
      Device.distinct.pluck(:device_id, :description)
    end
  end

end
