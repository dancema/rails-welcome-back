FactoryBot.define do
  factory :offercode do
    code { "123456" }
    status { "valid" }
    association :offer, :loyalty
    association :user, :c
  end
end
