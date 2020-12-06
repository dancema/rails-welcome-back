require 'rails_helper'

RSpec.describe Batch, :type => :model do
  it "is not valid without a name" do
    batch = build(:batch, name: nil)
    expect(batch).to_not be_valid
  end

  it "has many starcodes" do
    batch = create(:batch)
    create(:starcode, batch: batch)
    expect(batch).to respond_to :starcodes
  end

  it "has many stars" do
    batch = create(:batch)
    starcode = create(:starcode, batch: batch)
    create(:star, starcode: starcode)
    expect(batch).to respond_to :stars
  end
end
