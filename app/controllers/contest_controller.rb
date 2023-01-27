class ContestController < ApplicationController

  before_action :must_be_logged_in

  def create
    contest = Contest.create({
      user_id: current_user.id,
      name: 'New Contest',
      status: :draft
    })
    redirect_to "/contests/#{contest.id}/edit"
  end

  def edit
    contest = current_user.contests.where(id: params[:id])
    redirect_to '/' if contest.empty?
    @contest = contest.first
  end
   

end
