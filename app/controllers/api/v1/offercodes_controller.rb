class Api::V1::OffercodesController<ApplicationController
  before_action :authenticate_user!
  before_action :find_offer, only: :create
  load_and_authorize_resource param_method: :offer_params

  # TODO rewrite
  def create
      offercode = Offercode.create!(offer: @offer, user: current_user, status: 'valid')
      render json: offercode, status: :ok
  end

  private

  def offer_params
    params.require(:offer).permit(:id)
  end

  def find_offer
    @offer = Offer.find_by(offer_params)
  end

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability     ||= Ability.new(current_user, controller_namespace)
  end
end
