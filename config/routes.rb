Rails.application.routes.draw do
  devise_for :user
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  get 'user/profile', to: 'user#profile'
  # get 'user/sign-out', to: 'user#sign_out'
  post 'destroy-contest/:id', to: 'contest#destroy'
  post 'contest/add-user', to: 'contest#add_user'
  post 'contest/remove-user', to: 'contest#remove_user'
  post 'contest/new_entry', to: 'contest#remove_user'
  get 'contest/:id/preview', to: 'contest#preview'
  get 'contest/:id/enter', to: 'contest#enter'
  get 'contest/:id/live', to: 'contest#live'
  resources :contest, except: :destroy
  resources :entries, only: [:create, :destroy]
  
end
