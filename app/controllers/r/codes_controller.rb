class R::CodesController < ApplicationController
  before_action :role_check

  def show
    @code = Code.new
  end

  def use
    code = Code.where(password: params[:code][:password]).first
    if code.nil? || code.status == "inactive"
      message = "invalid"
    else
      stars_canceled = 0
      stars = Star.where(user: current_user, status: "scanned")
      stars.each do |star|
        if stars_canceled < code.offer.stars_required
          star.status = "used"
          star.used_at = Time.now
          star.save
          stars_canceled += star.amount
        end
      end
      code.status = "used"
      code.used_at = Time.now
      code.save
      message = "OK"
    end

    render json: [message]
  end


  private

  def role_check
    if current_user.role != "restaurant"
      render template: "pages/error"
    end
  end

  def strong_params
    # to dooo
  end
end
