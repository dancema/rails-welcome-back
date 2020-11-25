class Api::V1::OffersController < ApplicationController
  load_and_authorize_resource
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index

    restaurant = Restaurant.find(params[:restaurant_id])

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

    offer = Offer.find(params[:id])

    if offer
      render json: offer
    else
      render json: {
        error: "Offer not found"
      }, status: :not_found
    end
  end

  private

  def record_not_found
    render json: { error: "Offer not found" }, status: :not_found
  end

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
