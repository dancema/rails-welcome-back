require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::StarsController, :type => :controller do
  describe "#index" do

    context "when user not logged in" do
      it "responds with unauthorized" do
        user = create(:user, :c)
        create(:star, user: user, status: 'available')
        get :index
        expect(response.status).to eq(401)
      end
    end

    context "when user logged in" do
      it "has a 200 status code" do
        user = create(:user, :c)
        sign_in(user)

        get :index
        expect(response.status).to eq(200)
      end

      it "responds with an empty JSON if no stars" do
        user = create(:user, :c)
        @restaurant = create(:restaurant)
        sign_in(user)

        user2 = create(:user, :c, email: 'user2@gmail.com')
        create(:star, user: user2, status: 'available', restaurant: @restaurant)

        get :index
        expect(JSON.parse(response.body)).to eq({})
      end

      it "responds for each restaurant_id the number of stars available" do
        user = create(:user, :c)
        @restaurant = create(:restaurant)
        sign_in(user)
        starcode = create(:starcode, code: "11112222")
        create(:star, restaurant: @restaurant, starcode: starcode)
        create(:star, user: user, status: 'available', restaurant: @restaurant)

        user2 = create(:user, :c, email: 'user2@gmail.com')
        starcode2 = create(:starcode, code: "11113333")
        create(:star, user: user2, status: 'available', restaurant: @restaurant, starcode: starcode2)

        get :index
        expect(JSON.parse(response.body)).to eq({ @restaurant.id.to_s => 1})
      end
    end
  end

  describe "#show" do

    context "when user not logged in" do
      it "responds with unauthorized" do
        user = create(:user, :c)
        star = create(:star, user: user, status: 'available')
        get :show, params: {id: star.restaurant.id}
        expect(response.status).to eq(401)
      end
    end

    context "when user logged in" do
      before(:each) do
        @user = create(:user, :c)
        sign_in(@user)
      end

      it "has a 200 status code" do
        star = create(:star, user: @user, status: 'available')

        get :show, params: {id: star.restaurant.id}
        expect(response.status).to eq(200)
      end

      it "responds with an empty JSON if no stars" do
        @restaurant = create(:restaurant)

        user2 = create(:user, :c, email: 'user2@gmail.com')
        create(:star, user: user2, status: 'available', restaurant: @restaurant)

        get :show, params: {id: @restaurant.id}
        expect(JSON.parse(response.body)).to eq({})
      end

      it "responds with restaurant_id and the number of stars available" do
        @restaurant = create(:restaurant)
        starcode = create(:starcode, code: "11112222")
        create(:star, restaurant: @restaurant, starcode: starcode)
        create(:star, user: @user, status: 'available', restaurant: @restaurant)

        user2 = create(:user, :c, email: 'user2@gmail.com')
        starcode2 = create(:starcode, code: "11113333")
        create(:star, user: user2, status: 'available', restaurant: @restaurant, starcode: starcode2)

        get :show, params: {id: @restaurant.id}
        expect(JSON.parse(response.body)).to eq({ @restaurant.id.to_s => 1})
      end
    end
  end

  # describe "#show" do
  #   context "when restaurant id is not valid" do
  #     before(:each) do
  #       @restaurant = create(:restaurant)
  #     end

  #     it "responds with bad request when id is not a number" do
  #       get :show, :params => { :id => '1ef' }
  #       expect(response.status).to eq(400)
  #     end

  #     it "responds with not found when restaurant does not exist" do
  #       get :show, :params => { :id => 50 }
  #       expect(response.status).to eq(404)
  #     end
  #   end

  #   context "when restaurant id is valid" do
  #     before(:each) do
  #       @restaurant = create(:restaurant)
  #       get :show, :params => { :id => @restaurant.id }
  #     end

  #     it "has a 200 status code" do
  #       expect(response.status).to eq(200)
  #     end

  #     it "responds with restaurant details" do
  #       expect(JSON.parse(response.body)).to eq(@restaurant.as_json)
  #     end
  #   end
  # end
end
