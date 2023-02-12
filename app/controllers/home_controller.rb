class HomeController < ApplicationController
  def index
    @enterable_contests = Contest.where(status: :enterable)
    @live_contests = Contest.where(status: :live)
  end
end
