class Api::V1::UsersController < ApplicationController
	# for testing 
	# def index
  #   @users= User.all
  #   render json: @users
  # end

  # def show
  #   @user = User.find(params[:id])
  #   render json: {user: UserSerializer.new(@user)}
	# end
	###########################
  def create
		user = User.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
			username: params[:username],
			password: params[:password],
		)
		if user.save
			token = encode_token(user.id)
			render json: {user: UserSerializer.new(user), token: token}
      # token would be used if autologin was implemented or possibly else?
		else
			render json: {errors: user.errors.full_messages}
		end
	end
end
