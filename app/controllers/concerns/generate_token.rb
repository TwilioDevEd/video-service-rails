require 'twilio-ruby'

module GenerateToken
  extend ActiveSupport::Concern

  # API credentials
  @@signing_key_sid = nil
  @@signing_key_secret = nil
  @@account_sid = ENV['TWILIO_ACCOUNT_SID']
  @@auth_token = ENV['TWILIO_AUTH_TOKEN']


  def generate_token(endpoint_address)
    if not @@signing_key_sid
      client = Twilio::REST::Client.new @@account_sid, @@auth_token
      sk = client.account.signing_keys.create friendly_name: 'Customer Service'
      @@signing_key_sid = sk.sid
      @@signing_key_secret = sk.secret
    end

    # create access token
    scat = Twilio::Util::AccessToken.new @@signing_key_sid, @@account_sid, @@signing_key_secret
    
    # Associate token with a unique name
    scat.add_endpoint_grant(endpoint_address)

    # Allow the client to generate NAT traversal tokens
    url = "https://api.twilio.com/2010-04-01/Accounts/#{@@account_sid}/Tokens.json"
    scat.add_grant(url)

    # Create token as an instance variable to be rendered in the template
    @token = scat.to_jwt()
  end

end