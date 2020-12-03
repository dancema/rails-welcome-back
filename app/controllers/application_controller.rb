class ApplicationController < ActionController::Base


  protect_from_forgery unless: -> { request.format.json? }


  # before_action :authenticate_user!
  include Error::ErrorHandler


  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { render json: { error: "Forbidden" }, status: 403 }
      format.html { redirect_to main_app.root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end


  private

  def after_sign_in_path_for(resource)
    if resource.role == 'admin'
      admin_path
    elsif resource.role == 'restaurant'
      r_path
    else
      c_client_root_path
    end
  end


  # def render_resource(resource)
  #   if resource.errors.empty?
  #     render json: resource
  #   else
  #     validation_error(resource)
  #   end
  # end

  # def validation_error(resource)
  #   render json: {
  #     errors: [
  #       {
  #         status: '400',
  #         title: 'Bad Request',
  #         detail: resource.errors,
  #         code: '100'
  #       }
  #     ]
  #   }, status: :bad_request
  # end
end


  # private

  # def current_user
  #   @current_user ||= super || User.find(@current_user_id)
  # end

  # def signed_in?
  #   @current_user_id.present?
  # end

