class Api::V1::StarsController < ApplicationController
  def index
    stars_per_restaurant = Star.where(status: "available", user: current_user).group(:restaurant_id).count

    render json: stars_per_restaurant
  end

  def show
    restaurant = Restaurant.find(params[:id])
    stars_per_restaurant = Star.where(status: "available", user: current_user, restaurant: restaurant).group(:restaurant_id).count

    render json: stars_per_restaurant
  end
end
