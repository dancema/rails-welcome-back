require "rails_helper"
require "devise"

# RSpec.configure {|c| c.before { expect(controller).not_to be_nil }}
RSpec.describe Api::V1::StarcodesController, :type => :controller do

  describe "#activate" do
    # it "sign_in works in specs" do
    #   sign_in(create(:user, :c))
    #   expect(request.session.empty?).to be(false)
    # end

    context 'when code is not valid' do
      it "responds with bad request when code is not made of 6 characters" do
        post :activate, :params => { starcode: {:code => "1111111226"} }
        expect(response).to have_http_status(400)
      end

      it "responds with not found when code does not exist" do
        post :activate, :params => { starcode: {:code => "111111"} }
        expect(response).to have_http_status(:not_found)
      end

      it "responds with conflict when code already scanned" do
        starcode = create(:starcode, status: 'scanned')
        post :activate, :params => { starcode: {:code => "123456"} }
        expect(response).to have_http_status(409)
      end

    end

    context 'when user not logged in' do
      it "responds with unauthorized" do
        post :activate, :params => { starcode: {:code => "111111"} }
        expect(response).to have_http_status(401)
      end
    end

    context 'when code valid and user logged in' do
      before (:each) do
        create(:star)
        sign_in(create(:user, :c))
        post :activate, :params => { starcode: {:code => "123456"} }
      end

      it "responds with OK" do
        expect(response).to have_http_status(200)
      end

      it "changes starcode status to 'scanned'" do
        expect(Starcode.first.status).to eq('scanned')
      end

      it "add scanned_at time to starcode" do
        expect(Starcode.first.scanned_at).to be <= Time.now
      end

      it "add current_user to star" do
        expect(Star.first.user).to be_truthy
      end

      it "change status of star to 'available'" do
        expect(Star.first.status).to eq('available')
      end
    end
  end

  describe "#exist" do
    context 'when code is not valid' do
      it "responds with bad request when code is not made of 6 characters" do
        code = '1111111226'
        get :exist, :params => {:code => code}
        expect(response).to have_http_status(400)
      end

      it "responds with not found when code does not exist" do
        code = '111111'
        get :exist, :params => {:code => code}
        expect(response).to have_http_status(:not_found)
      end

      it "responds with conflict when code already scanned" do
        starcode = create(:starcode, status: 'scanned')
        code = '123456'
        get :exist, :params => {:code => code}
        expect(response).to have_http_status(409)
      end
    end

    context "when code is valid" do
      it "responds with status OK" do
        star = create(:star)
        code = '123456'
        get :exist, :params => {:code => code}
        expect(response).to have_http_status(200)
      end

      it "responds with restaurant_name and restaurant_id" do
        star = create(:star)
        code = '123456'
        get :exist, :params => { :code => code }
        expect(JSON.parse(response.body)).to eq({'restaurant_name' => star.restaurant.name, 'restaurant_id' => star.restaurant.id})
      end
    end
  end
end
