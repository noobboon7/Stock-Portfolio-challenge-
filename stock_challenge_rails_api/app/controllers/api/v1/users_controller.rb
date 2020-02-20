class Api::V1::UsersController < ApplicationController
	# for testing 
	# def index
  #   @users= User.all
  #   render json: @users
  # end
	
  # def show
  #   @user = User.find(user_params[:email])
  #   render json: {user: UserSerializer.new(@user)}
	# end
	###########################
	wrap_parameters :user, include: [:first_name, :last_name, :email, :password]
	
  def create
		# "first_name" ruby, "first_name" is coming from React obj			
		user = User.new(user_params)
		if user.save
			token = encode_token(user.id)
			# token sent to keep user signed in on refresh
			render json: {user: UserSerializer.new(user), token: token}, status: :created
		else
			render json: {errors: user.errors.full_messages}
		end
	end
	
	private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
