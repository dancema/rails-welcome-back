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


  it "has many starcodes" do
    restaurant = create(:restaurant)
    starcode = create(:starcode)
    create(:star, starcode: starcode, restaurant: restaurant)
    expect(restaurant).to respond_to :starcodes
  end

  it "has many batchs" do
    restaurant = create(:restaurant)
    starcode = create(:starcode)
    create(:star, starcode: starcode, restaurant: restaurant)
    expect(restaurant).to respond_to :batchs
  end

  # it "counts the number of stars available for a user" do
  #   user = create(:user, :c)
  #   create(:star, status: 'available', user: user)
  #   expect(Restaurant.first.stars_count(user)).to eq(1)
  # end
end
