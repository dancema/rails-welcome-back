class Admin::PagesController < ApplicationController
  before_action :authenticate_user!
  # before_action :is_admin?

  def home

  end


  private

  # def is_admin?
  #   redirect_to main_app.root_path unless current_user.role === "admin"
  # end
end
