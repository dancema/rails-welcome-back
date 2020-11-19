FactoryBot.define do
  factory :offer do
    title { 'Giros' }
    restaurant

    trait :exclusive do
      offer_type { 'exclusive-deal' }
      stars_required { 0 }
    end

    trait :loyalty do
      offer_type { 'loyalty' }
      stars_required { 2 }
    end

    factory :offer_exclusive, traits: [:exclusive]
    factory :offer_loyalty, traits: [:loyalty]
  end
end
