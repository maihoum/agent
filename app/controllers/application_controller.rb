class ApplicationController < ActionController::API
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    render json: {
      errors: ['You are not allowed to perform that action']
    }, status: :unauthorized
  end
end
