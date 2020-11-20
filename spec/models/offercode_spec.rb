require 'rails_helper'

RSpec.describe Offercode, :type => :model do
  it "is not valid without code" do
    offercode = build(:offercode, code: nil)
    expect(offercode).to_not be_valid
  end

  it "is not valid if code not made of 6 characters" do
    offercode = build(:offercode, code: "123er")
    expect(offercode).to_not be_valid
  end

  it "is not valid without status" do
    offercode = build(:offercode, status: nil)
    expect(offercode).to_not be_valid
  end

  it "is not valid with status 'test'" do
    offercode = build(:offercode, status: 'test')
    expect(offercode).to_not be_valid
  end

  it "is not valid if code already exists" do
    offer = create(:offer_exclusive)
    user = create(:user_client)
    create(:offercode, offer: offer, user: user)
    offercode = build(:offercode, offer: offer, user: user)
    expect(offercode).to_not be_valid
  end

  it "is not valid without offer" do
    offercode = build(:offercode, offer: nil)
    expect(offercode).to_not be_valid
  end

  it "is not valid without an user" do
    offercode = build(:offercode, user: nil)
    expect(offercode).to_not be_valid
  end

  it "belongs to offer" do
    offercode = build(:offercode)
    expect(offercode).to respond_to :offer
  end

  it "belongs to user" do
    offercode = build(:offercode)
    expect(offercode).to respond_to :user
  end
end
