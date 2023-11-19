Rails.application.routes.draw do
  resources :reviews
  resources :herbs, only: [:index]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  # get "/herbs", to: "herbs#index"

end
