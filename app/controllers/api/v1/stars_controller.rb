class Api::V1::StarsController < ApplicationController
  def activate
    star = Star.where(code: params[:code]).first
    if star.nil?
      message = "invalid"
    else
      star.user = current_user
      star.status = "scanned"
      star.save
      message = "valid"
    end

    render json: [message]
  end

  def index
    stars_per_restaurant = current_user.stars.group(:restaurant).sum(:amount)
    nb_stars = {}
    stars_per_restaurant.each do |restaurant, value|
      nb_stars[restaurant.id] = value
    end

    render json: nb_stars
  end


  def show
    restaurant = Restaurant.find(params[:id])
    stars_per_restaurant = current_user.stars.where(restaurant: restaurant).group(:restaurant).sum(:amount)
    nb_stars = {}
    stars_per_restaurant.each do |restaurant, value|
      nb_stars[restaurant.id] = value
    end

    render json: nb_stars
  end
end
