Prezenter::Application.routes.draw do
  devise_for :users

  root 'presentations#index'

  resources :presentations do
    get '/prezent' => 'prezenter#prezent', on: :member
    get '/view' => 'prezenter#view', on: :member
  end
end
