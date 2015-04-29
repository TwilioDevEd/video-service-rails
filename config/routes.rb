Rails.application.routes.draw do
  # Default home page
  root 'products#list'

  # Create, display and delete support tickets
  post 'support/create'
  get 'support/list'
  delete '/support/:id' => 'support#destroy'

  # Product details page
  get '/products/:id', to: 'products#show', as: 'product'

end
