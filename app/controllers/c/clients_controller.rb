class C::ClientsController < ApplicationController
  before_action :role_check


  def home
    @restaurants = Restaurant.all
  end

  private

  def role_check
    if current_user.role != "client"
      render template: "pages/error"
    end
  end
end
