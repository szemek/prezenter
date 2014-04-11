Prezenter::Application.routes.draw do
  devise_for :users

  root 'presentations#index'

  resources :presentations do
    get '/prezent' => 'prezenter#show', on: :member, as: :prezent
    get '/view' => 'viewer#show', on: :member, as: :view
  end
end
