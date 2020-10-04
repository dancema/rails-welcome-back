class Api::V1::CodesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    offer = Offer.find(params[:offer_id])
    user = User.first
    password = SecureRandom.hex(4)

    Code.where(user: user, status: 'active').each do |code|
      code.status = 'inactive'
      code.save
    end

    code = Code.create(offer: offer, user: user, password: password, status: 'active')

    render json: [code.password]
  end
end
