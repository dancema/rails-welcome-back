require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Admin::UsersController, :type => :controller do
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

      it "should render home" do
        get :index
        expect(response).to render_template(:index)
      end
    end
  end

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
        post :create, params: { user: { email: 'hello@hello.com', password: '123456', role: 'restaurant' } }
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        user = create(:user, :c)
        sign_in(user)

        post :create, params: { user: { email: 'hello@hello.com', password: '123456', role: 'restaurant' } }
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        sign_in(user)

        post :create, params: { user: { email: 'hello@hello.com', password: '123456', role: 'restaurant' } }
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should redirect to users#new if user not created" do
        post :create, params: { user: { email: 'llo.com', password: '123456', role: 'restaurant' } }
        expect(response).to redirect_to(new_admin_user_path)
      end

      it "should create a user if params valid" do
        post :create, params: { user: { email: 'hello@hello.com', password: '123456', role: 'restaurant' } }
        expect(User.last.email).to eq('hello@hello.com')
      end

      it "should redirect to pages#home if user successfully created" do
        post :create, params: { user: { email: 'hello@hello.com', password: '123456', role: 'restaurant' } }
        expect(response).to redirect_to(admin_path)
      end
    end
  end
end
