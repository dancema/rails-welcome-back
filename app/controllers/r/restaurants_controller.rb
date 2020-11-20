class R::RestaurantsController < ApplicationController
  before_action :role_check

  def home
    @restaurants = Restaurant.where(user: current_user)
  end

  def show
    @restaurant = Restaurant.find(params[:id])

    @offercodes_scanned = Offercode.joins(:offer).where(:offercodes => { status: 'scanned' }, :offers => { :restaurant => @restaurant })
    @starcodes_scanned_by_batch = Starcode.joins(:batch, :stars).where({ :stars => { restaurant: @restaurant }, :starcodes => { status: "scanned" } }).group(:name).count
    @starcodes_total_by_batch = Starcode.joins(:batch, :stars).where({ :stars => { restaurant: @restaurant } }).group(:name).count


    # @total_stars_used = Star.where(restaurant: @restaurant).where.not(used_at: nil).count
    # @stars_per_user = Star.where(restaurant: @restaurant) #to dooooooo
    if params[:dates].present?
      @field_dates = params[:dates]
      start_date, end_date = params[:dates].split(' - ')
      start_date = Date.strptime(start_date, '%d/%m/%Y')
      end_date = Date.strptime(end_date, '%d/%m/%Y')
      # @orders_scanned = Star.where(restaurant: @restaurant, status: "scanned", :scanned_at => (start_date)..(end_date)).group_by_day(:scanned_at).count
    else
      @field_dates = (Date.today - 7).strftime('%d/%m%Y') + " - " + (Date.today).strftime('%d/%m%Y')
      # @orders_scanned = Star.where(restaurant: @restaurant, status: "scanned").group_by_day(:scanned_at).count
    end
  end


  private

  def role_check
    if current_user.role != "restaurant"
      render template: "pages/error"
    end
  end
end
