class R::OffercodesController < ApplicationController
  before_action :role_check

  def show
    @offercode = Offercode.new
  end

  def use
    offercode = Offercode.find_by(code: params[:offercode][:code], status: "valid")

    if offercode
      stars_canceled = 0
      stars = Star.where(user: offercode.user, status: "available")
      if stars.count < offercode.offer.stars_required
        offercode.status = 'inactive'
        offercode.save
        flash[:warning] = "Code invalide"
      else
        stars.each do |star|
          if stars_canceled < offercode.offer.stars_required
            star.status = "used"
            star.offercode = offercode
            star.save
            stars_canceled += 1
          end
        end
        offercode.status = "scanned"
        offercode.scanned_at = Time.now
        offercode.save
        flash[:notice] = "Code valide !"
        redirect_to action: "restaurants#show", id: offercode.restaurant.id
      end
    else
    flash[:warning] = "Code incorrect"
    redirect_to action: "show"
    end
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
