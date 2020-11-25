class Api::V1::StarsController < ApplicationController
  authorize_resource


  def index

    stars_per_restaurant = Star.where(status: "available", user: current_user).group(:restaurant_id).count

    render json: stars_per_restaurant
  end

  def show
    restaurant = Restaurant.find_by(id: params[:id])
    stars_per_restaurant = Star.where(status: "available", user: current_user, restaurant: restaurant).group(:restaurant_id).count

    render json: stars_per_restaurant
  end


  private

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
