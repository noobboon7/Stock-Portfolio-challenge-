class ApplicationController < ActionController::API
  # encode user to jwt tokent
  def encode_token(user_id)
    JWT.encode({user_id: user_id}, "userSecret")
  end

  # reads the header if string "Authorization" is present then get 
  def get_auth_headers
    request.headers['Authorization']
  end

  # decodes JWT user token for autologin -> implement next
  def decode_token
    # byebug
    begin
      JWT.decode(get_auth_headers, "userSecret")[0]["user_id"]
    rescue
      nil
    end
  end
  # finds user with the decoded JWT token 
  def session_user
    User.find_by(id: decode_token)
  end

  def logged_in?
   !!session_user
 end
end
