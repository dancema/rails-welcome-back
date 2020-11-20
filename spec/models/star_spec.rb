require 'rails_helper'

RSpec.describe Star, :type => :model do
  it "is not valid without status" do
    star = build(:star, status: nil)
    expect(star).to_not be_valid
  end

  it "is not valid with status 'test'" do
    star = build(:star, status: 'test')
    expect(star).to_not be_valid
  end

  it "is valid without an offercode" do
    star = build(:star, offercode: nil)
    expect(star).to be_valid
  end

  it "belongs to an offercode" do
    offercode = build(:offercode)
    star = build(:star, offercode: offercode)
    expect(star).to respond_to :offercode
  end

  it "belongs to starcode" do
    star = build(:star)
    expect(star).to respond_to :starcode
  end

  it "belongs to restaurant" do
    star = build(:star)
    expect(star).to respond_to :restaurant
  end
end
