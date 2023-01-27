class ApplicationController < ActionController::Base

  def must_be_logged_in
    redirect_to '/' if current_user.nil?
  end
end
