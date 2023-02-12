class UserController < ApplicationController
  def profile
    redirect_to '/' unless current_user
  end
  def sign_out
    sign 
    redirect_to '/'
  end
end
