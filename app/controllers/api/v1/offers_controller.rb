class Api::V1::OffersController < ApplicationController
  def index
    unless params[:restaurant_id].match /^[0-9]+$/
      return render json: {
        error: "Restaurant id format not good"
        }, status: 400
    end

    restaurant = Restaurant.find_by(id: params[:restaurant_id])

    if restaurant
      offers = Offer.where(restaurant: restaurant)
      render json: offers
    else
      render json: {
        error: "Restaurant not found"
      }, status: :not_found
    end
  end

  def show
    unless params[:id].match /^[0-9]+$/
      return render json: {
        error: "Offer id format not good"
        }, status: 400
    end

    offer = Offer.find_by(id: params[:id])

    if offer
      render json: offer
    else
      render json: {
        error: "Offer not found"
      }, status: :not_found
    end
  end
end
