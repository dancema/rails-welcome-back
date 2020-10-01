class Api::V1::RestaurantsController < ActionController::Base
  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  def show
    offers = Offer.where(restaurant: Restaurant.find(params[:id]))
    render json: offers
  end
end
