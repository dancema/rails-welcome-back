FactoryBot.define do
  factory :starcode do
    code { "123456" }
    status { "valid" }
    association :batch
  end
end
