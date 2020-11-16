class ApplicationController < ActionController::Base

  protect_from_forgery unless: -> { request.format.json? }

  # before_action :authenticate_user!
  include Error::ErrorHandler


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

  # def after_sign_in_path_for(resource)
  #   if resource.role == 'admin'
  #     rails_admin_path
  #   elsif resource.role == 'restaurant'
  #     r_restaurant_root_path
  #   else
  #     c_client_root_path
  #   end
  # end
