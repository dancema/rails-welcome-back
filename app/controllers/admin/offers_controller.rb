class Admin::OffersController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource param_method: :strong_params

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

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
