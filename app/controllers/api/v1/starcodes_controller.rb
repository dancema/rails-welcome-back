class Api::V1::StarcodesController < ApplicationController
  def activate

    unless code_params[:code].match /^[0-9a-zA-Z]{6}$/
      return render json: {
        error: "code format not good"
        }, status: 400
    end

    starcode = Starcode.find_by(code_params)
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

  def exist

    unless params[:code].match /^[0-9a-zA-Z]{6}$/
      return render json: {
        error: "code format not good"
        }, status: 400
    end


    starcode = Starcode.find_by(code: params[:code])

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

 private

  def code_params
    params.require(:starcode).permit(:code)
  end

end
