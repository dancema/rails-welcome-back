class ClientsController < ApplicationController
  def home
    @restaurants = Restaurant.all
  end
end
