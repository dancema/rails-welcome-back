class Api::V1::OffersController < ApplicationController
  def index
    offers = Offer.where(restaurant: Restaurant.find(params[:restaurant_id]))
    render json: offers
  end

  def show
    offer = Offer.find(params[:id])
    render json: offer
  end

  def available
    nb_stars = current_user.stars.where(status: "valid").sum(:amount)
    nb_offers = Offer.where("stars_required <= '#{nb_stars}'").group(:restaurant).count

    nb_offers_available_per_restaurant = {}
    nb_offers.each do |restaurant, value|
      nb_offers_available_per_restaurant[restaurant.id] = value
    end

    render json: nb_offers_available_per_restaurant
  end
end
