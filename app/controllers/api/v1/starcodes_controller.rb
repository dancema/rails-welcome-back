class Api::V1::StarcodesController < ApplicationController
  def activate
    starcode = Starcode.find_by(code: params[:code])
    if starcode
      starcode.status = "scanned"
      starcode.scanned_at = Time.now
      Star.where(starcode: starcode).each do |star|
        star.status = "available"
        star.user = current_user
        star.save
      end
      starcode.save
      render json: starcode, status: :ok
    else
      render json: {
        error: "Code not found."
      }, status: :not_found
    end
  end
end
