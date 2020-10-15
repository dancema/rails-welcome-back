class R::RestaurantsController < ApplicationController
  before_action :role_check

  def home
    @restaurants = Restaurant.where(user:current_user)
  end

  private

  def role_check
    if current_user.role != "restaurant"
      render template: "pages/error"
    end
  end
end
