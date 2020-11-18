FactoryBot.define do
  factory :restaurant do
    name { 'test_restaurant' }
    street { 'rue du test' }
    city { 'Paris' }
    postal_code { '75012' }
    website_url { 'test.com' }
    association :user, :r
  end
end
