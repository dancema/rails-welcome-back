class Api::V1::RestaurantsController < ActionController::Base
  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  def show
    unless params[:id].match /^[0-9]+$/
      return render json: {
        error: "Restaurant id format not good"
        }, status: 400
    end

    restaurant = Restaurant.find_by(id: params[:id])

    if restaurant
      render json: restaurant
    else
      render json: {
        error: "Restaurant not found"
      }, status: :not_found
    end
  end
end
