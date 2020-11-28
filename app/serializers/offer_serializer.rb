class OfferSerializer
  include JSONAPI::Serializer
  attributes :title, :stars_required, :offer_type
  belongs_to :restaurant

end
