class Admin::RestaurantsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource param_method: :strong_params

  def new
    @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.new(strong_params)
    if @restaurant.save
      redirect_to admin_path, notice: "Restaurant created successfully."
    else
      redirect_to new_admin_restaurant_path, alert: "Error creating restaurant."
    end
  end

  def index
    @restaurants = Restaurant.all
  end

  def show
    @restaurant = Restaurant.find(params[:id])
  end

  def edit
    @restaurant = Restaurant.find(params[:id])
  end

  def update
    @restaurant = Restaurant.find(params[:id])
    if @restaurant.update_attributes(strong_params)
      redirect_to admin_restaurant_path(@restaurant), notice: "Restaurant successfully updated."
    else
      redirect_to edit_admin_restaurant_path(@restaurant), alert: "Error updating restaurant."
    end
  end

  private

  def strong_params
    params.require(:restaurant).permit(:name, :street, :city, :postal_code, :website_url, :user_id)
  end

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
