class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  include Error::ErrorHandler

  def after_sign_in_path_for(resource)
    if resource.role == 'admin'
      rails_admin_path
    elsif resource.role == 'restaurant'
      r_restaurant_root_path
    else
      c_client_root_path
    end
  end
end
