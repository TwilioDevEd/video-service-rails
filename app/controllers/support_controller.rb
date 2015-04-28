class SupportController < ApplicationController
  include GenerateToken

  def create
    puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    puts params
    @ticket = SupportTicket.new(support_params)
    puts @ticket.endpoint
    
    if @ticket.save
      return head(:ok)
    else
      return head(:bad_request)
    end
  end

  def delete
  end

  def show
    @token = generate_token 'agent'
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def support_params
      params.permit(:endpoint, :product_id)
    end
end
