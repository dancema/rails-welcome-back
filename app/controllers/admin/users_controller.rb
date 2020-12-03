class Admin::UsersController < ApplicationController
  def new

    @user = User.new(role: 'restaurant')
  end

  def create
    @user = User.new(strong_params)
    if @user.save
      redirect_to admin_path, notice: "User created successfully."
    else
      redirect_to new_admin_user_path, alert: "Error creating user."
    end
  end

  private

  def strong_params
    params.require(:user).permit(:password, :email, :role)
  end
end
