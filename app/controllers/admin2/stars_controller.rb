class Admin2::StarsController < ApplicationController
  before_action :authenticate_user!
  before_action :is_admin?

  def new
    @restaurants = Restaurant.all
  end

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    amount = params[:nb_stars_per_qr].to_i
    nb_qr = params[:nb_qr].to_i
    batch_name = params[:batch_name]

    #validation to do to refuse a batch_name already in DB

    nb_qr.times {
      star = Star.create(restaurant: restaurant, amount: amount, status: "valid", code: SecureRandom.hex(4), batch_name: batch_name)
      amount.times {
        ExplodedStar.create(star: star, status: "not-valid")

      }
    }


    redirect_to action: "index",  batch_name: batch_name
  end

  def index
    @batch_names = Star.select(:batch_name).map(&:batch_name).uniq
    @stars = Star.where(batch_name: params[:batch_name]) if params[:batch_name].present?

    @qr = []
    if !@stars.nil?
      @stars.each do |star|
        @qr << RQRCode::QRCode.new("http://localhost:3000/stars/#{star.code}")
      end
    end
  end

  private

  def is_admin?
    redirect_to main_app.root_path unless current_user.role === "admin"
  end
end
