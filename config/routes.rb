Rails.application.routes.draw do
  get 'restaurants/home'
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


  get "/restaurants/:restaurant_id/offers/:id", to: 'clients#home'
  get "/restaurants/:id", to: 'clients#home'
  get "/stars/:code", to: 'clients#home'
  get "/stars", to: 'clients#home'
  root to: 'clients#home', :as => :client_root


end
