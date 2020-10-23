class Api::V1::StarsController < ApplicationController
  def activate
    star = Star.where(code: params[:code]).first
    if star.nil?
      message = "invalid"
    else
      star.user = current_user
      star.status = "scanned"
      star.scanned_at = Time.now
      ExplodedStar.where(star: star).each do |exploded_star|
        exploded_star.status = "valid"
        exploded_star.save
      end
      star.save
      message = "valid"
    end


    render json: [message]
  end
end
