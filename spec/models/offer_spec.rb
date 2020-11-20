require 'rails_helper'

RSpec.describe Offer, :type => :model do
  it "is not valid without a title" do
    offer = build(:offer_exclusive, title: nil)
    expect(offer).to_not be_valid
  end

  it "is not valid without an offer_type" do
    offer = build(:offer_exclusive, offer_type: nil)
    expect(offer).to_not be_valid
  end

  it "is not valid if offer_type not included in some values" do
    offer = build(:offer_exclusive, offer_type: "test")
    expect(offer).to_not be_valid
  end

  it "is valid if offer_type included in some values" do
    offer = build(:offer_exclusive)
    expect(offer).to be_valid
  end

  it "is not valid without stars_required" do
    offer = build(:offer_exclusive, stars_required: nil)
    expect(offer).to_not be_valid
  end

  it "belongs to restaurant" do
    offer = build(:offer_exclusive)
    expect(offer).to respond_to :restaurant
  end
end
