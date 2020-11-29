class Api::V1::RestaurantsController < ActionController::Base
  load_and_authorize_resource
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def index
    restaurants = Restaurant.all
    render json: RestaurantSerializer.new(restaurants, { include: [:offers], params: { current_user: current_user } }).serializable_hash
  end

  def show
    restaurant = Restaurant.find(params[:id])

    if restaurant
      render json: RestaurantSerializer.new(restaurant, { include: [:offers], params: { current_user: current_user } }).serializable_hash
    else
      render json:
        { error: "Restaurant not found" }, status: :not_found
    end
  end

  private

  def record_not_found
    render json: { error: "Restaurant not found" }, status: :not_found
  end

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
