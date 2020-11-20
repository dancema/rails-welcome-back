require "rails_helper"
# require_relative "../support/devise"

RSpec.describe Admin::StarcodesController, :type => :controller do
  describe "#new" do
    context "when admin not logged in" do
      it "responds with unauthorized if no user logged in"
      it "responds with forbidden if user role not 'admin'"
    end

    context "when admin logged in" do

    end
  end
end
