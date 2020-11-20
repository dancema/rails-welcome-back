require 'rails_helper'

RSpec.describe Starcode, :type => :model do
  it "is not valid without status" do
    starcode = build(:starcode, status: nil)
    expect(starcode).to_not be_valid
  end

  it "is not valid if code not made of 8 characters" do
    starcode = build(:starcode, code: "123er")
    expect(starcode).to_not be_valid
  end

  it "is not valid with status 'test'" do
    starcode = build(:starcode, status: 'test')
    expect(starcode).to_not be_valid
  end

  it "is not valid without a batch" do
    starcode = build(:starcode, batch_id: nil)
    expect(starcode).to_not be_valid
  end

  it "belongs to a batch" do
    starcode = create(:starcode)
    expect(starcode).to respond_to :batch
  end
end
