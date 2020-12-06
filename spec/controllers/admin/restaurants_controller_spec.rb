require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Admin::RestaurantsController, :type => :controller do
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

      it "should render new" do
        get :new
        expect(response).to render_template(:new)
      end
    end
  end

  describe "#show" do
    context "when user is not an admin" do
      it "should redirect to login if no user logged in" do
        restaurant = create(:restaurant)
        get :show, params: {id: restaurant.id}
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        restaurant = create(:restaurant)
        user = create(:user, :c)
        sign_in(user)
        get :show, params: {id: restaurant.id}
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        restaurant = create(:restaurant, user: user)
        sign_in(user)
        get :show, params: {id: restaurant.id}
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should render show" do
        restaurant = create(:restaurant)
        get :show, params: { id: restaurant.id }
        expect(response).to render_template(:show)
      end
    end
  end

  describe "#create" do
    context "when user is not an admin" do
      it "should redirect to login if no user logged in" do
        user = create(:user, :r)
        post :create, params: { restaurant: { name: 'hello', street: '1, road hello', city: "Paris", postal_code: 75_012, website_url: "hello.com", user_id: user.id } }
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        user = create(:user, :c)
        sign_in(user)

        user = create(:user, :r)
        post :create, params: { restaurant: { name: 'hello', street: '1, road hello', city: "Paris", postal_code: 75_012, website_url: "hello.com", user_id: user.id } }
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        sign_in(user)
        post :create, params: { restaurant: { name: 'hello', street: '1, road hello', city: "Paris", postal_code: 75_012, website_url: "hello.com", user_id: user.id } }
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should redirect to offers#new if offer not created" do
        user = create(:user, :r)
        post :create, params: { restaurant: { name: 'hello', street: '1, road hello', city: "Paris", postal_code: 75_012, website_url: "hello.com", user_id: "BLABLA" } }
        expect(response).to redirect_to(new_admin_restaurant_path)
      end

      it "should redirect to pages#home if offer successfully created" do
        user = create(:user, :r)
        post :create, params: { restaurant: { name: 'hello', street: '1, road hello', city: "Paris", postal_code: 75_012, website_url: "hello.com", user_id: user.id } }
        expect(response).to redirect_to(admin_path)
      end

      it "should create a restaurant if params valid" do
        user = create(:user, :r)
        post :create, params: { restaurant: { name: 'hello', street: '1, road hello', city: "Paris", postal_code: 75_012, website_url: "hello.com", user_id: user.id } }
        expect(Restaurant.first.name).to eq("hello")
      end
    end
  end


  describe "#index" do
    context "when user is not an admin" do
      it "should redirect to login if no user logged in" do
        get :index
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        user = create(:user, :c)
        sign_in(user)

        get :index
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        sign_in(user)

        get :index
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should render index" do
        get :index
        expect(response).to render_template(:index)
      end
    end
  end
end
