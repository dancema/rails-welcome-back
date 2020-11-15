class Admin::StarcodesController < ApplicationController
  before_action :authenticate_user!
  before_action :is_admin?

  def new
    @restaurants = Restaurant.all
  end

  def create
    restaurant = Restaurant.find(params[:restaurant_id])
    amount = params[:nb_stars_per_qr].to_i
    nb_qr = params[:nb_qr].to_i
    batch_name = params[:batch_name]

    #validation to do to refuse a batch_name already in DB
    batch = Batch.create(name: batch_name)

    nb_qr.times {
      starcode = Starcode.create(status: "valid", code: SecureRandom.hex(4), batch: batch)
      amount.times {
        Star.create(restaurant: restaurant, status: "valid", starcode: starcode)
      }
    }

    redirect_to action: "index",  batch_name: batch_name
  end

  def index
    @batch_names = Batch.all.map(&:name)
    batch = Batch.where(name: params[:batch_name])
    @starcodes = Starcode.where(batch: batch) if params[:batch_name].present?

    @qr = []
    if !@starcodes.nil?
      @starcodes.each do |starcode|
        @qr << RQRCode::QRCode.new("http://www.welcomeback.best/stars/#{starcode.code}")
      end
    end

  end

  private

  def is_admin?
    redirect_to main_app.root_path unless current_user.role === "admin"
  end
end
