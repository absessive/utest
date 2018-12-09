class Api::TestUserController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :search

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

  def search_by_criteria
    countries = params[:country] || distinct_countries
    devices = params[:devices]
    testers = Tester.where(country: countries)
  end

  def search
    request_body = JSON.parse(request.body.string)
    countries = request_body['countries']
    devices = request_body['devices']
    testers = Tester.experience_with_countries_and_devices(countries, devices)
    render json: testers
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
      Device.distinct.pluck(:description)
    end
  end

end
