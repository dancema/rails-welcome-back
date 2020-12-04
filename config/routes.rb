Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'api/v1/registrations', sessions: "api/v1/sessions" }, path: '', path_names: { sign_in: 'login', sign_out: 'logout'}

  #API


  devise_scope :user do
    namespace :api do
      namespace :v1 do
        resources :sessions, :only => [:create, :destroy]
        resources :registrations, :only => [:create]
        get "/sessions" => "sessions#logged_in?"
      end
    end
  end

  resources :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :offercodes, only: [:create]
      post "/starcodes" => "starcodes#activate"
      resources :starcodes, only: [:index]
      resources :stars, only: [:index, :show]
      resources :restaurants, only: [:index, :show]
      resources :offers, only: [:show]
    end
  end

  namespace :admin do
    get '/', to: 'pages#home'
    resources :users, :only => [:new, :create]
    resources :batchs, :only => [:index, :show]
    resources :restaurants, :only => [:create, :new, :index, :show]
    resources :offers, :only => [:create, :new]
    resources :starcodes, only: [:new, :create]
  end



  namespace :c do
    get "/offers/:id", to: 'clients#home'
    get "/restaurants/:id", to: 'clients#home'
    get "/code/:code", to: 'clients#home'
    get "/code", to: 'clients#home'
    get "/restaurants" ,to: 'clients#home', :as => :client_root
  end

  namespace :r do
    get "/restaurants/:id", to: 'restaurants#show'
    get "/codes/:code", to: 'offercodes#show'
    post "/offercodes", to: 'offercodes#use'
    get "/codes", to: 'offercodes#show'
    get "/dashboard", to: 'restaurants#home', :as => :restaurant_root
  end

  root to: "pages#show"

end
