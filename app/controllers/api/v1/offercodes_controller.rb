class Api::V1::OffercodesController < ApplicationController
  def create
    unless offer_params[:id].match /^[0-9]+$/
      return render json: {
        error: "offer id format not good"
        }, status: 400
    end

    offer = Offer.find_by(offer_params)

    if offer
      user = current_user
      code = SecureRandom.hex(3)

      if user.stars.where(status: 'available').count < offer.stars_required
        return render json: {error: 'User without enough stars'}, status: 403
      end

      if !Offercode.where(user: user, status: 'valid').empty?
        Offercode.where(user: user, status: 'valid').each do |offercode|
          offercode.status = 'cancel'
          offercode.save
        end
      end

      offercode = Offercode.create(offer: offer, user: user, code: code, status: 'valid')
      render json: { code: offercode.code }, status: :ok
    else
      render json: {
        error: "Offer id invalide"
      }, status: :not_found
    end
  end

  private

  def offer_params
    params.require(:offer).permit(:id)
  end
end
