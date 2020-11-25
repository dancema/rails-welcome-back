require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::RestaurantsController, :type => :controller do
  describe "#index" do
    before(:each) do
      @restaurant = create(:restaurant)
      get :index
    end

    it "has a 200 status code" do
      expect(response.status).to eq(200)
    end

    it "lists all restaurants" do
      expect(JSON.parse(response.body)).to eq([@restaurant.as_json])
    end
  end

  describe "#show" do
    context "when restaurant id is not valid" do
      before(:each) do
        @restaurant = create(:restaurant)
      end

      it "responds with not found when restaurant id is not a number" do
        get :show, :params => { :id => '1ef' }
        expect(response.status).to eq(404)
      end

      it "responds with not found when restaurant id does not exist" do
        get :show, :params => { :id => 50 }
        expect(response.status).to eq(404)
      end
    end

    context "when restaurant id is valid" do
      before(:each) do
        @restaurant = create(:restaurant)
        get :show, :params => { :id => @restaurant.id }
      end

      it "has a 200 status code" do
        expect(response.status).to eq(200)
      end

      it "responds with restaurant details" do
        expect(JSON.parse(response.body)).to eq(@restaurant.as_json)
      end
    end
  end
end
