class Api::V1::SessionsController < Devise::SessionsController
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

  def logged_in?
    logged_in = !current_user.nil?
    render json: { logged_in: logged_in }
  end
end
