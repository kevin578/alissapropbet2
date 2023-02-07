class HomeController < ApplicationController
  def index
    @enterable_contests = Contest.where(status: :enterable)
    puts @enterable_contests
  end
end
