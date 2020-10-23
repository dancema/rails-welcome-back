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
    stars_per_restaurant = ExplodedStar.joins(:star).where(exploded_stars: { status: "valid" }, stars: { user: current_user }).group(:restaurant_id).count
    nb_offers_available_per_restaurant = {}
    stars_per_restaurant.each do |restaurant_id, nb_stars|
      nb_offers = Offer.where("stars_required <= '#{nb_stars}' AND restaurant_id= #{restaurant_id}").count
      nb_offers_available_per_restaurant[restaurant_id] = nb_offers
    end

    render json: nb_offers_available_per_restaurant
  end
end
