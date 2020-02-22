class Api::V1::AuthController < ApplicationController
  
  def login
    # 1 find the user associated with the email
    user = User.find_by(email: params[:email])
    # 2 if user and password is valid
    if user && user.authenticate(params[:password])
      token = encode_token(user.id)
      # byebug
      render json: {user: UserSerializer.new(user), token: token}
    else
      render json: {errors: "Incorrect email or password."}
    end
  end

  

  def auto_login
    # checking to see if there is a session_user from applicationController
    if session_user
      render json: session_user
    else
      render json: {errors: "Don't touch my Cookies!"}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end