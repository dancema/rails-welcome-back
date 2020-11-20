require 'rails_helper'

RSpec.describe User, :type => :model do
  it "is not valid without an email" do
    user = build(:user_client, email: nil)
    expect(user).to_not be_valid
  end

  it "is not valid if email already taken" do
    create(:user_client)
    user2 = build(:user_client)
    expect(user2).to_not be_valid
  end

  it "is not valid without role" do
    user = build(:user_client, role: nil)
    expect(user).to_not be_valid
  end

  it "is valid if role in some values" do
    user = build(:user_client)
    expect(user).to be_valid  #use shoulda-matcher gem better
  end
end
