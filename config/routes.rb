Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }, path: '', path_names: { sign_in: 'login', sign_out: 'logout'}

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  #API


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :codes, only: [:create]
      post "/stars" => "stars#activate"
      resources :exploded_stars, only: [:index, :show]
      resources :restaurants, only: [:index, :show] do
        resources :offers, only: [:index, :show]
      end
      get "/offers" => "offers#available"

    end
  end

  namespace :admin2 do
    resources :starcodes, only: [:new, :create, :index]
  end

  namespace :c do
    get "/restaurants/:restaurant_id/offers/:id", to: 'clients#home'
    get "/restaurants/:id", to: 'clients#home'
    get "/stars/:code", to: 'clients#home'
    get "/stars", to: 'clients#home'
    get "/" ,to: 'clients#home', :as => :client_root
  end

  namespace :r do
    get "/restaurants/:id", to: 'restaurants#show'
    get "/codes/:code", to: 'codes#show'
    post "/codes", to: 'codes#use'
    get "/codes", to: 'codes#show'
    get "/dashboard", to: 'restaurants#home', :as => :restaurant_root
  end

  devise_scope :user do
    root to: "devise/sessions#new"
  end

end
