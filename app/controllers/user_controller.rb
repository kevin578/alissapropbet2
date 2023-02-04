class UserController < ApplicationController
  def sign_out
    sign 
    redirect_to '/'
  end
end
