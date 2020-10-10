class Admin2::StarsController < ApplicationController
  before_action :authenticate_user!

  def new
    @restaurants = Restaurant.all
  end

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    amount = params[:nb_stars_per_qr].to_i
    nb_qr = params[:nb_qr].to_i

    nb_qr.times {
      star = Star.create(restaurant:restaurant, amount:amount, status:"valid", code: SecureRandom.hex(4))
    }
  end

  def show
  end

end
