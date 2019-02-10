class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[update]

  after_action :verify_policy_scoped, only: []
  after_action :verify_authorized, except: []

  def update
    authorize @user

    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.permit(:username, :email, :image)
  end
end
