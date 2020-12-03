class Admin::RestaurantsController < ApplicationController
  before_action :authenticate_user!
  # before_action :is_admin?

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


  private

  def strong_params
    params.require(:restaurant).permit(:name, :street, :city, :postal_code, :website_url, :user_id)
  end
  # def is_admin?
  #   redirect_to main_app.root_path unless current_user.role === "admin"
  # end
end
