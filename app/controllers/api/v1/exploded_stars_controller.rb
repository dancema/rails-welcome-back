class Api::V1::ExplodedStarsController < ApplicationController
  def index
    stars_per_restaurant = ExplodedStar.joins(:star).where(exploded_stars: { status: "valid" }, stars: { user: current_user }).group(:restaurant_id).count

    render json: stars_per_restaurant
  end


  def show
    restaurant = Restaurant.find(params[:id])
    stars_per_restaurant = ExplodedStar.joins(:star).where(exploded_stars: { status: "valid" }, stars: { user: current_user, restaurant: restaurant }).group(:restaurant_id).count

    render json: stars_per_restaurant
  end
end
