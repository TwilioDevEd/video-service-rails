require 'twilio-ruby'
# Written by Carter Rabasa - @CarterRabasa to easily render TwiML enpoints.
module GenerateToken
  extend ActiveSupport::Concern

  def generate_token(endpointAddress)
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    capability = Twilio::Util::Capability.new account_sid, auth_token
    # allow outgoing calls to an application
    capability.allow_client_outgoing 'AP00000000000000000000000000000000'
    capability.allow_client_incoming endpointAddress
    @token = capability.generate
  end

end