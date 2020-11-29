class Api::V1::StarcodesController < ApplicationController
  # load_and_authorize_resource param_method: :starcode_params
  # load_and_authorize_resource

  def index
    starcode = Starcode.search(params)

    if starcode
      # raise Error::AlreadyScannedError if starcode.status == "scanned"
      if starcode.status == "scanned"
        return render json: {
        error: "Already scanned"
        }, status: 409
      end
      render json: {restaurant_name: starcode.stars.first.restaurant.name, restaurant_id: starcode.stars.first.restaurant.id}, status: :ok
    else
      render json: {
        error: "Code invalide"
      }, status: :not_found
    end
  end

  def activate
    authenticate_user!
    # authorize! :activate, :starcode
    starcode = Starcode.find_by(starcode_params)

    if starcode
      # raise Error::AlreadyScannedError if starcode.status == "scanned"
      if starcode.status == "scanned"
        return render json: {
        error: "Already scanned"
        }, status: 409
      end
      starcode.status = "scanned"
      starcode.scanned_at = Time.now
      starcode.stars.each do |star|
        star.status = "available"
        star.user = current_user
        star.save
      end
      starcode.save
      render json: {message: 'Star added to account'}, status: :ok
    else
      render json: {
        error: "Code invalide"
      }, status: :not_found
    end
  end

  private

  def starcode_params
    params.require(:starcode).permit(:code)
  end

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
