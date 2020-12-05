class RestaurantSerializer
  include JSONAPI::Serializer
  attributes :name, :street, :city, :postal_code
  has_many :offers

  attribute :count_stars do |restaurant, params|
    restaurant.stars_count_available(params[:current_user]) if params[:current_user]
  end
end
