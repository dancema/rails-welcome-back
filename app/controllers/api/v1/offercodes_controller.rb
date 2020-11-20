class Api::V1::OffercodesController < ApplicationController

  def create
    # debugger
    offer = Offer.find(params[:offer_id])
    user = current_user
    code = SecureRandom.hex(3)

    if !Offercode.where(user: user, status: 'valid').empty?
      Offercode.where(user: user, status: 'valid').each do |offercode|
        offercode.status = 'cancel'
        offercode.save
      end
    end

    offercode = Offercode.create(offer: offer, user: user, code: code, status: 'valid')
    render json: {code: offercode.code}, status: :ok
  end
end
