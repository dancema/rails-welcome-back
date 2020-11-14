class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

  def create
    respond_to do |format|
      format.html { super }
      format.json {
        warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
        render :status => 200, :json => { :error => "Success" }
      }
    end
  end


  def sign_up_params
    devise_parameter_sanitizer.sanitize(:sign_up)
  end

  def account_update_params
    devise_parameter_sanitizer.sanitize(:account_update)
  end


  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
