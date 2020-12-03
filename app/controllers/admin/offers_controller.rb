class Admin::OffersController < ApplicationController
  before_action :authenticate_user!
  # before_action :is_admin?

  def new
    @offer = Offer.new
  end

  def create
    @offer = Offer.new(strong_params)
    if @offer.save
      redirect_to admin_path, notice: "Offer created successfully."
    else
      redirect_to new_admin_offer_path, alert: "Error creating offer."
    end
  end


  private

  def strong_params
    params.require(:offer).permit(:title, :offer_type, :stars_required, :restaurant_id)
  end
  # def is_admin?
  #   redirect_to main_app.root_path unless current_user.role === "admin"
  # end
end
