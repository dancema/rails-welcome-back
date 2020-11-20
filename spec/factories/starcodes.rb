FactoryBot.define do
  factory :starcode do
    code { "12345678" }
    status { "valid" }
    association :batch
  end
end
