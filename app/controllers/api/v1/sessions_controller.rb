class Api::V1::SessionsController < ApplicationController
  def logged_in?
    if current_user && (current_user.role == 'client')
      return render json: { logged_in: true }
    else
      return render json: { logged_in: false }
    end
  end
end
