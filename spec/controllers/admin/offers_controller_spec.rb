require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Admin::OffersController, :type => :controller do
  describe "#new" do
    context "when user is not an admin" do
      it "should redirect to login if no user logged in" do
        get :new
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        user = create(:user, :c)
        sign_in(user)
        get :new
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        sign_in(user)
        get :new
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should render home" do
        get :new
        expect(response).to render_template(:new)
      end
    end
  end

  describe "#create" do
    context "when user is not an admin" do
      it "should redirect to login if no user logged in" do
        restaurant = create(:restaurant)
        post :create, params: { offer: { title: 'hello', offer_type: 'loyalty', stars_required: 1, restaurant_id: restaurant.id } }
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        user = create(:user, :c)
        sign_in(user)

        restaurant = create(:restaurant)
        post :create, params: { offer: { title: 'hello', offer_type: 'loyalty', stars_required: 1, restaurant_id: restaurant.id } }
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        sign_in(user)

        restaurant = create(:restaurant, user: user)
        post :create, params: { offer: { title: 'hello', offer_type: 'loyalty', stars_required: 1, restaurant_id: restaurant.id } }
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should redirect to offers#new if offer not created" do
        restaurant = create(:restaurant)
        post :create, params: { offer: { title: 'hello', offer_type: 'BLABLA', stars_required: 1, restaurant_id: restaurant.id } }
        expect(response).to redirect_to(new_admin_offer_path)
      end

      it "should create an offer if params valid" do
        restaurant = create(:restaurant)
        post :create, params: { offer: { title: 'hello', offer_type: 'loyalty', stars_required: 1, restaurant_id: restaurant.id } }
        expect(Restaurant.first.offers.first).to eq(Offer.first)
      end

      it "should redirect to pages#home if offer successfully created" do
        restaurant = create(:restaurant)
        post :create, params: { offer: { title: 'hello', offer_type: 'loyalty', stars_required: 1, restaurant_id: restaurant.id } }
        expect(response).to redirect_to(admin_path)
      end
    end
  end
end
