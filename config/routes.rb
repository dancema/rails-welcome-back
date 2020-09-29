Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  get "/restaurants/:id", to: 'pages#home'

  #API

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :restaurants, only: [:index, :show]
    end
  end

end
