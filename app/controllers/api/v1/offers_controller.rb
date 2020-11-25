class Api::V1::OffersController < ApplicationController
  load_and_authorize_resource

  def index
    # unless params[:restaurant_id].match /^[0-9]+$/
    #   return render json: {
    #     error: "Restaurant id format not good"
    #     }, status: 400
    # end

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
    # debugger
    # unless params[:id].match /^[0-9]+$/
    #   return render json: {
    #     error: "Offer id format not good"
    #     }, status: 400
    # end

    offer = Offer.find_by(id: params[:id])

    if offer
      render json: offer
    else
      render json: {
        error: "Offer not found"
      }, status: :not_found
    end
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
