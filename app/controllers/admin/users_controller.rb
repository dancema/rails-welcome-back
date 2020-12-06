class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource param_method: :strong_params


  def new
    @user = User.new(role: 'restaurant')
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(strong_params)
    if @user.save
      redirect_to admin_path, notice: "User created successfully."
    else
      redirect_to new_admin_user_path, alert: "Error creating user."
    end
  end

  def index
    if params[:search]
      @users = User.where('email LIKE ?', "%#{params[:search]}%")
    else
      @users = User.all
    end
  end

  private

  def strong_params
    params.require(:user).permit(:password, :email, :role)
  end

  def current_ability
    # I am sure there is a slicker way to capture the controller namespace
    controller_name_segments = params[:controller].split('/')
    controller_name_segments.pop
    controller_namespace = controller_name_segments.join('/').camelize
    @current_ability ||= Ability.new(current_user, controller_namespace)
  end
end
