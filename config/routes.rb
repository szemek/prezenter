Prezenter::Application.routes.draw do
  devise_for :users

  root 'presentations#index'

  resources :presentations do
    get '/prezent' => 'prezenter#show', on: :member
    get '/view' => 'viewer#show', on: :member
  end
end
