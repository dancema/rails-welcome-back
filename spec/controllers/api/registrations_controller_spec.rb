require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Api::V1::RegistrationsController, :type => :controller do

  describe "#create" do

    # context "when request format html" do
    #   # it 'responds with bad request when id is not a number' do
    #   #   create(:user_client)
    #   #   expect(response.status).to eq(400)
    #   # end

    #   # it 'responds with not found when restaurant does not exist' do
    #   #   restaurant2 = create(:restaurant)
    #   #   create(:offer_loyalty, restaurant: restaurant2)

    #   #   get :index, params: { restaurant_id: 50 }
    #   #   expect(response.status).to eq(404)
    #   # end
    # end

    # context "when request format json" do
    #   before(:each) do
    #     # user = create(:user_restaurant)
    #     # restaurant = create(:restaurant, user: user)
    #     # @offer1 = create(:offer_loyalty, restaurant: restaurant)
    #     # @offer2 = create(:offer_loyalty, restaurant: restaurant)
    #     # @offer3 = create(:offer_loyalty, restaurant: restaurant)
    #     # @offer4 = create(:offer_exclusive, restaurant: restaurant)

    #     # restaurant2 = create(:restaurant, user: user)
    #     # create(:offer_loyalty, restaurant: restaurant2)

    #     # get :index, params: { restaurant_id: restaurant.id }
    #   end

    #   it "has a 200 status code" do
    #     post :create, :params => { user: {:email => "client@client.fr", :password => "testtest", :password_confirmation => "testtest"} }
    #     expect(response.status).to eq(200)
    #   end

    #   it "lists all offers from the restaurant" do
    #   end
    # end

  end
end
