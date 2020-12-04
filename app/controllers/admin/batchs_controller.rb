class Admin::BatchsController < ApplicationController
  before_action :authenticate_user!
  # before_action :is_admin?
  # layout false, only: [:show]


  def index

  end

  def show
    batch = Batch.find(params[:id])
    @starcodes = batch.starcodes

    @qr = []
    @starcodes.each do |starcode|
      @qr << RQRCode::QRCode.new("http://www.welcomeback.best/stars/#{starcode.code}")
    end
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "hello"
      end
    end
  end
end
