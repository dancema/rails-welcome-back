Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  #API


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :codes, only: [:create]
      post "/stars" => "stars#activate"
      resources :stars, only: [:index, :show]
      resources :restaurants, only: [:index, :show] do
        resources :offers, only: [:index, :show]
      end
      get "/offers" => "offers#available"

    end
  end

  namespace :admin2 do
    resources :stars, only: [:new, :create, :index]
  end


  get "/restaurants/:restaurant_id/offers/:id", to: 'pages#home'
  get "/restaurants/:id", to: 'pages#home'
  get "/stars/:code", to: 'pages#home'
  get "/stars", to: 'pages#home'
  root to: 'pages#home'

end
