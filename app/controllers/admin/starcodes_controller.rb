class Admin::StarcodesController < ApplicationController
  before_action :authenticate_user!
  authorize_resource :class => false

  def new
    @restaurants = Restaurant.all
  end

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    amount = params[:nb_stars_per_qr].to_i
    nb_qr = params[:nb_qr].to_i

    batch_name = "#{restaurant.batchs.count + 1} - Month#{Time.now.month}"

    #validation to do to refuse a batch_name already in DB
    batch = Batch.create(name: batch_name)

    nb_qr.times {
      starcode = Starcode.create(status: "valid", code: SecureRandom.hex(3), batch: batch)
      amount.times {
        Star.create(restaurant: restaurant, status: "valid", starcode: starcode)
      }
    }

    redirect_to admin_batchs_path
  end

  private

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
