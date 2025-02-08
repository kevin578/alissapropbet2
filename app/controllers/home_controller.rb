class HomeController < ApplicationController
  def index
    @enterable_contests = Contest.where(status: :enterable)
    @live_contests = Contest.where(status: :live)
    @previous_contests = Contest.where(status: :finished).order(:created_at)
  end
end
