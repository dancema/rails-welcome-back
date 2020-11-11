class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: login_params[:email])
    if user && user.valid_password?(login_params[:password])
      @current_user = user
      render json: { user: user.attributes.except('password',
'password_confirmation'), status: 200},
             status: 200
    else
      render json: {message: "Error, Unauthorized", status: 401},
             status: :unauthorized
    end
  end

  def logged_in?
    if current_user && (current_user.role == 'client')
      return render json: { logged_in: true }
    else
      return render json: { logged_in: false }
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end


end
