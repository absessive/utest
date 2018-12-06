Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :api do
    get 'devices', to: 'test_user#devices'
    get 'countries', to: 'test_user#countries'
    get 'list_testers', to: 'test_user#list_testers'
    get 'list_devices', to: 'test_user#list_devices'
    get 'list_bugs', to: 'test_user#list_bugs'
    get ':tester_id/experience', to: 'test_user#experience'
  end
end
