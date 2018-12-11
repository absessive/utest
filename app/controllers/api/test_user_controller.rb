class Api::TestUserController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :search

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
      render json: []
    end

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
    Tester.distinct.pluck(:country)
  end

  # Fetch a list of distinct devices with device IDs
  def distinct_devices
    Device.distinct.pluck(:description)
  end

end
