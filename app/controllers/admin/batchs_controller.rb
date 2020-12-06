class Admin::BatchsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

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

  private

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
