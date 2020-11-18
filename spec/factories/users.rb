FactoryBot.define do
  factory :user do
    password { 'testtest' }

    trait :c do
      email { 'client@client.fr' }
      role { 'client' }
    end

    trait :admin do
      email { 'admin@admin.fr' }
      role { 'admin' }
    end

    trait :r do
      email { 'restaurant@restaurant.fr' }
      role { 'restaurant' }
    end

    factory :user_restaurant, traits: [:r]   # login will be "admin-John Doe"
    factory :user_client, traits: [:c]
    factory :user_admin, traits: [:admin]
  end
end
