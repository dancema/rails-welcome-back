require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::OffersController, :type => :controller do
  # describe "#index" do


  #   context "when restaurant_id is not valid" do
  #     it 'responds with not found when restaurant id is not a number' do
  #       restaurant2 = create(:restaurant)
  #       create(:offer_loyalty, restaurant: restaurant2)

  #       get :index, params: { restaurant_id: '3aef' }
  #       expect(response.status).to eq(404)
  #     end

  #     it 'responds with not found when restaurant id does not exist' do
  #       restaurant2 = create(:restaurant)
  #       create(:offer_loyalty, restaurant: restaurant2)

  #       get :index, params: { restaurant_id: 50 }
  #       expect(response.status).to eq(404)
  #     end
  #   end

  #   context "when restaurant_id is valid" do
  #     before(:each) do
  #       user = create(:user_restaurant)
  #       restaurant = create(:restaurant, user: user)
  #       @offer1 = create(:offer_loyalty, restaurant: restaurant)
  #       @offer2 = create(:offer_loyalty, restaurant: restaurant)
  #       @offer3 = create(:offer_loyalty, restaurant: restaurant)
  #       @offer4 = create(:offer_exclusive, restaurant: restaurant)

  #       restaurant2 = create(:restaurant, user: user)
  #       create(:offer_loyalty, restaurant: restaurant2)

  #       get :index, params: { restaurant_id: restaurant.id }
  #     end

  #     it "has a 200 status code" do
  #       expect(response.status).to eq(200)
  #     end

  #     it "lists all offers from the restaurant" do
  #       expect(JSON.parse(response.body)).to eq([@offer1.as_json, @offer2.as_json, @offer3.as_json, @offer4.as_json])
  #     end
  #   end

  # end

  describe "#show" do
    context "when offer id is not valid" do
      before(:each) do
        create(:offer_loyalty)
      end

      it "responds with not found when offer id is not a number" do
        get :show, params: { id: '1ef' }
        expect(response.status).to eq(404)
      end

      it "responds with not found when offer id does not exist" do
        get :show, params: { id: 50 }
        expect(response.status).to eq(404)
      end
    end

    context "when offer id is valid" do
      before(:each) do
        @offer = create(:offer_loyalty)
        get :show, params: { id: @offer.id }
      end

      it "has a 200 status code" do
        expect(response.status).to eq(200)
      end

      it "responds with offer details" do
        json_response = JSON.parse(response.body, symbolize_names: true)

        expect(@offer.id.to_s).to eq(json_response.dig(:data, :id))
        expect(@offer.title).to eq(json_response.dig(:data, :attributes, :title))
        expect(@offer.stars_required).to eq(json_response.dig(:data, :attributes, :stars_required))
        expect(@offer.offer_type).to eq(json_response.dig(:data, :attributes, :offer_type))
      end
    end
  end
end
