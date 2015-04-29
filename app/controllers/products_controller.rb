require 'twilio-ruby'
require 'tatooine'

class ProductsController < ApplicationController
  include GenerateToken
  before_action :create_token

  # Render product list
  def list
    @products = Tatooine::Starship.list
    @products.concat Tatooine::Starship.next
    render 'index'
  end

  # Render the product detail view
  def show
    @product = Tatooine::Starship.get(params[:id])
  end

  private

    # Let's create a customer capability token before we view any products
    def create_token
      # Generate a random endpoint for the customer
      endpoint = (0...13).map { ('a'..'z').to_a[rand(26)] }.join
      @token = generate_token endpoint
    end



end
