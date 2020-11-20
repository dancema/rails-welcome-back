class Api::V1::OffercodesController < ApplicationController

  def create
    # debugger
    offer = Offer.find(params[:offer_id])
    user = current_user
    code = SecureRandom.hex(3)

    if !Offercode.where(user: user, status: 'active').empty?
      Offercode.where(user: user, status: 'active').each do |offercode|
        offercode.status = 'inactive'
        offercode.save
      end
    end

    offercode = Offercode.create(offer: offer, user: user, code: code, status: 'valid')

    render json: {code: offercode.code}, status: :ok
  end
end
