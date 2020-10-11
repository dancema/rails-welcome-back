class Api::V1::StarsController < ApplicationController
  def activate
    star = Star.where(code: params[:code])
    if star == []
      message = "invalid"
    else
      debugger
      star.user_id = current_user.id
      star.save
      message = "valid"
    end

    render json: [message]
  end
end
