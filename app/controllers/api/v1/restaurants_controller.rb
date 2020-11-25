class Api::V1::RestaurantsController < ActionController::Base
  load_and_authorize_resource


  def index
    @restaurants = Restaurant.all
    render json: @restaurants
  end

  def show

    # unless params[:id].match(/^[0-9]+$/)
    #   return render json:
    #     { error: "Restaurant id format not good" }, status: 400
    # end

    restaurant = Restaurant.find_by(id: params[:id])

    if restaurant
      render json: restaurant
    else
      render json:
        { error: "Restaurant not found" }, status: :not_found
    end


    #rescue from Notfound !
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
