Rails.application.routes.draw do
  devise_for :users

  #API


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :codes, only: [:create]
      resources :restaurants, only: [:index, :show]
    end
  end

  get "/restaurants/:id", to: 'pages#home'
  root to: 'pages#home'



end
