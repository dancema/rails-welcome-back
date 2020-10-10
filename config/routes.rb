Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  #API


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :codes, only: [:create]
      resources :restaurants, only: [:index, :show] do
        resources :offers, only: [:index, :show]
      end
    end

  end

  namespace :admin2 do
    resources :stars, only: [:new, :create, :index]
  end


  get "/restaurants/:restaurant_id/offers/:id", to: 'pages#home'
  get "/restaurants/:id", to: 'pages#home'
  root to: 'pages#home'



end
