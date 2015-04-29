class SupportController < ApplicationController
  include GenerateToken

  def create
    @ticket = SupportTicket.new(support_params)
    
    if @ticket.save
      return head(:ok)
    else
      return head(:bad_request)
    end
  end

  def list
    @token = generate_token 'agent'
    @tickets = SupportTicket.all()
  end

  # DELETE /appointments/1
  # DELETE /appointments/1.json
  def destroy
    @ticket = SupportTicket.find(params[:id])
    @ticket.destroy
    return head(:no_content)
  end

  def show
    
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def support_params
      params.permit(:endpoint, :product_id)
    end
end
