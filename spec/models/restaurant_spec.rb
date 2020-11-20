require 'rails_helper'

RSpec.describe Restaurant, :type => :model do
  it "is not valid without a name" do
    restaurant = build(:restaurant, name: nil)
    expect(restaurant).to_not be_valid
  end

  it "is not valid without a street" do
    restaurant = build(:restaurant, street: nil)
    expect(restaurant).to_not be_valid
  end

  it "is not valid without a city" do
    restaurant = build(:restaurant, city: nil)
    expect(restaurant).to_not be_valid
  end

  it "is not valid without a postal_code" do
    restaurant = build(:restaurant, postal_code: nil)
    expect(restaurant).to_not be_valid
  end

  it "is not valid without a user" do
    restaurant = build(:restaurant, user: nil)
    expect(restaurant).to_not be_valid
  end

  it "belongs to a user" do
    restaurant = create(:restaurant)
    expect(restaurant).to respond_to :user
  end
end
