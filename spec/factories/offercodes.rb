FactoryBot.define do
  factory :offercode do
    code { "12345678" }
    status { "valid" }
    association :offer, :loyalty
    association :user, :c
  end
end
