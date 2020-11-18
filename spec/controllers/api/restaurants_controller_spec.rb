require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::RestaurantsController, :type => :controller do
  describe "GET index" do
    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
    end
  end
end
