Rails.application.routes.draw do  
  root 'home#index'

  namespace :api do
    get 'devices', to: 'test_user#devices'
    get 'countries', to: 'test_user#countries'
    get 'list_bugs', to: 'test_user#list_bugs'
    get 'testers/:tester_id/experience', to: 'test_user#experience'
    post 'search', to: 'test_user#search'
  end
end
