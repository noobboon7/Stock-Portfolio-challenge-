class Api::V1::UsersController < ApplicationController
	# for testing 
	# def index
  #   @users= User.all
  #   render json: @users
  # end

  def show
    @user = User.find(user_params[:email])
    render json: {user: UserSerializer.new(@user)}
	end
	###########################
	
  def create
		byebug
		user = User.new(
      first_name: user_params[:first_name],
      last_name: user_params[:last_name],
      email: user_params[:email],
			password: user_params[:password],
		)
		byebug
		if user.save
			token = encode_token(user.id)
      # token used if autologin is implemented
			render json: {user: UserSerializer.new(user), token: token}
		else
			render json: {errors: user.errors.full_messages}
		end
	end
	
	private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
