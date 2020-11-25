require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::RestaurantsController, :type => :controller do
  describe "#index" do
    before(:each) do
      @restaurant = create(:restaurant)

      @user = create(:user, :c)
      starcode = create(:starcode, code: "111122")
      create(:star, user: @user, status: 'available', restaurant: @restaurant, starcode: starcode)
      create(:star, user: @user, status: 'available', restaurant: @restaurant)

      user2 = create(:user, :r, email: 'user2@gmail.com')
      @restaurant2 = create(:restaurant, user: user2, name:'yoloo')

      starcode2 = create(:starcode, code: "111133")
      create(:star, user: @user, status: 'available', restaurant: @restaurant2, starcode: starcode2)


    end

    it "has a 200 status code" do
      get :index
      expect(response.status).to eq(200)
    end

    it "show all restaurant details" do
      get :index
      json_response = JSON.parse(response.body, symbolize_names: true)

      expect(2).to eq(json_response.dig(:data).count)

      expect(@restaurant.id.to_s).to eq(json_response.dig(:data, 0, :id))
      expect(@restaurant2.id.to_s).to eq(json_response.dig(:data, 1, :id))

      expect(@restaurant.name).to eq(json_response.dig(:data, 0, :attributes, :name))
      expect(@restaurant2.name).to eq(json_response.dig(:data, 1, :attributes, :name))

      expect(@restaurant.street).to eq(json_response.dig(:data, 0, :attributes, :street))
      expect(@restaurant2.street).to eq(json_response.dig(:data, 1, :attributes, :street))

      expect(@restaurant.city).to eq(json_response.dig(:data, 0, :attributes, :city))
      expect(@restaurant2.city).to eq(json_response.dig(:data, 1, :attributes, :city))

      expect(@restaurant.postal_code).to eq(json_response.dig(:data, 0, :attributes, :postal_code))
      expect(@restaurant2.postal_code).to eq(json_response.dig(:data, 1, :attributes, :postal_code))
    end

    it "show nb stars available per restaurant when logged in" do
      sign_in(@user)
      get :index
      json_response = JSON.parse(response.body, symbolize_names: true)

      expect(2).to eq(json_response.dig(:data, 0, :attributes, :count_stars))
      expect(1).to eq(json_response.dig(:data, 1, :attributes, :count_stars))
    end

    it "don't show nb stars available per restaurant when not logged in" do
      get :index
      json_response = JSON.parse(response.body, symbolize_names: true)

      expect(nil).to eq(json_response.dig(:data, 0, :attributes, :count_stars))
      expect(nil).to eq(json_response.dig(:data, 1, :attributes, :count_stars))
    end
  end

  describe "#show" do
    context "when restaurant id is not valid" do
      before(:each) do
        @restaurant = create(:restaurant)
      end

      it "responds with not found when restaurant id is not a number" do
        get :show, params: { id: '1ef' }
        expect(response.status).to eq(404)
      end

      it "responds with not found when restaurant id does not exist" do
        get :show, params: { id: 50 }
        expect(response.status).to eq(404)
      end
    end

    context "when restaurant id is valid" do
      before(:each) do
        @restaurant = create(:restaurant)
      end

      it "has a 200 status code" do
        get :show, params: { id: @restaurant.id }
        expect(response.status).to eq(200)
      end

      it "show restaurant details" do
        get :show, params: { id: @restaurant.id }
        json_response = JSON.parse(response.body, symbolize_names: true)

        expect(@restaurant.id.to_s).to eq(json_response.dig(:data, :id))
        expect(@restaurant.name).to eq(json_response.dig(:data, :attributes, :name))
        expect(@restaurant.street).to eq(json_response.dig(:data, :attributes, :street))
        expect(@restaurant.city).to eq(json_response.dig(:data, :attributes, :city))
        expect(@restaurant.postal_code).to eq(json_response.dig(:data, :attributes, :postal_code))
      end

      it "show nb of stars available if logged in" do
        user = create(:user, :c)
        sign_in(user)
        starcode = create(:starcode, code: "111122")
        create(:star,user: user, status: 'available', restaurant: @restaurant, starcode: starcode)
        create(:star, user: user, status: 'available', restaurant: @restaurant)

        user2 = create(:user, :c, email: 'user2@gmail.com')
        starcode2 = create(:starcode, code: "111133")
        create(:star, user: user2, status: 'available', restaurant: @restaurant, starcode: starcode2)

        get :show, params: { id: @restaurant.id }

        json_response = JSON.parse(response.body, symbolize_names: true)
        expect(2).to eq(json_response.dig(:data, :attributes, :count_stars))
      end

      it "don't show nb of stars available if not logged in" do
        user = create(:user, :c)
        starcode = create(:starcode, code: "111122")
        create(:star, restaurant: @restaurant, starcode: starcode)
        create(:star, user: user, status: 'available', restaurant: @restaurant)

        user2 = create(:user, :c, email: 'user2@gmail.com')
        starcode2 = create(:starcode, code: "111133")
        create(:star, user: user2, status: 'available', restaurant: @restaurant, starcode: starcode2)

        get :show, params: { id: @restaurant.id }

        json_response = JSON.parse(response.body, symbolize_names: true)
        expect(nil).to eq(json_response.dig(:data, :attributes, :count_stars))
      end
    end
  end
end
