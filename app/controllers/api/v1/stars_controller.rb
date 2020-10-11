class Api::V1::StarsController < ApplicationController
  def activate
    star = Star.where(code: params[:code]).first
    if star.nil?
      message = "invalid"
    else
      star.user = current_user
      star.save
      message = "valid"
    end

    render json: [message]
  end

  def index
    stars_per_restaurant = current_user.stars.group(:restaurant).sum(:amount)

    render json: stars_per_restaurant
  end

end
