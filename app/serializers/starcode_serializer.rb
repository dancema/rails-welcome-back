# class RestaurantSerializer
#   include JSONAPI::Serializer
#   attributes :name, :street, :city, :postal_code
#   has_many :offers

#   attribute :count_stars do |restaurant, params|
#     restaurant.stars.where(user: params[:current_user], status: 'available').count if params[:current_user]
#   end
# end
