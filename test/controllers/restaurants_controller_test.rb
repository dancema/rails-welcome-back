require 'test_helper'

class RestaurantsControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get restaurants_home_url
    assert_response :success
  end

end
