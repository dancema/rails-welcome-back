class Api::V1::OffersController < ApplicationController
  def index
    offers = Offer.where(restaurant: Restaurant.find(params[:restaurant_id]))
    render json: offers
  end

  def show
    offer = Offer.find(params[:id])
    render json: offer
  end
end
