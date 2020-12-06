require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Admin::PagesController, :type => :controller do
  describe "#home" do
    context "when user is not an admin" do
      it "should redirect to login if no user logged in" do
        get :home
        expect(response).to redirect_to(new_user_session_path)
      end

      it "should redirect to root path if user is a client" do
        user = create(:user, :c)
        sign_in(user)
        get :home
        expect(response).to redirect_to(root_path)
      end

      it "should redirect to root path if user is a restaurant" do
        user = create(:user, :r)
        sign_in(user)
        get :home
        expect(response).to redirect_to(root_path)
      end
    end

    context "when admin logged in" do
      before(:each) do
        user = create(:user, :admin)
        sign_in(user)
      end

      it "should render home" do
        get :home
        expect(response).to render_template(:home)
      end
    end
  end
end
