class Offercode<ApplicationRecord
  belongs_to :user
  belongs_to :offer
  has_one :restaurant, :through => :offer

  attribute :code, :string, default: -> { SecureRandom.hex(3).to_s }  #TODO : replace with method giving uniq values

  validates :code, presence: true, uniqueness: true, length: {is: 6}
  validates :status, inclusion: {in: %w(valid scanned cancel), message: "%{value} is not a valid status"}

  before_create :deactivate_past_offercodes, :ensure_has_enough_stars

  private

  def ensure_has_enough_stars
    # TODO : adapt code
=begin
    # current_user.has_enough_stars(offer.stars_required)
    if current_user.stars.where(status: 'available').count<offer.stars_required
      return render json: {error: 'User without enough stars'}, status: 403
    end
=end
  end

  def deactivate_past_offercodes
    # TODO : addapt code
=begin
    # if current_user.has_valid_offercodes?
    if Offercode.where(user: current_user, status: 'valid').any?
      # current_user.valid_offercodes.update_all(status: 'cancel')
      Offercode.where(user: current_user, status: 'valid').update_all(status: 'cancel')
    end
=end
  end

end
