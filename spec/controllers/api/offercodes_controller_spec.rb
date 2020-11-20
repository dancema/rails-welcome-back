require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::OffercodesController, :type => :controller do
  describe "#create" do
    context "when user not logged in" do
      it "responds with unauthorized" do
        user = create(:user_client)
        restaurant = create(:restaurant)
        starcode = create(:starcode, code: '222aaa')
        @offer = create(:offer_loyalty, stars_required: 2, restaurant: restaurant)
        create(:star, status: 'available', user: user, restaurant: restaurant)
        create(:star, status: 'available', user: user, restaurant: restaurant, starcode: starcode)

        post :create, params: { offer_id: @offer.id }
        expect(response.status).to eq(401)
      end
    end

    context "when user logged in" do
      before(:each) do
        @user = create(:user_client)
        @restaurant = create(:restaurant)
        @starcode = create(:starcode, code: '222aaa')
        sign_in(@user)
      end

      it "responds with not found if offer_id does not exist" do
        @offer = create(:offer_loyalty, stars_required: 3, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        post :create, params: { offer_id: 50 }
        expect(response.status).to eq(404)
      end

      it "responds with forbidden if user has not enough stars" do
        @offer = create(:offer_loyalty, stars_required: 3, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        post :create, params: { offer_id: @offer.id }
        expect(response.status).to eq(403)
      end

      it "responds with forbidden if user has no stars" do
        @offer = create(:offer_loyalty, stars_required: 3, restaurant: @restaurant)

        post :create, params: { offer_id: @offer.id }
        expect(response.status).to eq(403)
      end

      it "changes old active offercodes status to 'cancel'" do
        @offer = create(:offer_loyalty, stars_required: 2, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        offercode = create(:offercode, offer: @offer, user: @user)

        post :create, params: { offer_id: @offer.id }
        expect(Offercode.find(offercode.id).status).to eq('cancel')
      end

      it "creates an offercode with the current_user" do
        @offer = create(:offer_loyalty, stars_required: 2, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        post :create, params: { offer_id: @offer.id }
        expect(Offercode.first.user).to eq(@user)
      end

      it "creates an offercode with the status 'valid'" do
        @offer = create(:offer_loyalty, stars_required: 2, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        post :create, params: { offer_id: @offer.id }
        expect(Offercode.first.status).to eq('valid')
      end

      it "responds with 200 status if user has the number of stars required" do
        @offer = create(:offer_loyalty, stars_required: 2, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        post :create, params: { offer_id: @offer.id }
        expect(response.status).to eq(200)
      end

      it "returns the offercode if user has the number of stars required" do
        @offer = create(:offer_loyalty, stars_required: 2, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant)
        create(:star, status: 'available', user: @user, restaurant: @restaurant, starcode: @starcode)

        post :create, params: { offer_id: @offer.id }
        expect(JSON.parse(response.body)).to eq({ "code" => Offercode.first.code })
      end
    end
  end
end
