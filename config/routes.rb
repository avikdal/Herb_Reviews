Rails.application.routes.draw do
  resources :reviews
  resources :herbs, only: [:index, :create]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  # post "/reviews_filtered", to: "reviews#rating_filter"

 
end

# Create a custom post route that takes two parameters, the word above or below and a number. Look at the rating and find all reviews that have a rating above or below that number, depending on whether the first parameter is above or below. If that turns up any reviews, render back an array of all the herbs for all those reviews. Make sure to only send back a unique list.  If no reviews are found, render a json message that says so including the number that was included in the search.

# post "herbs/ rever/ :direction/ :rating" review#action
# rating iterate reviews array and check eacch rating above or below based off direction
#if any reviews render array of herbs for reviews.flatten
# else no reviews then error message with :rating number included