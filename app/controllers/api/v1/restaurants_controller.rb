class Api::V1::RestaurantsController < ActionController::Base
  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render json: restaurant
  end
end