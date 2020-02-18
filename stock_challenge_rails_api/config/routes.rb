# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :stocks
      resources :users
    
      get "/auto_login", to: "auth#auto_login"
      post "/login", to: "auth#login"
      post "/buyStock", to: "stocks#buy_stock"
    end
  end
end
